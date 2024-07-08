import { signOut } from "@/lib/auth";

export async function GET(): Promise<Response> {
  const { success, message } = await signOut();
  const sessionResponse = {
    success: success,
    message: message,
  };
  return Response.json(sessionResponse);
}
