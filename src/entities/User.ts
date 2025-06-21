import { cookies } from "next/headers";
import { validToken } from "@/lib/jwt";

export interface User {
  id: number;
  username: string;
  password: string; // Idealmente, hash
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
}

export interface UserSession {
  userId: number;
  username: string;
  email: string;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}

export const getUserSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) return null;

  const payload = await validToken();

  if (!payload) return null;

  const userSession = {
    userId: payload.userId,
    username: payload.username,
    email: payload.email,
    lastLogin: payload.lastLogin,
    createdAt: payload.createdAt,
    updatedAt: payload.updatedAt,
  };

  return userSession as UserSession;
}