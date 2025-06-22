import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { User } from "@/entities/User";
import { revalidatePath } from "next/cache";

export async function PUT(req: NextRequest) {
  try {
    const { id, username, name, lastname, password } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    const [rows] = await db.query('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 401 });
    }
    const user = rows[0] as User;

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 400 });
    }

    let result;
    if (password && password.trim() !== "") {
      // Si viene password, actualiza todo
      [result] = await db.query(
        'UPDATE users SET username = ?, name = ?, lastname = ?, password = ?, updatedAt = NOW() WHERE id = ?',
        [username, name, lastname, password, id]
      );
    } else {
      // Si no viene password, no la actualiza
      [result] = await db.query(
        'UPDATE users SET username = ?, name = ?, lastname = ?, updatedAt = NOW() WHERE id = ?',
        [username, name, lastname, id]
      );
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
