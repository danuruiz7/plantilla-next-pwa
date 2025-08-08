"use server";

import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/entities/User";

export const getUser = async () => {
  const userSession = await getUserSession();

  if (!userSession) {
    return null;
  }

  const { userId } = userSession;

  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });
  if (!user) {
    return null;
  }
  // console.log({ user });
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
