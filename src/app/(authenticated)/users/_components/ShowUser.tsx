import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "@/app/(common)/_components/Forms/Button";
import Input from "@/app/(common)/_components/Forms/Input";

// Zod Validation Schema
const userSchema = z.object({
  userName: z.string().min(3, "User Name must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  status: z.boolean().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

const ShowUser = ({
  setShowUser,
}: {
  showUser: boolean;
  setShowUser: (value: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: UserFormData) => {
    console.log("Form Submitted:", JSON.stringify(data, null, 2));
    setShowUser(false);
  };

  return (
    <>
      <div className="shadow-sm bg-white h-16 mb-4 rounded-md flex items-center">
        <h2 className="text-2xl font-semibold pl-4 text-gray-800">
          Add New User
        </h2>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-white py-2 px-5 rounded-lg shadow-sm w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <Input
              label="Full Name"
              name="fullName"
              register={register}
              error={errors.fullName?.message}
              className="w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-200 outline-none"
            />
            <Input
              label="User Name"
              name="userName"
              register={register}
              error={errors.userName?.message}
              className="w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-200 outline-none"
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              register={register}
              error={errors.email?.message}
              className="w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-200 outline-none"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors.password?.message}
              className="w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-200 outline-none"
            />
            {/* User Status Checkbox */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                {...register("status")}
                id="status"
                className="w-5 h-5 appearance-non rounded-3xl bg-gray-200 border border-gray-300 checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-500 mt-2"
              />
              <label htmlFor="status" className="text-gray-800 mt-2">
                User Status
              </label>
            </div>

            <div className="flex justify-center gap-10 mt-4">
              <Button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600"
              >
                Add Users
              </Button>
              <Button
                className="bg-gray-400 text-white px-6 py-2 rounded-xl hover:bg-gray-500"
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
