import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function DELETE() {
  const cookieStore = cookies();

  cookieStore.delete("token");
  revalidatePath("/");

  return Response.json(
    {
      message: "Remove token cookie successfully",
    },
    {
      status: 200,
    }
  );
}
