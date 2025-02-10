import Link from "next/link";

const Page = () => {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2">
      <div
        className="hidden md:flex items-center justify-center relative w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/login_left_side_image.png')" }}
      >
        <div className="text-center px-20">
          <h2 className="text-2xl font-bold text-white mb-4">
            Check Your Email
          </h2>
          <p className="mb-6 text-white">
            Don't forget to check your spam folder.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md p-8 mx-auto rounded-xl">
          <p className="text-gray-700 mb-6 text-center">
            We’ve sent a password reset link to your email. Please check your
            inbox and follow the instructions to reset your password.
          </p>
          <Link href="/" className="text-blue-600 font-bold hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
