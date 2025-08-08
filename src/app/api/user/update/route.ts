import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PUT(req: NextRequest) {
  try {
    const { id, username, name, lastname, password } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 401 });
    }

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 400 });
    }

    let result;
    if (password && password.trim() !== "") {
      // Si viene password, actualiza todo
      result = await prisma.user.update({
        where: { id: Number(id) },
        data: { username, name, lastname, password, updatedAt: new Date() },
      });
    } else {
      // Si no viene password, no la actualiza
      result = await prisma.user.update({
        where: { id: Number(id) },
        data: { username, name, lastname, updatedAt: new Date() },
      });
    }

    if (!result) {
      return NextResponse.json({ error: "Error al actualizar usuario" }, { status: 400 });
    }

    revalidatePath("/dashboard/profile");
    return NextResponse.json({ user: user, result: result });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
