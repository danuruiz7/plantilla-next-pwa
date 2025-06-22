import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import type { User } from '@/entities/User';
import { sign } from 'jsonwebtoken'


export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    console.log({ username, password })
    if (!username || !password) {
      return NextResponse.json({ error: 'Faltan credenciales' }, { status: 400 });
    }

    // Busca el usuario por username
    const [rows] = await db.query('SELECT * FROM users WHERE username = ? LIMIT 1', [username]);
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 401 });
    }
    const user = rows[0] as User;
    console.log({ user })

    // Verifica el password
    if (password !== user.password) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    // Actualiza el campo lastLogin a NOW()
    await db.query('UPDATE users SET lastLogin = NOW() WHERE id = ?', [user.id]);


    // Prepara los datos del usuario sin la contraseña
    const userData = {
      userId: user.id,
      username: user.username,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      lastLogin: new Date(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET no está definida en el .env');
    }
    const token = sign(
      userData,
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    const response = NextResponse.json({
      message: 'Login exitoso'
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, // 1 hora
    });

    return response;
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}
