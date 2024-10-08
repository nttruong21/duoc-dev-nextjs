"use client";

// Core
import { toast } from "sonner";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";

// App
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { handleApiError } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import productServices from "@/services/product";

// Component
const ConfirmDeleteProductDialog: FC<{
  id: number;
  name: string;
}> = ({ id, name }) => {
  // Hooks
  const router = useRouter();

  // States
  const [isPending, setIsPending] = useState(false);

  // Methods
  // Handle delete product
  const handleDeleteProduct = async () => {
    try {
      setIsPending(true);
      await productServices.delete(id);
      toast.success("Delete product successfully");
      router.refresh();
    } catch (error) {
      handleApiError({ error });
    } finally {
      setIsPending(false);
    }
  };

  // Template
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete product{" "}
            {name} and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button loading={isPending} onClick={handleDeleteProduct}>
              Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDeleteProductDialog;
