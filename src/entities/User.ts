import { cookies } from "next/headers";
import { validToken } from "@/lib/jwt";
import { getLocale } from "next-intl/server";

export interface User {
  id: number;
  username: string;
  password: string; // Idealmente, hash
  name: string;
  lastname: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
}

export interface UserSession {
  userId: number | string;
  username: string;
  name: string;
  lastname: string;
  email: string;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
}

export const getUserSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const locale = await getLocale();

  if (!token) return null;

  const payload = await validToken();

  if (!payload) return null;

  const userSession = {
    userId: payload.userId,
    username: payload.username,
    name: payload.name,
    lastname: payload.lastname,
    email: payload.email,
    lastLogin: payload.lastLogin,
    createdAt: payload.createdAt,
    updatedAt: payload.updatedAt,
    locale,
  };

  return userSession as UserSession;
}