"use client";

import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ImagePlusIcon } from "lucide-react";

export default function AddSchoolPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "image") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      const res = await axios.post("/api/schools", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("School added successfully!");
      router.push("/showSchools");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to add school.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6 text-center">Add a New School</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto space-y-4"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-normal text-gray-300"
          >
            School Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-lg font-normal text-gray-300"
          >
            Address
          </label>
          <input
            id="address"
            {...register("address", { required: "Address is required" })}
            className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-lg font-normal text-gray-300"
          >
            City
          </label>
          <input
            id="city"
            {...register("city", { required: "City is required" })}
            className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="state"
            className="block text-lg font-normal text-gray-300"
          >
            State
          </label>
          <input
            id="state"
            {...register("state", { required: "State is required" })}
            className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2"
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact"
            className="block text-lg font-normal text-gray-300"
          >
            Contact
          </label>
          <input
            id="contact"
            type="tel"
            {...register("contact", {
              required: "Contact is required",
              pattern: { value: /^[0-9]+$/, message: "Invalid contact number" },
            })}
            className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contact.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email_id"
            className="block text-lg font-normal text-gray-300"
          >
            Email Address
          </label>
          <input
            id="email_id"
            type="email"
            {...register("email_id", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2"
          />
          {errors.email_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email_id.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="image"
            className="flex gap-2 cursor-pointer items-center max-w-[164px] text-lg font-normal text-gray-300"
          >
            School Image <ImagePlusIcon/>
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="mt-1 block w-full"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add School
        </button>
      </form>
    </div>
  );
}
