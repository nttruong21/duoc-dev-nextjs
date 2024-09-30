import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { UseFormSetError } from "react-hook-form";

import { AuthHttpError, HttpError } from "./http";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isServerSide() {
  return typeof window === undefined;
}

export function handleApiError({
  error,
  setError,
}: {
  error: unknown;
  setError?: UseFormSetError<any>;
}) {
  const httpError = error as unknown as HttpError;
  if (httpError.status === 422 && setError) {
    const authHttpError = httpError as AuthHttpError;

    authHttpError.data.errors.forEach((error) => {
      setError(error.field, {
        type: "server",
        message: error.message,
      });
    });
  } else {
    toast.error("Error", {
      description: httpError.data.message,
    });
  }
}
