import { generateId, Scrypt } from "lucia";
import { lucia } from "@/lib/auth";
import db from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

import { isValidEmail } from "@/app/actions/email";
import { User } from "lucia";

export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData();
  const action = formData.get("action");
  if (!action || typeof action !== "string") {
    return new Response("Invalid action", {
      status: 400,
    });
  }
  const email = formData.get("email");
  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return new Response("Invalid email", {
      status: 400,
    });
  }
  const password = formData.get("password");
  if (!password || typeof password !== "string" || password.length < 6) {
    return new Response("Invalid password", {
      status: 400,
    });
  }

  try {
    const scrypt = new Scrypt();
    let userId;
    let user;
    if (action === "signup") {
      const name = formData.get("name");
      if (!name || typeof name !== "string") {
        throw Error("Inavlid first name!");
      }
      const username = formData.get("username");
      if (!username || typeof username !== "string") {
        throw Error("Inavlid last name!");
      }
      const hashedPassword = await scrypt.hash(password);
      userId = generateId(16);
      const insertUser = await db
        .insert(users)
        .values({
          id: userId,
          name: name,
          username: username,
          email: email,
          hashedPassword: hashedPassword,
          role: "user",
        })
        .returning();
      user = insertUser[0];
    } else {
      user = await db.select().from(users).where(eq(users.email, email)).get();
      if (!user) {
        throw Error("Invalid email or password.");
      }
      userId = user.id;
      const validPassword = await scrypt.verify(user.hashedPassword!, password);
      if (!validPassword) {
        throw Error("Invalid email or password.");
      }
    }

    if (!userId) {
      throw Error("Bad user id");
    }

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    let userData: User = {
      ...user,
      hasPassword: user.hashedPassword ? true : false,
    };
    return Response.json(
      {
        success: true,
        user: userData,
        session: session,
        message: "",
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": sessionCookie.serialize(),
        },
      },
    );
  } catch (e) {
    const error = e as Error;
    let message = "Internal server error: " + error.message;
    if (message.includes("UNIQUE")) {
      if (message.includes("id") || message.includes("email")) {
        message = "User already exists";
      }
    } else if (message.includes("constraint")) {
      if (message.includes("name")) {
        message = "Name is required";
      }
      if (message.includes("hashedPassword")) {
        message = "Invalid password";
      }
    }
    return Response.json(
      {
        success: false,
        message: message,
      },
      {
        status: 400,
      },
    );
  }
}
