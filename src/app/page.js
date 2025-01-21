// app/page.js
"use client";

import React, { useState } from "react";
import pic1 from "../app/images/img.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { post } from "@/services/api"; // Assuming this is your custom `post` API function

// Validation schema for the form
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Send login data to the server
      const res = await post("/api/auth/admin", values);
      console.log(res.data)
      if (res.status === 200) {
        const { token } = res.data;
        localStorage.setItem("authToken", token); // Store the token in local storage
        toast.success("Login successful!");
        router.push("/users"); // Redirect to the users page after login
      }
    } catch (error) {
      toast.error("Login failed");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen">
      <Image
        src={pic1}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        layout="fill"
      />
      <div className="relative flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-6 bg-white bg-opacity-90 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-center mb-4 text-gray-800">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-600 mb-6">Login to your account</p>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, handleChange, handleBlur }) => (
              <Form className="flex flex-col justify-center h-full">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border border-gray-300 rounded-md p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border border-gray-300 rounded-md p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  disabled={isSubmitting || loading}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
