"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.string().required("Price is required"),
  expiryDate: Yup.string().required("Expiry date is required"),
  description: Yup.string().required("Description is required"),
});

const CreatePackage = ({ onPackageCreated }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const token = localStorage.getItem("authToken");

  const handleSubmit = async (values) => {
    if (!token) {
      toast.error("No authentication token found. Please log in.");
      return;
    }

    // Create the data structure as in your example
    const data = JSON.stringify({
      name: values.title,  // Mapping 'title' from the form to 'name' in the request
      amount: values.price,  // Mapping 'price' from the form to 'amount'
      subtitle: values.description,  // Mapping 'description' from the form to 'subtitle'
      expirey_length: values.expiryDate,  // Mapping 'expiryDate' from the form to 'expirey_length'
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.loctour.com/api/package/create',
      headers: { 
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      setLoading(true);
      const response = await axios.request(config);
      toast.success("Package created successfully!");
      onPackageCreated();
    } catch (error) {
      toast.error("Error creating package. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-7">
      <div className="bg-gray-200 p-6 rounded-lg shadow-2xl">
        <p className="text-xl font-extrabold">Create Package</p>
        <Formik
          initialValues={{
            title: "",
            price: "",
            expiryDate: "",
            description: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            handleSubmit,
            handleChange,
            touched,
          }) => (
            <form className="mt-8 flex justify-between" onSubmit={handleSubmit}>
              <div className="w-1/2 pr-4">
                <div className="mb-4">
                  <label className="block text-lg font-bold mb-2">Title</label>
                  <input
                    name="title"
                    className="border border-black rounded-lg w-full p-2"
                    placeholder="Enter title"
                    type="text"
                    value={values.title}
                    onChange={handleChange}
                  />
                  {errors.title && touched.title && (
                    <div className="text-red-500">{errors.title}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold mb-2">Price</label>
                  <input
                    name="price"
                    className="border border-black rounded-lg w-full p-2"
                    placeholder="Enter price"
                    value={values.price}
                    onChange={handleChange}
                  />
                  {errors.price && touched.price && (
                    <div className="text-red-500">{errors.price}</div>
                  )}
                </div>
              </div>

              <div className="w-1/2 pl-4">
                <div className="mb-4">
                  <label className="block text-lg font-bold mb-2">
                    Expiry Date
                  </label>
                  <input
                    name="expiryDate"
                    className="border border-black rounded-lg w-full p-2"
                    placeholder="Enter expiry date"
                    type="text"
                    value={values.expiryDate}
                    onChange={handleChange}
                  />
                  {errors.expiryDate && touched.expiryDate && (
                    <div className="text-red-500">{errors.expiryDate}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold mb-2">
                    Description
                  </label>
                  <input
                    name="description"
                    className="border border-black rounded-lg w-full p-2"
                    placeholder="Enter description"
                    type="text"
                    value={values.description}
                    onChange={handleChange}
                  />
                  {errors.description && touched.description && (
                    <div className="text-red-500">{errors.description}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-lg px-10 py-3 mt-4 w-full flex justify-center items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <ThreeDots
                      width="20"
                      height="20"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      color="#fff"
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreatePackage;
