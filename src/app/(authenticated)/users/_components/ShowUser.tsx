import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "@/app/(common)/_components/Forms/Button";
import Input from "@/app/(common)/_components/Forms/Input";

// Zod Validation Schema
const userSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(3, "Full Name must be at least 3 characters"),
  userName: z.string().min(3, "User Name must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  status: z.boolean().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

const ShowUser = ({
  setShowUser,
}: {
  showUser: boolean;
  setShowUser: (value: boolean) => void;
}) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserFormData) => {
    setServerError(null);
    setServerSuccess(null);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          userName: data.userName,
          email: data.email,
          password: data.password,
          status: data.status ?? true,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setServerSuccess("User added successfully!");
        setTimeout(() => {
          setServerSuccess(null);
          setShowUser(false);
        }, 2000);
      } else {
        setServerError(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setServerError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="mb-4 flex h-16 items-center rounded-md bg-white shadow-sm">
        <h2 className="pl-4 text-2xl font-semibold text-gray-800">
          Add New User
        </h2>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-full rounded-lg bg-white px-5 py-2 shadow-sm">
          {/* Display Error Message */}
          {serverError && (
            <div className="mb-4 rounded-md bg-red-100 p-3 text-center text-red-800">
              {serverError}
            </div>
          )}

          {/* Display Success Message */}
          {serverSuccess && (
            <div className="mb-4 rounded-md bg-green-100 p-3 text-center text-green-800">
              {serverSuccess}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <Input
              label="Full Name"
              {...register("name")}
              error={errors.name?.message}
            />
            <Input
              label="User Name"
              {...register("userName")}
              error={errors.userName?.message}
            />
            <Input
              label="Email Address"
              {...register("email")}
              error={errors.email?.message}
            />
            <Input
              label="Password"
              {...register("password")}
              error={errors.password?.message}
            />

            {/* User Status Checkbox */}
            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                {...register("status")}
                id="status"
                className="h-5 w-5 rounded-3xl border border-gray-300 bg-gray-200 checked:border-blue-600 checked:bg-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="status" className="text-gray-800">
                User Status
              </label>
            </div>

            <div className="mt-4 flex justify-center gap-10">
              <Button
                type="submit"
                className="rounded-xl bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
              >
                Add User
              </Button>
              <Button
                type="button"
                className="rounded-xl bg-gray-400 px-6 py-2 text-white hover:bg-gray-500"
                onClick={() => setShowUser(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ShowUser;
