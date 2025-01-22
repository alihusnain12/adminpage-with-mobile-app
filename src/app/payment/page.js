"use client";
import React, { useState, useEffect } from "react";
import {
  FaBuilding,
  FaBoxOpen,
  FaEllipsisH,
  FaTimes,
  FaUser,
  FaEye
} from "react-icons/fa";
import axios from "axios";
import Image from "next/image";
import Modal from "react-modal";

const Page = () => {
  const [fetchedData, setFetchedData] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.loctour.com/api/users/payments/1",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        console.log(response.data)
        setFetchedData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = (payment) => {
    setSelectedPayment(payment);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPayment(null);
  };

  if (!fetchedData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-12 p-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Payments Table</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">#</th>
            <th className="py-2 px-4 border-b text-left">User</th>
            <th className="py-2 px-4 border-b text-left">Business</th>
            <th className="py-2 px-4 border-b text-left">Package</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fetchedData.payments.map((payment, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td>{index + 1}</td>
              <td className="py-2 px-4 border-b flex items-center">
                <Image
                  className="w-10 h-10 rounded-full mr-2"
                  src={payment?.user?.image || "/default-avatar.png"}
                  alt={`${payment?.user?.name}'s avatar`}
                  width={40}
                  height={40}
                />
                {payment?.user?.name}
              </td>
              <td className="py-2 px-4 border-b">{payment?.bussiness?.title_en}</td>
              <td className="py-2 px-4 border-b">{payment?.package?.name}</td>
              <td className="py-2 px-4 border-b text-center">
                <span className="bg-blue-500 rounded-full h-7 w-7 flex justify-center items-center">
                  <FaEye
                    className="cursor-pointer text-white"
                    onClick={() => openModal(payment)}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Payment Details */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        {selectedPayment && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-200 hover:text-gray-300 transition-colors"
            >
              <FaTimes className="text-2xl" />
            </button>
            <h2 className="text-xl font-semibold text-center mb-4 text-blue-500 border-b pb-2 animate-pulse">Payment Details</h2>

            {/* User Details */}
            <section className="mb-4">
              <h3 className="text-lg font-medium mb-2 flex items-center text-blue-500">
                <FaUser className="mr-2" />
                User Details
              </h3>
              <div className="space-y-2">
                <DetailRow label="Name" value={selectedPayment.user.name} />
                <DetailRow label="Email" value={selectedPayment.user.email} />
                <DetailRow label="Phone" value={selectedPayment.user.phone} />
              </div>
            </section>

            {/* Business Details */}
            <section className="mb-4">
              <h3 className="text-lg font-medium mb-2 flex items-center text-blue-500">
                <FaBuilding className="mr-2" />
                Business Details
              </h3>
              <div className="space-y-2">
                <DetailRow label="Business Name" value={selectedPayment.bussiness.title_en} />
                <DetailRow label="Business Address" value={selectedPayment.bussiness.address_en} />
                <DetailRow
                  label="Industry"
                  value={
                    <span className="bg-gray-300 text-purple-700 font-semibold px-2 py-1 rounded-md">
                      {selectedPayment.bussiness.category}
                    </span>
                  }
                />
              </div>
            </section>

            {/* Package Details */}
            <section className="mb-4">
              <h3 className="text-lg font-medium mb-2 flex items-center text-blue-500">
                <FaBoxOpen className="mr-2" />
                Package Details
              </h3>
              <div className="space-y-2">
                <DetailRow label="Package Type" value={selectedPayment.package.name} />
                <DetailRow
                  label="Expiry Date"
                  value={
                    <span className="bg-red-200 text-red-700 font-semibold px-2 py-1 rounded-md">
                      {selectedPayment.package.expirey_length}
                    </span>
                  }
                />
              </div>
            </section>
          </div>
        )}
      </Modal>
    </div>
  );
};

// Reusable DetailRow component for cleaner code
const DetailRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b">
      <div className="font-medium text-gray-900">{label}:</div>
      <div className="text-gray-900">{value}</div>
    </div>
  );
};

export default Page;