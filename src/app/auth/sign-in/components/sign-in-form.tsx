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
import envConfig from "@/configs/environment";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/components/app-provider";

interface ErrorResponse {
  errors: Array<{
    field: string;
    message: string;
  }>;
  message: string;
  statusCode: number;
}

interface TransformedApiError {
  status: number;
  data: ErrorResponse;
}

interface SuccessResponse {
  data: {
    account: {
      email: string;
      id: number;
      name: string;
    };
    expiresAt: string;
    token: string;
  };
  message: string;
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
  const { setToken } = useAppContext();

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
      const response = await fetch(
        `${envConfig.NEXT_PUBLIC_BASE_API_ENDPOINT}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(async (response) => {
        const apiResponseData = await response.json();

        if (response.ok) {
          return apiResponseData as SuccessResponse;
        }
        throw {
          status: response.status,
          data: apiResponseData as ErrorResponse,
        };
      });

      // Set cookie token for Next server
      await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
          token: response.data.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        const apiResponseData = await response.json();

        if (response.ok) {
          return apiResponseData as SuccessResponse;
        }
        throw {
          status: response.status,
          data: apiResponseData as ErrorResponse,
        };
      });

      // Set app context token
      setToken(response.data.token);

      toast.success("Success", {
        description: "Sign in successfully",
      });
      router.push("/profile");
    } catch (error) {
      const transformedError = error as unknown as TransformedApiError;
      if (transformedError.status === 422) {
        transformedError.data.errors.forEach((error) => {
          form.setError(error.field as keyof Form, {
            type: "server",
            message: error.message,
          });
        });
      }
      toast.error("Error", {
        description: transformedError.data.message,
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
