import http from "@/lib/http";

interface SignInMutationResponse {
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

const authServices = {
  signIn: (body: { email: string; password: string }) => {
    return http.post<SignInMutationResponse>("/auth/login", {
      body: JSON.stringify(body),
    });
  },
  signUp: (body: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    return http.post<SignInMutationResponse>("/auth/register", {
      body: JSON.stringify(body),
    });
  },
  signOut: () => {
    return http.post("/auth/logout", {
      body: JSON.stringify({}),
    });
  },
  setTokenCookie: (body: { token: string; expiresAt: string }) => {
    return http.post("/api/auth/set-token-cookie", {
      baseUrl: "",
      body: JSON.stringify(body),
    });
  },
  removeTokenCookie: (signal?: AbortSignal) => {
    return http.delete("/api/auth/remove-token-cookie", {
      baseUrl: "",
      signal,
    });
  },
};

export default authServices;
