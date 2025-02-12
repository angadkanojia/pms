import { getServerSession } from "next-auth";
import LoginForm from "./_components/LoginForm";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard"); // Redirect if not authenticated
  }
  return <LoginForm />;
}
