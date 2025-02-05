"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "please enter 6 digits"),
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

  const onSubmit = async (formData: User) => {
    try {
      const response = await axios.post("/api/login", formData);

      if (response.status !== 200) {
        setError("email", {
          type: "manual",
          message: "Invalid email or password",
        });
        setError("password", {
          type: "manual",
          message: "Invalid email or password",
        });
      }
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);

      // Extract error message from API response
      const errorMessage =
        error.response?.data?.message || "Something went wrong";

      setError("email", { type: "manual", message: errorMessage });
      setError("password", { type: "manual", message: errorMessage });
    }
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
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
