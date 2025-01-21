import React, { useState, useEffect } from "react";
import { FaClipboardList, FaCalendarCheck, FaBoxOpen } from "react-icons/fa"; // Added FaBoxOpen
import { MdDashboard } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import pic from "../app/images/logo.webp";
import { MdPayments } from "react-icons/md";

const sideitems = [
  { id: 1, name: "UsersPage", icon: <MdDashboard />, link: "/users" },
  { id: 2, name: "Business", icon: <FaClipboardList />, link: "/business" },
  { id: 3, name: "CheckIn", icon: <FaCalendarCheck />, link: "/checkIn" },
  { id: 4, name: "Packages", icon: <FaBoxOpen />, link: "/packages" }, 
  { id: 5, name: "Payment", icon: <MdPayments />, link: "/payment" }, // Fixed duplicate id here
];

const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #1f2937;
  }
  ::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
`;

export default function Sidebar({ children }) {
  // Retrieve the selected option from local storage or set default
  const [selectedOption, setSelectedOption] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedOption") || "UsersPage";
    }
    return "UsersPage";
  });

  const handleNavigation = (name) => {
    setSelectedOption(name);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedOption", name); // Save to local storage
    }
  };

  // Update state from local storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSelectedOption(localStorage.getItem("selectedOption") || "UsersPage");
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <style>{scrollbarStyles}</style>
      <div className="w-64 bg-black text-white flex flex-col justify-between overflow-y-auto shadow-lg fixed h-full">
        <div className="p-6">
          <Image src={pic} alt="Logo" className="mx-auto w-20 rounded-full h-auto" />
          <div className="mt-6 space-y-2">
            {sideitems.map((item) => (
              <Link href={item.link} key={item.id}>
                <button
                  className={`w-full flex items-center hover:bg-gray-800 rounded-lg p-2 mb-2 cursor-pointer transition duration-200 ease-in-out ${
                    selectedOption === item.name ? "bg-blue-400 text-white" : "text-gray-300"
                  }`}
                  onClick={() => handleNavigation(item.name)}
                >
                  <div className="text-white mr-2">{item.icon}</div>
                  <span>{item.name}</span>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 bg-gray-50 ml-64 overflow-y-auto">
        <div className="bg-white text-black py-4 px-6 flex justify-between items-center shadow-md">
          <div className="text-xl font-semibold">Navbar Title</div>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
