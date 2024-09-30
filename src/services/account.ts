import http from "@/lib/http";

interface GetProfileQueryResponse {
  data: {
    id: number;
    name: string;
    email: string;
  };
  message: string;
}

const accountServices = {
  getProfile: (token?: string) =>
    http.get<GetProfileQueryResponse>(
      "/account/me",
      token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : undefined
    ),
};

export default accountServices;
