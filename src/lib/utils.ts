import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { UseFormSetError } from "react-hook-form";

import { HttpError, HttpUnprocessableEntityError } from "./http";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isServerSide() {
  return typeof window === "undefined";
}

export function handleApiError({
  error,
  setError,
}: {
  error: unknown;
  setError?: UseFormSetError<any>;
}) {
  console.log(error);

  if (!(error instanceof HttpError)) {
    toast.error("Error", {
      description: "Có lỗi xảy ra, vui lòng thử lại",
    });
    return;
  }

  // error is HttpError instance
  // Canceled error
  if (error.status === 499) {
    return;
  }

  // Other errors
  if (error instanceof HttpUnprocessableEntityError && setError) {
    error.data.errors.forEach((error) => {
      setError(error.field, {
        type: "server",
        message: error.message,
      });
    });
    return;
  }

  toast.error("Error", {
    description: error.data.message,
  });
}
