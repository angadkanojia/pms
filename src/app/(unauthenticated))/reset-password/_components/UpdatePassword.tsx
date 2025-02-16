"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

const schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm password must match"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type UpdatePasswordForm = z.infer<typeof schema>;

const UpdatePassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: UpdatePasswordForm) => {
    try {
      const response = await axios.post("/api/reset-password", {
        token,
        password: formData.password,
      });

      if (response.status === 200) {
        setSuccessMessage("Password reset successful! Redirecting...");
        setTimeout(() => router.push("/"), 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      // TODO
      if (isAxiosError(error)) {
        setError("password", {
          type: "manual",
          message: error.response?.data?.message || "Something went wrong",
        });
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold text-primary">
          Reset Password
        </h2>

        {successMessage ? (
          <p className="mt-4 text-center text-green-600">{successMessage}</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="mb-4">
              <label className="mb-2 block font-bold text-gray-700">
                New Password
              </label>
              <input
                type="password"
                className={`w-full rounded-md border bg-gray-100 px-4 py-3 text-black outline-none ${
                  errors.password ? "border-red-700" : "border-inherit"
                }`}
                placeholder="Enter new password"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-sm italic text-red-700">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="mb-6">
              <label className="mb-2 block font-bold text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                className={`w-full rounded-md border bg-gray-100 px-4 py-3 text-black outline-none ${
                  errors.confirmPassword ? "border-red-700" : "border-inherit"
                }`}
                placeholder="Confirm new password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <span className="text-sm italic text-red-700">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-primary py-2 font-bold text-white"
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdatePassword;
