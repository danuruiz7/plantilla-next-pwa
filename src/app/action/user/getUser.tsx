"use server";

import { db } from "@/lib/db";
import type { User } from "@/entities/User";
import { getUserSession } from "@/entities/User";

export const getUser = async () => {
  const userSession = await getUserSession();

  if (!userSession) {
    return null;
  }

  const { userId } = userSession;

  const [rows] = await db.query("SELECT * FROM users WHERE id = ? LIMIT 1", [
    userId,
  ]);
  if (!Array.isArray(rows) || rows.length === 0) {
    return null;
  }
  const user = rows[0] as User;
  console.log({ user });
  const userData = {
    userId: user.id,
    username: user.username,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    lastLogin: user.lastLogin ? String(user.lastLogin) : "",
    createdAt: user.createdAt ? String(user.createdAt) : "",
    updatedAt: user.updatedAt ? String(user.updatedAt) : "",
    locale: userSession.locale,
  };
  return userData;
};
