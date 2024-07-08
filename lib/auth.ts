import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import db from "./db";
import { cookies } from "next/headers";
import { cache } from "react";
import { SelectUser } from "./schema";

import type { Session, User } from "lucia";
import { users, sessions } from "./schema";

const adapter = new DrizzleSQLiteAdapter(db, sessions, users);

interface ActionResult {
  success: boolean;
  message: string | null;
}

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      name: attributes.name,
      username: attributes.username,
      gh_username: attributes.gh_username,
      email: attributes.email,
      emailVerified: attributes.emailVerified,
      role: attributes.role,
      image: attributes.image,
      hasPassword: attributes.hashedPassword ? true : false,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: SelectUser & { hasPassword: boolean };
  }
}

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }
    const result = await lucia.validateSession(sessionId);
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}
    return result;
  },
);

export const signOut = async (): Promise<ActionResult> => {
  const { session } = await validateRequest();
  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  try {
    await lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return {
      success: true,
      message: "",
    };
  } catch (e) {
    return {
      success: false,
      message: "Unknown error encountered.",
    };
  }
};


export function withSiteAuth(action: any) {
    return async (
      formData: FormData | null,
      siteId: string,
      key: string | null,
    ) => {
      const {user, session} = await validateRequest();
      if (!session) {
        return {
          error: "Not authenticated",
        };
      }
  
      const site = await db.query.sites.findFirst({
        where: (sites, { eq }) => eq(sites.id, siteId),
      });
  
      if (!site || site.userId !== user.id) {
        return {
          error: "Not authorized",
        };
      }
  
      return action(formData, site, key);
    };
  }
  
  export function withPostAuth(action: any) {
    return async (
      formData: FormData | null,
      postId: string,
      key: string | null,
    ) => {
      const {user, session} = await validateRequest();
      if (!session || !user.id) {
        return {
          error: "Not authenticated",
        };
      }
  
      const post = await db.query.posts.findFirst({
        where: (posts, { eq }) => eq(posts.id, postId),
        with: {
          site: true,
        },
      });
  
      if (!post || post.userId !== user.id) {
        return {
          error: "Post not found",
        };
      }
  
      return action(formData, post, key);
    };
  }
  