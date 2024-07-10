"use server";
import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { and, eq, gt } from "drizzle-orm";
import { SelectUser, users } from "@/lib/schema";
import { User, generateId, Scrypt } from "lucia";

export type UpdateUser = Pick<SelectUser, "name">;

export async function getUserById(
  id?: string,
): Promise<{ success: boolean; message: string; data?: SelectUser }> {
  if (!id || id === "" || id === "undefined" || id === "null") {
    return { success: false, message: "Invalid user id" };
  }

  const { user, session } = await validateRequest();
  if (!user?.id || !session.id) {
    throw new Error("You must be signed in to perform this action");
  }

  try {
    const result = (await db.query.users.findFirst({
      where: eq(users.id, id),
    })) as SelectUser;
    return {
      success: true,
      message: "Users fetched successfully",
      data: result,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error fetching users" };
  }
}

export async function updateUsers(
  updatedUser: UpdateUser,
): Promise<{ success: boolean; message: string }> {
  const { user, session } = await validateRequest();
  let response = null;
  if (!user?.id || !session.id) {
    throw new Error("You must be signed in to perform this action");
  }

  const newName = updatedUser.name;
  try {
    await db
      .update(users)
      .set({
        name: newName,
      })
      .where(eq(users.id, user.id))
      .returning();
    return { success: true, message: "User updated successfully" };
  } catch (error) {
    console.log("Error: ", error);
    return { success: false, message: "Error updating users" };
  }
}

export async function updateEmail(
  email: string,
): Promise<{ success: boolean; message: string }> {
  const { user, session } = await validateRequest();
  if (!user?.id || !session.id) {
    return {
      success: false,
      message: "You must be signed in to perform this action.",
    };
  }

  if (!email || email === "" || email === "undefined" || email === "null") {
    return { success: false, message: "Invalid email" };
  }

  try {
    await db
      .update(users)
      .set({ email: email })
      .where(eq(users.id, user.id))
      .returning();
    return { success: true, message: "Email updated successfully" };
  } catch (error) {
    console.log("Error: ", error);
    return { success: false, message: "Email already exists!" };
  }
}

export async function updatePassword(
  id: string,
  oldPassword: string,
  newPassword: string,
): Promise<{ success: boolean; message: string }> {
  const { user, session } = await validateRequest();
  if (!user?.id || !session.id) {
    throw new Error("You must be signed in to perform this action.");
  }

  const scrypt = new Scrypt();
  const findUser = await db.select().from(users).where(eq(users.id, id)).get();

  if (!findUser) {
    return { success: false, message: "User not found" };
  }
  const userPassword = findUser.hashedPassword;
  const newHashedPassword = await scrypt.hash(newPassword);
  const validPassword = userPassword
    ? await scrypt.verify(userPassword, oldPassword)
    : true;

  //console.log(validPassword);

  if (!validPassword) {
    return { success: false, message: "Invalid email or password." };
  }

  try {
    await db
      .update(users)
      .set({ hashedPassword: newHashedPassword })
      .where(eq(users.id, id))
      .returning();
    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    console.log("Error: ", error);
    return { success: false, message: "Error updating password" };
  }
}

export async function verifyUserPassword(
  password: string,
): Promise<{ success: boolean; message: string }> {
  const { user, session } = await validateRequest();
  if (!user?.id || !session.id) {
    return {
      success: false,
      message: "You must be signed in to perform this action.",
    };
  }

  const scrypt = new Scrypt();
  const findUser = await db
    .select()
    .from(users)
    .where(eq(users.id, user.id))
    .get();
  if (!findUser) {
    return { success: false, message: "User not found" };
  }
  const userPassword = findUser.hashedPassword;

  if (!userPassword) {
    return { success: false, message: "User password not found" };
  }
  const validPassword = await scrypt.verify(userPassword, password);

  if (!validPassword) {
    return { success: false, message: "Invalid password" };
  }

  return { success: true, message: "Password verified successfully" };
}