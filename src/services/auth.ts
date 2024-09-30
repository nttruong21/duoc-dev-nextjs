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
  signIn: async (body: { email: string; password: string }) =>
    await http.post<SignInMutationResponse>("/auth/login", {
      body: JSON.stringify(body),
    }),
  setTokenCookie: (body: { token: string }) =>
    http.post("/api/auth", {
      baseUrl: "",
      body: JSON.stringify(body),
    }),
};

export default authServices;
