"use client";

import { z } from "zod";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import fileServices from "@/services/file";
import { handleApiError } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import productServices, { CreateProductBody } from "@/services/product";

// Form schema
const formSchema = z
  .object({
    name: z.string().min(1).max(256),
    price: z.coerce.number().positive(),
    description: z.string().max(10000),
    image: z.custom<File | string>().refine((value) => {
      return Boolean(value);
    }, "Image is required"),
  })
  .strict();

// Form type
type Form = z.infer<typeof formSchema>;

// Component
const SignInForm = () => {
  const router = useRouter();

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 1000,
      description: "",
      image: "",
    },
  });

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [isPending, setIsPending] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  // Methods
  // Handle change image file
  const handleChangeImageFile = (
    e: ChangeEvent<HTMLInputElement>,
    onChangeField: (...event: any[]) => void
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    onChangeField(file);

    setImageUrl((imageUrl) => {
      if (imageUrl?.startsWith("blob:")) {
        window.URL.revokeObjectURL(imageUrl);
      }
      return window.URL.createObjectURL(file);
    });
  };

  // Handle remove image file
  const handleRemoveImageFile = () => {
    inputFileRef.current!.value = "";
    setImageUrl(undefined);
    form.setValue("image", "");
  };

  // Handle submit
  const handleSubmit: SubmitHandler<Form> = async (values) => {
    try {
      setIsPending(true);

      const filePath =
        values.image instanceof File
          ? await fileServices.upload(values.image)
          : values.image!;

      const data: CreateProductBody = {
        ...values,
        image: filePath,
      };

      await productServices.createProduct(data);

      toast.success("Product created successfully");
      setIsPending(false);
      router.push("/products");
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

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  ref={inputFileRef}
                  placeholder="Image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChangeImageFile(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />

              {imageUrl && (
                <div className="mt-2 flex gap-4">
                  <Image
                    src={imageUrl}
                    alt="Product"
                    width={100}
                    height={100}
                    className="w-32 h-32"
                  />

                  <Button variant="ghost" onClick={handleRemoveImageFile}>
                    Remove
                  </Button>
                </div>
              )}
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
