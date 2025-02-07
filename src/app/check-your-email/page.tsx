"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});
type User = z.infer<typeof schema>;

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: User) => {
    try {
      const response = await axios.post("/api", formData);

      if (response.status !== 200) {
        setError("email", {
          type: "manual",
          message: "Invalid email",
        });
      }
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);

      // Extract error message from API response
      const errorMessage =
        error.response?.data?.message || "Something went wrong";

      setError("email", { type: "manual", message: errorMessage });
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2">
      <div
        className="hidden md:flex items-center justify-center relative w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/login_left_side_image.png')" }}
      >
        <div className="text-center lg:px-20 md:px-10">
          <h1 className="font-bold text-5xl mb-5">
          Check Your Email
          </h1>
          <p className="text-xl font-semibold max-w-[70%] text-center mx-auto">Don't forget to check your spam folder.</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md p-8 mx-auto rounded-xl">
          
          <h2 className="text-sm font-semibold text-center mb-16 text-gray-700">
          We've sent an email to the email address you provided. Use the link in the email to reset your password.
          </h2>

          <div className=" text-2xl font-semibold text-center text-blue-500">
            <Link className="" href="/">BACK TO LOGIN</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;