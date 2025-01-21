"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaFilter, FaEdit, FaBuilding, FaUser } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Link from "next/link";

// Import images (make sure the paths are correct)
import darrellImage from "../images/img.jpg";
import arleneImage from "../images/img.jpg";
import ralphImage from "../images/img.jpg";
import cameronImage from "../images/img.jpg";
import kathrynImage from "../images/img.jpg";

const Page = () => {
  const token = localStorage.getItem("authToken");

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [clientList, setClientList] = useState([]);
  const clientsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching data from the API
        const response = await axios.get(
          "https://api.loctour.com/api/post/admin/1",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        console.log(response.data); // Log data to check its structure

        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          setClientList(response.data);
        } else {
          console.error("Data fetched is not an array:", response.data);
          setClientList([]);
        }
      } catch (error) {
        console.error("There was an error fetching data!", error);
      }
    };

    fetchData();
  }, [token]);

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clientList.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const openEditModal = (client) => {
    // Implement functionality for editing a client
  };

  return (
    <Stack spacing={2} className="mt-10">
      <div className="bg-white p-5 shadow-xl rounded-xl">
        <div className="flex justify-between mb-4">
          <p className="text-xl font-bold">Check In</p>
          <div className="flex space-x-2">
            <button className="border px-4 py-2 rounded flex items-center">
              <FaSearch className="mr-2" />
              Search
            </button>
            <button className="border px-4 py-2 rounded flex items-center">
              <FaFilter className="mr-2" />
              Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left text-gray-600">#</th>
                <th className="py-3 px-4 text-left text-gray-600">Image</th>
                <th className="py-3 px-4 text-left text-gray-600">Description</th>
                <th className="py-3 px-4 text-left text-gray-600">Address</th>
                <th className="py-3 px-4 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentClients.map((client, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-3 text-left text-gray-600">{index + 1}</td>
                  <td className="py-3 px-3 text-left text-gray-600 flex items-center">
                    <Image
                      src={client.images[0]}
                      width={32}
                      height={32}
                      className="rounded-full mr-2"
                    />
                  </td>
                  <td className="py-3 px-3 text-left text-gray-600">{client.title_en}</td>
                  <td className="py-3 px-3 text-left text-gray-600">
                    <span className="px-3 py-1 rounded-full cursor-pointer">
                      {client.address}
                    </span>
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <Link href={`/edit/${client._id}`}>
                        <button className="bg-blue-500 p-2 rounded-full text-white">
                          <FaBuilding />
                        </button>
                      </Link>
                      <Link href={`/user/${client.user}`}>
                        <button className="bg-blue-500 p-2 rounded-full text-white">
                          <FaUser />
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            count={Math.ceil(clientList.length / clientsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </div>
      </div>
    </Stack>
  );
};

export default Page;
