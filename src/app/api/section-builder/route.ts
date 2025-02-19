import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ensure Prisma is properly configured

// ✅ Add a new section (POST)
export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    const newSection = await prisma.pms_sectionbuilder.create({
      data: { title },
    });

    return NextResponse.json({ message: "Section added", section: newSection }, { status: 201 });
  } catch (error) {
    console.error("Error adding section:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ Fetch all sections (GET)
export async function GET() {
  try {
    const sections = await prisma.pms_sectionbuilder.findMany();
    return NextResponse.json({ sections }, { status: 200 });
  } catch (error) {
    console.error("Error fetching sections:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ Delete a section (DELETE)
export async function DELETE(req: Request) {
  try {
    // ✅ Get ID from query params
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const numericId = parseInt(id, 10); // Convert ID to number

    if (isNaN(numericId)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    // ✅ Check if section exists
    const existingSection = await prisma.pms_sectionbuilder.findUnique({
      where: { id: numericId },
    });

    if (!existingSection) {
      return NextResponse.json({ message: "Section not found" }, { status: 404 });
    }

    // ✅ Delete the section
    await prisma.pms_sectionbuilder.delete({ where: { id: numericId } });

    return NextResponse.json({ message: "Section deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("🔥 Error deleting section:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


// ✅ Update a section (PATCH)
export async function PATCH(req: Request) {
  try {
    const { id, title } = await req.json();

    if (!id || !title) {
      return NextResponse.json({ message: "ID and Title are required" }, { status: 400 });
    }

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    // ✅ Check if section exists
    const existingSection = await prisma.pms_sectionbuilder.findUnique({
      where: { id: numericId },
    });

    if (!existingSection) {
      return NextResponse.json({ message: "Section not found" }, { status: 404 });
    }

    // ✅ Update the section
    const updatedSection = await prisma.pms_sectionbuilder.update({
      where: { id: numericId },
      data: { title },
    });

    return NextResponse.json({ message: "Section updated successfully", section: updatedSection }, { status: 200 });
  } catch (error) {
    console.error("🔥 Error updating section:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}