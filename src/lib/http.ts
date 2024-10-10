// Core
import { redirect } from "next/navigation";

// App
import useAuthStore from "@/stores/auth";
import { isServerSide, logging } from "@/lib/utils";
import envConfig from "@/configs/environment";
import useProfileStore from "@/stores/profile";

// General http error type
export class HttpError<
  Data = {
    message: string;
    [key: string]: unknown;
  }
> extends Error {
  status: number;
  data: Data;
  constructor({
    status,
    message = "Http error",
    data,
  }: {
    status: number;
    message?: string;
    data: Data;
  }) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

// 422 error type
export interface HttpUnprocessableEntityErrorData {
  errors: Array<{
    field: string;
    message: string;
  }>;
  message: string;
  statusCode: number;
}

export class HttpUnprocessableEntityError extends HttpError<HttpUnprocessableEntityErrorData> {
  constructor({ data }: { data: HttpUnprocessableEntityErrorData }) {
    super({
      status: 422,
      message: "Unprocessable entity error",
      data,
    });
  }
}

// 499 error type
export interface HttpCancelledErrorData {
  message: string;
}

export class HttpCancelledError extends HttpError<HttpCancelledErrorData> {
  constructor({ data }: { data: HttpCancelledErrorData }) {
    super({
      status: 499,
      message: "Request cancelled",
      data,
    });
  }
}

export type HttpOptions = RequestInit & {
  baseUrl?: string;
};

let isHttpUnauthorizeError = false;

// Request
const request = async <HttpResponse>(
  url: string,
  options?: HttpOptions
): Promise<HttpResponse> => {
  const baseUrl = options?.baseUrl ?? envConfig.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const fullUrl = `${baseUrl}${url}`;

  const isServer = isServerSide();

  const baseHeaders: HeadersInit = {};
  if (!isServer) {
    baseHeaders.Authorization = `Bearer ${useAuthStore.getState().token}`;
  }
  if (!(options?.body instanceof FormData)) {
    baseHeaders["Content-Type"] = "application/json;charset=utf-8";
  }

  const fetchResponse = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
  });

  const httpResponse = await fetchResponse.json();

  // Success
  if (fetchResponse.ok) {
    return httpResponse as HttpResponse;
  }

  // Error
  // 422
  if (fetchResponse.status === 422) {
    throw new HttpUnprocessableEntityError({
      data: httpResponse as HttpUnprocessableEntityErrorData,
    });
  }

  // 401
  if (fetchResponse.status === 401) {
    logging("Http", "Token expired");

    if (isServer) {
      logging("Http", "Token expired on server side");

      const token = (options?.headers as any)?.Authorization?.split(
        "Bearer"
      )[1]?.trim();

      redirect(`/auth/sign-out?token=${token}`);
    } else {
      logging("Http", "Token expired on client side");

      if (!isHttpUnauthorizeError) {
        isHttpUnauthorizeError = true;
        await fetch("/api/auth/remove-token-cookie", {
          method: "DELETE",
        });

        useAuthStore.getState().reset();
        useProfileStore.getState().reset();

        isHttpUnauthorizeError = false;
        location.href = "/";
      }
    }
  }

  // Others
  // throw new Error(httpResponse.message);
  throw new HttpError({
    status: fetchResponse.status,
    data: httpResponse,
  });
};

// Http
const http = {
  get: <HttpResponse>(url: string, options?: HttpOptions) =>
    request<HttpResponse>(url, {
      ...options,
      method: "GET",
    }),
  post: <HttpResponse>(url: string, options?: HttpOptions) =>
    request<HttpResponse>(url, {
      ...options,
      method: "POST",
    }),
  put: <HttpResponse>(url: string, options?: HttpOptions) =>
    request<HttpResponse>(url, {
      ...options,
      method: "PUT",
    }),
  patch: <HttpResponse>(url: string, options?: HttpOptions) =>
    request<HttpResponse>(url, {
      ...options,
      method: "PATCH",
    }),
  delete: <HttpResponse>(url: string, options?: HttpOptions) =>
    request<HttpResponse>(url, {
      ...options,
      method: "DELETE",
    }),
};

export default http;
