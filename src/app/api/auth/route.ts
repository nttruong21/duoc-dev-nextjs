export async function POST(request: Request) {
  const { token } = (await request.json()) as {
    token: string;
  };

  if (!token) {
    return Response.json(
      {
        message: "Token not found",
      },
      {
        status: 400,
      }
    );
  }

  return Response.json(
    {
      data: {
        token,
      },
      message: "Set cookie token successfully",
    },
    {
      status: 200,
      headers: {
        "Set-Cookie": `token=${token}; Path=/; Secure; HttpOnly`,
      },
    }
  );
}
