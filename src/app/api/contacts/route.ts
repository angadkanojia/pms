import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    let data;
    try {
      data = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON format!" },
        { status: 400 }
      );
    }

    console.log("🔍 Received Data:", data);

    const {
      email,
      name,
      mobile_number,
      office_number,
      company_name,
      address,
      status,
    } = data;

    if (!email || !name || !mobile_number) {
      return NextResponse.json(
        { success: false, message: "Missing required fields!" },
        { status: 400 }
      );
    }

    const existingContact = await prisma.pms_contacts.findFirst({
      where: {
        OR: [{ email }, { mobile_number }],
      },
    });

    if (existingContact) {
      return NextResponse.json(
        { success: false, message: "Email or mobile number already exists!" },
        { status: 400 }
      );
    }

    const newContact = await prisma.pms_contacts.create({
      data: {
        email,
        name,
        mobile_number,
        office_number: office_number || null,
        company_name,
        address,
        status: status ? status : "active",
      },
    });

    console.log("✅ New Contact Added:", newContact);

    return NextResponse.json(
      {
        success: true,
        message: "Contact added successfully!",
        contact: newContact,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("❌ Error:", error);

    return NextResponse.json(
      { success: false, message: "Error adding contact", error: String(error) },
      { status: 500 }
    );
  }
}
