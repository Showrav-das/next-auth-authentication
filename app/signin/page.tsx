"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signinAction } from "../libs/actions";

export default function page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signinAction(formData);
      if (response) {
        router.push("/protect");
      } else {
        console.log("first");
      }
    } catch (error) {
      console.log("show error", error);
    }
    // console.log("after submission", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">
          Create Account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* <!-- Email Input --> */}
          <div className="relative">
            <input
              defaultValue={formData.email}
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              required
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-orange-500 left-1"
            >
              Email Address
            </label>
          </div>

          {/* <!-- Password Input --> */}
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              defaultValue={formData.password}
              onChange={handleChange}
              required
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-orange-500 left-1"
            >
              Password
            </label>
          </div>

          {/* <!-- Submit Button --> */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
