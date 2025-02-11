import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "@/app/(common)/_components/Forms/Button";
import Input from "@/app/(common)/_components/Forms/Input";

// Zod Validation Schema
const contactSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  office: z.string().optional(),
  company: z.string().min(2, "Company name is required"),
  address: z.string().min(5, "Address is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ShowForm = ({
  setShowForm,
}: {
  showForm: boolean;
  setShowForm: (value: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Form Submitted:", data);
    setShowForm(false);
  };

  return (
    <>
      <div className="shadow-sm bg-white h-16 mb-4 rounded-md flex items-center">
        <h2 className="text-2xl font-semibold pl-4 text-gray-800">
          Add New Contact
        </h2>
      </div>
      <div className=" flex items-center justify-cente">
        <div className="bg-white py-2 px-5 rounded-lg shadow-sm w-full ">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <Input
              label="Full Name"
              name="fullName"
              register={register}
              error={errors.fullName?.message}
              className="w-full px-3 py-2  rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-200 outline-none"
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              register={register}
              error={errors.email?.message}
              className="w-full px-3 py-2  rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-200 outline-none"
            />
            <Input
              label="Mobile Number"
              name="mobile"
              type="tel"
              register={register}
              error={errors.mobile?.message}
              className="w-full px-3 py-2  rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-200 outline-none"
            />
            <Input
              label="Office Number"
              name="office"
              type="tel"
              register={register}
              className="w-full px-3 py-2  rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-200 outline-none"
            />
            <Input
              label="Company Name"
              name="company"
              register={register}
              error={errors.company?.message}
              className="w-full px-3 py-2  rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-200 outline-none"
            />
            <Input
              label="Address"
              name="address"
              register={register}
              error={errors.address?.message}
              className="w-full px-3 py-2  rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-200 outline-none"
            />

            <div className="flex justify-center gap-10 mt-4">
              <Button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600"
              >
                Add Contact
              </Button>
              <Button
                className="bg-gray-400 text-white px-6 py-2 rounded-xl hover:bg-gray-500"
                onClick={() => setShowForm(false)}
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

export default ShowForm;
