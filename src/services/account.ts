import http from "@/lib/http";

export interface Profile {
  id: number;
  name: string;
  email: string;
}

interface GetProfileQueryResponse {
  data: Profile;
  message: string;
}

const accountServices = {
  getProfile: async (token?: string) => {
    const res = await http.get<GetProfileQueryResponse>(
      "/account/me",
      token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : undefined
    );
    return res.data;
  },
  updateProfile: ({
    token,
    data,
  }: {
    token?: string;
    data: { name: string };
  }) => {
    return http.put("/account/me", {
      body: JSON.stringify(data),
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    });
  },
};

export default accountServices;
