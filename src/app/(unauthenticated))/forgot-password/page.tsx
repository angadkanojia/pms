"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

// Validation schema
const schema = z.object({
  email: z
    .string()
    .min(1, "Please enter an email")
    .email("Invalid email address"),
});

type User = z.infer<typeof schema>;

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // ✅ Initialize router

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (formData: User) => {
    setLoading(true);

    try {
      const response = await axios.post("/api/forgot-password", formData);

      if (response.status === 200) {
        router.push("/forgot-password/success"); // ✅ Redirect to success page
      } else {
        setError("email", {
          type: "manual",
          message: "Invalid email",
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        setError("email", { type: "manual", message: errorMessage });
      } else {
        setError("email", { type: "manual", message: "An unexpected error occurred" });
      }
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen grid grid-cols-[40%_60%]">
      {/* Left Side */}
      <div className="hidden md:flex items-center justify-center w-full h-full bg-cover bg-center bg-no-repeat bg-[url('/images/login_left_side_image.png')]">
        <div className="text-center px-20">
          <h1 className="font-bold text-5xl mb-5 text-white">
            One click to reset password.
          </h1>
          <p className="text-2xl text-white">
            We’ll send a link to reset your password.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md py-8 mx-auto rounded-xl">
          <div className="mx-auto mb-10">
            <Image
              src="/images/forgotPassword.png"
              alt="Forgot password illustration"
              width={170}
              height={200}
              className="mx-auto"
            />
          </div>

          <h2 className="text-2xl font-bold text-center mb-3 text-primary">
            Forgot Password
          </h2>
          <p className="text-sm text-center mb-6 text-gray-700">
            Enter Your Email Address.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className={`w-full px-4 py-3 border rounded-md outline-none bg-gray-100 text-black ${
                  errors.email ? "border-red-700" : "border-gray-300"
                } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                placeholder="Enter Email Address"
                {...register("email")}
                required
                disabled={loading}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />

              {errors.email && (
                <span
                  id="email-error"
                  className="text-red-700 italic text-sm"
                  aria-live="polite"
                >
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className={`w-full font-bold bg-primary text-white py-2 rounded-md text-center ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Please wait..." : "Send Reset Link"}
              </button>

              <Link
                href="/"
                className="w-full font-bold bg-gray-300 text-blue-500 py-2 rounded-md text-center"
              >
                Back To Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
