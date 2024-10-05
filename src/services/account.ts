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
  updateProfile: ({
    token,
    data,
  }: {
    token?: string;
    data: { name: string };
  }) =>
    http.put("/account/me", {
      body: JSON.stringify(data),
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    }),
};

export default accountServices;
