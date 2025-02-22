"use server";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

// Define validation schema
const userSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  userName: z.string().trim().min(3, "User Name must be at least 3 characters"),
  email: z.string().trim().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ✅ Handle GET request to fetch all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching users" },
      { status: 500 },
    );
  }
}

// ✅ Handle POST request to create a new user
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input using Zod
    const parsedBody = userSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody.error.errors },
        { status: 400 },
      );
    }

    // Extract values from parsed data
    const { name, userName, email, password } = parsedBody.data;

    // Convert email and username to lowercase for consistency
    const formattedEmail = email.toLowerCase();
    const formattedUserName = userName.toLowerCase();

    // Check if the email or username already exists (convert DB values to lowercase)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: formattedEmail }, { userName: formattedUserName }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email or Username already exists!" },
        { status: 400 },
      );
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        userName: formattedUserName,
        email: formattedEmail,
        password: hashedPassword,
        status: true, // Default value
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create user",
      },
      { status: 500 },
    );
  }
}
