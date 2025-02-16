import Link from "next/link";

const Page = () => {
  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-[40%_60%]">
      <div
        className="relative hidden h-full w-full items-center justify-center bg-cover bg-center bg-no-repeat md:flex"
        style={{ backgroundImage: "url('/images/login_left_side_image.png')" }}
      >
        <div className="px-20 text-center">
          <h2 className="mb-4 text-[45px] font-bold text-white">
            Check Your Email
          </h2>
          <p className="mb-6 text-[23px] font-semibold text-white">
            Don&apos;t forget to check your spam folder.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-white p-6">
        <div className="mx-auto w-full max-w-[33rem] rounded-xl text-center">
          <p className="mb-6 text-xl font-medium text-black">
            We&apos;ve sent an email to the email address you provided. Use the
            link in the email to reset your password.
          </p>
          <Link
            href="/"
            className="text-3xl font-medium text-primary hover:underline"
          >
            BACK TO LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
