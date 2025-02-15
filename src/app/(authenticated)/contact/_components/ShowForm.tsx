"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import Button from "@/app/(common)/_components/Forms/Button";
import Input from "@/app/(common)/_components/Forms/Input";

// ✅ Zod Validation Schema
const contactSchema = z.object({
  name: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  mobile_number: z
    .string()
    .length(10, "Mobile number must be exactly 10 digits")
    .regex(/^\d+$/, "Mobile number must contain only digits"),
  office_number: z.string().optional(),
  company_name: z.string().min(2, "Company name is required"),
  address: z.string().min(5, "Address is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ShowForm = ({
  setShowForm,
}: {
  setShowForm: (value: boolean) => void;
}) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSuccessMessage("");
      setErrorMessage("");

      await axios.post("/api/contacts", data);

      setSuccessMessage("Contact added successfully!");
      reset();

      setTimeout(() => {
        setShowForm(false);
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setErrorMessage(
          error.response?.data?.message || "Failed to add contact"
        );
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  return (
    <>
      <div className="shadow-sm bg-white h-16 mb-4 rounded-md flex items-center">
        <h2 className="text-2xl font-semibold pl-4 text-gray-800">
          Add New Contact
        </h2>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-white py-2 px-5 rounded-lg shadow-sm w-full">
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md text-center">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md text-center">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              {...register("name")}
              error={errors.name?.message}
            />
            <Input
              label="Email Address"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
            <Input
              label="Mobile Number"
              type="tel"
              {...register("mobile_number")}
              error={errors.mobile_number?.message}
            />
            <Input
              label="Office Number"
              type="tel"
              {...register("office_number")}
            />
            <Input
              label="Company Name"
              {...register("company_name")}
              error={errors.company_name?.message}
            />
            <Input
              label="Address"
              {...register("address")}
              error={errors.address?.message}
            />

            <div className="flex justify-center gap-6 mt-4">
              <Button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600"
              >
                Add Contact
              </Button>
              <Button
                type="button"
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
