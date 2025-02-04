import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2">
      <div
        className="hidden md:flex items-center justify-center relative w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/login_left_side_image.png')",
        }}
      >
        <div className=" text-center px-20">
          <h1 className="font-bold text-5xl mb-5">Welcome</h1>
          <p className="text-2xl">To Keep Connected with Us Please Login</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md  p-8 mx-auto rounded-xl">
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
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                placeholder="Enter your password"
              />
            </div>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
