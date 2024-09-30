import envConfig from "@/configs/environment";
import authServices from "@/services/auth";
import clientSession from "@/services/clientSession";

export interface HttpError<Data = unknown> extends Error {
  status: number;
  data: Data & {
    message: string;
  };
}

export type AuthHttpError = HttpError<{
  errors: Array<{
    field: string;
    message: string;
  }>;
  message: string;
  statusCode: number;
}>;

export type HttpOptions = RequestInit & {
  baseUrl?: string;
};

// Request
const request = async <HttpResponse>(url: string, options?: HttpOptions) => {
  const baseUrl = options?.baseUrl ?? envConfig.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const fullUrl = `${baseUrl}${url}`;
  const baseHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${clientSession.token}`,
  };

  const fetchResponse = await fetch(fullUrl, {
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    ...options,
  });

  const httpResponse = (await fetchResponse.json()) as HttpResponse;

  console.log(fetchResponse);

  // Error
  if (!fetchResponse.ok) {
    throw {
      name: "Http error",
      message: "An error occurred when execute the http request",
      status: fetchResponse.status,
      data: httpResponse,
    } as HttpError;
  }

  // Success
  return httpResponse;
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
