import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();

  const { token, expiresAt } = (await request.json()) as {
    token: string;
    expiresAt: string;
  };

  if (!token) {
    return Response.json(
      {
        message: "Token is not found",
      },
      {
        status: 404,
      }
    );
  }

  cookieStore.set({
    name: "token",
    value: token,
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: new Date(expiresAt),
  });

  return Response.json(
    {
      data: {
        token,
      },
      message: "Set token cookie successfully",
    },
    {
      status: 200,
    }
  );
}
