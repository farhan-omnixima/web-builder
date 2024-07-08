import { validateRequest } from "@/lib/auth";

export async function GET(): Promise<Response> {
  const { user, session } = await validateRequest();
  const sessionResponse = {
    user: { ...user },
    session: { ...session },
  };
  return Response.json(sessionResponse);
}
