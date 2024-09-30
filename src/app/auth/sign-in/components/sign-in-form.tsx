"use client";

import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { HttpError } from "@/lib/http";
import authServices from "@/services/auth";
import clientSession from "@/services/clientSession";

interface MutationErrorResponse {
  errors: Array<{
    field: string;
    message: string;
  }>;
  message: string;
  statusCode: number;
}

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

  const handleSubmit: SubmitHandler<Form> = async (values) => {
    try {
      // Mutate sign in
      const response = await authServices.signIn(values);

      // Set cookie token for Next server
      await authServices.setTokenCookie({
        token: response.data.token,
      });

      // Set app context token
      clientSession.token = response.data.token;

      toast.success("Success", {
        description: "Sign in successfully",
      });
      router.push("/profile");
    } catch (error) {
      const httpError = error as unknown as HttpError<MutationErrorResponse>;
      if (httpError.status === 422) {
        httpError.data.errors.forEach((error) => {
          form.setError(error.field as keyof Form, {
            type: "server",
            message: error.message,
          });
        });
      }
      toast.error("Error", {
        description: httpError.data.message,
      });
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

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
