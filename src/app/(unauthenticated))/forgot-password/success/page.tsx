import Link from "next/link";

const Page = () => {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-[40%_60%]">
      <div
        className="hidden md:flex items-center justify-center relative w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/login_left_side_image.png')" }}
      >
        <div className="text-center px-20">
          <h2 className="text-[45px] font-bold text-white mb-4">
            Check Your Email
          </h2>
          <p className="mb-6 text-white text-[23px] font-semibold">
            Don't forget to check your spam folder.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-[33rem] mx-auto rounded-xl text-center">
          <p className="text-black font-medium mb-6 text-xl">
            We've sent an email to the email address you provided. Use the link
            in the email to reset your password.
          </p>
          <Link
            href="/"
            className="text-primary font-bold hover:underline text-3xl font-medium"
          >
            BACK TO LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
