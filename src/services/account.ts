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
              Cookie: `sessionToken=${token}`,
            },
          }
        : undefined
    ),
};

export default accountServices;
