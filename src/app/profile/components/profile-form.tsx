"use client";

import { z } from "zod";
import { toast } from "sonner";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
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
import { handleApiError } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import accountServices from "@/services/account";
import { useAppContext } from "@/app/_components/app-provider";

const formSchema = z
  .object({
    name: z.string().trim().min(6).max(100),
  })
  .strict();

type Form = z.infer<typeof formSchema>;

const ProfileForm: FC<{ name: string }> = ({ name }) => {
  const router = useRouter();
  const { setProfile } = useAppContext();

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
    },
  });

  const [isPending, setIsPending] = useState(false);

  const handleSubmit: SubmitHandler<Form> = async (values) => {
    try {
      setIsPending(true);

      // Mutate sign in
      await accountServices.updateProfile({
        data: values,
      });

      toast.success("Success", {
        description: "Update profile successfully",
      });

      // Set app context
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              name: values.name,
            }
          : prev
      );

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="text-xl font-semibold text-center">Update profile</div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" loading={isPending}>
          Update
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
