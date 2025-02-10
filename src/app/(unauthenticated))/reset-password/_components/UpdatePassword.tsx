"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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
      setError("password", {
        type: "manual",
        message: erro|r.response?.data?.message | "Something went wrong",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-primary">
          Reset Password
        </h2>

        {successMessage ? (
          <p className="text-green-600 text-center mt-4">{successMessage}</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                New Password
              </label>
              <input
                type="password"
                className={`w-full px-4 py-3 border rounded-md outline-none bg-gray-100 text-black ${
                  errors.password ? "border-red-700" : "border-inherit"
                }`}
                placeholder="Enter new password"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-700 italic text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className={`w-full px-4 py-3 border rounded-md outline-none bg-gray-100 text-black ${
                  errors.confirmPassword ? "border-red-700" : "border-inherit"
                }`}
                placeholder="Confirm new password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <span className="text-red-700 italic text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md font-bold"
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
