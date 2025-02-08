"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useState } from "react";

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
    formState: { errors, isSubmitting },
  } = useForm<User>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData: User) => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) {
      setError("email", { type: "manual", message: result.error });
      setError("password", { type: "manual", message: result.error });
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2">
      <div
        className="hidden md:flex items-center justify-center relative w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/login_left_side_image.png')" }}
      >
        <div className="text-center px-20">
          <h1 className="font-bold text-5xl mb-5">Welcome</h1>
          <p className="text-2xl">To Keep Connected with Us Please Login</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md p-8 mx-auto rounded-xl">
          <div className="mx-auto mb-10">
            <Image
              src={"/images/login_form_top_image.png"}
              alt="login image"
              width={100}
              height={200}
              className="mx-auto"
            />
          </div>

          <h2 className="text-2xl font-bold text-center mb-6 text-primary">
            Login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Email</label>
              <input
                type="email"
                className={`w-full px-4 py-2 border rounded-md outline-none text-black ${
                  errors.email ? "border-red-700" : "border-inherit"
                }`}
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-700 italic text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Password</label>
              <input
                type="password"
                className={`w-full px-4 py-2 border rounded-md outline-none text-black ${
                  errors.password ? "border-red-700" : "border-inherit"
                }`}
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-700 italic text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full font-bold bg-primary text-white py-2 rounded-md"
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
