import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const admin = await prisma.user.upsert({
      where: { username: "danuruiz7" },
      update: {},
      create: {
        username: "danuruiz7",
        password: "1234", // ¡En producción, hashea la contraseña!
        name: "Daniel",
        lastname: "Ruiz",
        email: "danuruiz7@hotmail.com",
      },
    });

    return NextResponse.json({
      message: "Usuario admin listo",
      admin,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Error al crear usuario" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}