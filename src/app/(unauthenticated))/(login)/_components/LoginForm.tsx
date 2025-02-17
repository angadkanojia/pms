"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Import react-icons

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Please enter at least 6 characters"),
});

type User = z.infer<typeof schema>;

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password",
  );

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const onSubmit = async (formData: User) => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (result?.error) {
      if (result.error.includes("Email")) {
        setError("email", { type: "manual", message: result.error });
      } else if (result.error.includes("password")) {
        setError("password", { type: "manual", message: result.error });
      } else {
        setError("email", {
          type: "manual",
          message: "Login failed. Try again.",
        });
      }
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-[40%_60%]">
      <div className="relative hidden h-full w-full items-center justify-center bg-[url('/images/login_left_side_image.png')] bg-cover bg-center bg-no-repeat md:flex">
        <div className="px-20 text-center">
          <h1 className="mb-5 text-6xl font-bold text-white">Welcome</h1>
          <p className="text-[25px] font-bold text-white">
            To Keep Connected with Us Please Login
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-white p-6">
        <div className="mx-auto w-full max-w-md rounded-xl p-8">
          <div className="mx-auto mb-10">
            <Image
              src={"/images/login_form_top_image.png"}
              alt="login image"
              width={100}
              height={200}
              className="mx-auto"
            />
          </div>

          <h2 className="mb-6 text-center text-2xl font-bold text-primary">
            Login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block pb-2 font-bold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className={`w-full rounded-lg border px-4 py-2 text-black outline-none ${
                  errors.email ? "border-red-700" : "border-inherit"
                }`}
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-sm italic text-red-700">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block pb-2 font-bold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordType}
                  className={`w-full rounded-lg border px-4 py-2 pr-10 text-black outline-none ${
                    errors.password ? "border-red-700" : "border-inherit"
                  }`}
                  placeholder="Enter your password"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-mediumgrey"
                  onClick={togglePasswordVisibility}
                >
                  {passwordType === "password" ? (
                    <HiEyeOff className="h-5 w-5" />
                  ) : (
                    <HiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-sm italic text-red-700">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="mb-2 flex justify-end">
              <Link
                href="/forgot-password"
                className="pb-4 text-left text-sm font-semibold text-black"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-primary py-2 font-bold text-white"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
