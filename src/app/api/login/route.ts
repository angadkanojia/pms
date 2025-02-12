import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password } = await req?.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Username and password are required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { message: "password mismatched" },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "Login successful!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Server error: ${error}` }, { status: 500 });
  }
}
