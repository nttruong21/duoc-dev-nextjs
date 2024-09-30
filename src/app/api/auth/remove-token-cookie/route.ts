export async function POST() {
  return Response.json(
    {
      message: "Remove token cookie successfully",
    },
    {
      status: 200,
      headers: {
        "Set-Cookie": `token=; Path=/; Secure; HttpOnly; Max-Age=0`,
      },
    }
  );
}
