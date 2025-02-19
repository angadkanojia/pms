import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Handle GET request to fetch all contacts
export async function GET() {
  try {
    const contacts = await prisma.pms_contacts.findMany();
    return NextResponse.json({ success: true, contacts }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching contacts:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching contacts" },
      { status: 500 }
    );
  }
}

// ✅ Handle POST request to add a new contact
export async function POST(req: Request) {
  try {
    const data = await req.json();
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

    return NextResponse.json(
      {
        success: true,
        message: "Contact added successfully!",
        contact: newContact,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error adding contact:", error);
    return NextResponse.json(
      { success: false, message: "Error adding contact", error: String(error) },
      { status: 500 }
    );
  }
}

// ✅ Handle PUT request to update a contact
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // Read from query

    const body = await req.json();
    const contactId = id ? Number(id) : body.id; // Use ID from query OR body

    if (!contactId || isNaN(contactId)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing contact ID!" },
        { status: 400 }
      );
    }

    // Check if the contact exists
    const existingContact = await prisma.pms_contacts.findUnique({
      where: { id: contactId },
    });

    if (!existingContact) {
      return NextResponse.json(
        { success: false, message: "Contact not found!" },
        { status: 404 }
      );
    }

    // Update contact
    const updatedContact = await prisma.pms_contacts.update({
      where: { id: contactId },
      data: { ...body }, // Update all fields
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact updated successfully!",
        contact: updatedContact,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error updating contact:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error updating contact",
        error: String(error),
      },
      { status: 500 }
    );
  }
}

// ✅ Handle DELETE request to remove a contact
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing contact ID!" },
        { status: 400 }
      );
    }

    const contactId = Number(id);
    if (isNaN(contactId)) {
      return NextResponse.json(
        { success: false, message: "Invalid contact ID!" },
        { status: 400 }
      );
    }

    // Check if the contact exists before deleting
    const existingContact = await prisma.pms_contacts.findUnique({
      where: { id: contactId },
    });

    if (!existingContact) {
      return NextResponse.json(
        { success: false, message: "Contact not found!" },
        { status: 404 }
      );
    }

    await prisma.pms_contacts.delete({
      where: { id: contactId },
    });

    return NextResponse.json(
      { success: true, message: "Contact deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error deleting contact:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting contact" },
      { status: 500 }
    );
  }
}
