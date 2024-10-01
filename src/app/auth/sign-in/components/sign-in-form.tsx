"use client";

import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

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
import { useState } from "react";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
  })
  .strict();

type Form = z.infer<typeof formSchema>;

const SignInForm = () => {
  const router = useRouter();

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPending, setIsPending] = useState(false);

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

      router.push("/profile");
    } catch (error) {
      handleApiError({
        error,
        setError: form.setError,
      });
    } finally {
      setIsPending(false);
    }
  };

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
