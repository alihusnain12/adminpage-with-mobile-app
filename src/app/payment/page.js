"use client";
import React, { useState, useEffect } from "react";
import { FaBuilding, FaBoxOpen } from "react-icons/fa";
import axios from "axios";
import Image from "next/image";

const Page = () => {
  const [fetchedData, setFetchedData] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.loctour.com/api/users/payments/1", {
          headers: {
            "x-auth-token": token,
          },
        });
        setFetchedData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!fetchedData) {
    return <div>Loading...</div>;
  }

  // Destructure the data you need from the response
  const payment = fetchedData.payments[0];
  const user = payment?.user || {};
  const business = payment?.bussiness || {};
  const packageDetails = payment?.package || {};
  const images = business?.images || [];

  return (
    <div className="max-w-4xl mx-auto my-12 p-10 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <header className="bg-gradient-to-br from-teal-600 to-cyan-500 p-8 rounded-t-lg text-center text-white shadow-md">
        <div className="flex items-center justify-center space-x-4 mb-3">
          <Image
            className="w-20 h-20 rounded-full"
            src={user.image || "/default-avatar.png"} // Placeholder if no image is available
            alt={`${user.name}'s avatar`}
            width={80} // Explicit width for the user image
            height={80} // Explicit height for the user image
          />
          <h1 className="text-4xl font-bold">{user.name}</h1>
        </div>
        <p className="text-md">{user.status || "Active"}</p>
      </header>

      {/* Main Content */}
      <main className="p-8 space-y-8">
        {/* Business Details Section */}
        <section className="border-t-4 border-teal-600 pt-6">
          <h2 className="text-3xl font-semibold flex items-center">
            <FaBuilding className="text-teal-600 text-4xl mr-3" />
            Business Details
          </h2>
          <div className="mt-4 space-y-2 text-lg">
            <DetailItem label="Business Name" value={business.title_en} />
            <DetailItem label="Business Address" value={business.address_en} />
            <DetailItem
              label="Industry"
              value={
                <span className="bg-green-200 text-green-900 font-semibold px-2 py-1 rounded-md">
                  {business.category}
                </span>
              }
            />
          </div>
        </section>

        {/* Package Details Section */}
        <section className="border-t-4 border-blue-600 pt-6">
          <h2 className="text-3xl font-semibold flex items-center">
            <FaBoxOpen className="text-blue-600 text-4xl mr-3" />
            Package Details
          </h2>
          <div className="mt-4 space-y-2 text-lg">
            <DetailItem
              label="Package Type"
              value={
                <span className="bg-blue-200 text-blue-900 font-semibold px-2 py-1 rounded-md">
                  {packageDetails.name}
                </span>
              }
            />
            <DetailItem
              label="Expiry Date"
              value={
                <span className="bg-red-200 text-red-900 font-semibold px-2 py-1 rounded-md">
                  {packageDetails.expirey_date}
                </span>
              }
            />
          </div>
        </section>

        {/* User Details Section */}
        <section className="border-t-4 border-purple-600 pt-6">
          <h2 className="text-3xl font-semibold flex items-center">
            <FaBoxOpen className="text-purple-600 text-4xl mr-3" />
            User Details
          </h2>
          <div className="mt-4 space-y-2 text-lg">
            <DetailItem label="Email" value={user.email} />
            <DetailItem label="Phone" value={user.phone} />
          </div>
        </section>

      </main>
    </div>
  );
};

// Reusable Detail Item Component
const DetailItem = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="font-medium">{label}:</span>
      <span className="ml-2">{value}</span>
    </div>
  );
};

export default Page;
