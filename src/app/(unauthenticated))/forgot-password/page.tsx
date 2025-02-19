"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
      // #ToDO
      if (isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        setError("email", { type: "manual", message: errorMessage });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid h-screen grid-cols-[40%_60%]">
      {/* Left Side */}
      <div className="hidden h-full w-full items-center justify-center bg-[url('/images/login_left_side_image.png')] bg-cover bg-center bg-no-repeat md:flex">
        <div className="px-20 text-center">
          <h1 className="mb-5 text-5xl font-bold text-white">
            One click to reset password.
          </h1>
          <p className="text-2xl text-white">
            We’ll send a link to reset your password.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center bg-white p-6">
        <div className="mx-auto w-full max-w-md rounded-xl py-8">
          <div className="mx-auto mb-10">
            <Image
              src="/images/forgotPassword.png"
              alt="Forgot password illustration"
              width={170}
              height={200}
              className="mx-auto"
            />
          </div>

          <h2 className="mb-3 text-center text-2xl font-bold text-primary">
            Forgot Password
          </h2>
          <p className="mb-6 text-center text-sm text-gray-700">
            Enter Your Email Address.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block font-bold text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className={`w-full rounded-md border bg-gray-100 px-4 py-3 text-black outline-none ${
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
                  className="text-sm italic text-red-700"
                  aria-live="polite"
                >
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className={`w-full rounded-md bg-primary py-2 text-center font-bold text-white ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Please wait..." : "Send Reset Link"}
              </button>

              <Link
                href="/"
                className="w-full rounded-md bg-gray-300 py-2 text-center font-bold text-blue-500"
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
