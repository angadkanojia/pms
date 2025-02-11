import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import SessionLayout from "../(common)/_components/SessionLayout";
import HeaderLayout from "../(common)/_components/HeaderLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

// Use Inter instead of Geist
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/"); // Redirect if not authenticated
  }

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <HeaderLayout>{children}</HeaderLayout>
      </body>
    </html>
  );
}
