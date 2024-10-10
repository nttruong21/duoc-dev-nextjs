"use client";

// Core
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
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
import useAuthStore from "@/stores/auth";
import authServices from "@/services/auth";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useProfileStore from "@/stores/profile";

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

  // Stores
  const authStore = useAuthStore(
    useShallow(({ setIsSignedIn, setTokenExpiredAt, setToken }) => ({
      setIsSignedIn,
      setToken,
      setTokenExpiredAt,
    }))
  );

  const setProfileStore = useProfileStore((state) => state.set);

  // States
  const [isPending, setIsPending] = useState(false);

  // Methods
  // Handle submit
  const handleSubmit: SubmitHandler<Form> = async (values) => {
    try {
      setIsPending(true);

      // Mutate sign in
      const {
        data: { token, expiresAt, account },
      } = await authServices.signIn(values);

      // Set cookie token for Next server
      await authServices.setTokenCookie({
        token,
        expiresAt,
      });

      toast.success("Success", {
        description: "Sign in successfully",
      });

      // Set auth store
      authStore.setToken(token);
      authStore.setTokenExpiredAt(expiresAt);
      authStore.setIsSignedIn(true);

      // Set app context
      setProfileStore({
        id: account.id,
        name: account.name,
        email: account.email,
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
