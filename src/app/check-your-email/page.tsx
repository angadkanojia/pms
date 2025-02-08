import Link from "next/link";

const Page = () => {

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2">
      <div
        className="hidden md:flex items-center justify-center relative w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/login_left_side_image.png')" }}
      >
        <div className="text-center lg:px-20 md:px-10">
          <h1 className="font-bold text-5xl mb-5">
          Check Your Email
          </h1>
          <p className="text-xl font-semibold max-w-[70%] text-center mx-auto">Don't forget to check your spam folder.</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md p-8 mx-auto rounded-xl">
          
          <h2 className="text-sm font-semibold text-center mb-16 text-gray-700">
          We've sent an email to the email address you provided. Use the link in the email to reset your password.
          </h2>

          <div className=" text-2xl font-semibold text-center text-blue-500">
            <Link className="" href="/">BACK TO LOGIN</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;