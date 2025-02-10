import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma"; // Ensure Prisma is set up
import { z } from "zod";
import { Resend } from "resend";
import crypto from "crypto";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const schema = z.object({
  email: z.string().email("Invalid email address"),
});

// Handle POST request
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    const { email } = body;

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: "Email not found" }, { status: 404 });
    }

    // Generate a unique token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 hour

    // Save token in the database
    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });

    // Generate the reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // Use your verified domain
      to: email,
      subject: "Reset Your Password",
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetLink}">Reset Password</a>
             <p>This link is valid for 1 hour.</p>`,
    });

    if (error) {
      return NextResponse.json({ message: error }, { status: 404 });
    }

    return NextResponse.json({ message: data }, { status: 200 });
  } catch (error) {
    console.error("Error in forgot-password API:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
