"use client";

// Core
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

// App
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import authServices from "@/services/auth";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import clientSession from "@/services/clientSession";
import { useAppContext } from "@/app/_components/app-provider";

// Form schema
const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
  })
  .strict();

// Form type
type Form = z.infer<typeof formSchema>;

// Component
const SignInForm = () => {
  const router = useRouter();

  // Form
  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Context
  const { setProfile } = useAppContext();

  // States
  const [isPending, setIsPending] = useState(false);

  // Methods
  // Handle submit
  const handleSubmit: SubmitHandler<Form> = async (values) => {
    try {
      setIsPending(true);

      // Mutate sign in
      const response = await authServices.signIn(values);

      // Set cookie token for Next server
      await authServices.setTokenCookie({
        token: response.data.token,
        expiresAt: response.data.expiresAt,
      });

      toast.success("Success", {
        description: "Sign in successfully",
      });

      // Set client session token
      clientSession.token = response.data.token;

      // Set app context
      setProfile({
        id: response.data.account.id,
        name: response.data.account.name,
        email: response.data.account.email,
      });

      router.push("/profile");
      router.refresh();
    } catch (error) {
      handleApiError({
        error,
        setError: form.setError,
      });
    } finally {
      setIsPending(false);
    }
  };

  // Template
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" loading={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
