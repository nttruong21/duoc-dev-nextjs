import { cookies } from "next/headers";

export async function DELETE() {
  const cookieStore = cookies();

  cookieStore.delete("token");

  return Response.json(
    {
      message: "Remove token cookie successfully",
    },
    {
      status: 200,
    }
  );
}
