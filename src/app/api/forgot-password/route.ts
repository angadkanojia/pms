import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function POST(req: Request) {
    try{
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json(
          { message: "Please Enter a Valid Email" },
          { status: 400 }
        );
      }

      const user = await prisma.user.findFirst({
        where: { email },
      });

      if (!user) {
        return NextResponse.json(
          { message: "This Email Does Not Exist" },
          { status: 404 },
        );
      }

      return NextResponse.json({ message: "Email Sent successfully" }, { status: 200 });
    }
      catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
      }
};