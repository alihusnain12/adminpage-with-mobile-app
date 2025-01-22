"use client"; 
import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import { FaSearch, FaFilter, FaBuilding, FaUser } from "react-icons/fa"; 
import Image from "next/image"; 
import { useRouter } from "next/navigation"; 
import Pagination from "@mui/material/Pagination"; 
import Stack from "@mui/material/Stack";

const Page = () => {
  const token = localStorage.getItem("authToken");
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [clientList, setClientList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const clientsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.loctour.com/api/post/admin/1", {
          headers: {
            "x-auth-token": token,
          },
        });
        console.log(response.data);
        setClientList(response.data.posts);
      } catch (error) {
        console.error("There was an error fetching data!", error);
      }
    };
    fetchData();
  }, [token]);

  // Calculate clients for current page
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clientList.slice(indexOfFirstClient, indexOfLastClient);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Modal handling logic
  const handleBusinessModal = (business) => {
    setSelectedBusiness(business);
    setModalOpen(true);
  };

  const handleUserModal = (user) => {
    setSelectedUser(user);
    setModalOpen1(true);
  };

  // Custom Modal Component
  const CustomModal = ({ open, onClose, title, content }) => {
    if (!open) {
      return null;
    }
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-90" onClick={onClose}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-80">
          <h2 className="font-bold text-2xl mb-4">{title}</h2>
          {content}
          <button 
            onClick={onClose} 
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <Stack spacing={2} className="mt-10">
      <div className="bg-white p-5 shadow-xl rounded-xl">
        <div className="flex justify-between mb-4">
          <p className="text-xl font-bold">Check In</p>
          <div className="flex space-x-2">
            <button className="border px-4 py-2 rounded flex items-center">
              <FaSearch className="mr-2" /> Search
            </button>
            <button className="border px-4 py-2 rounded flex items-center">
              <FaFilter className="mr-2" /> Filter
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
                <tr key={client._id} className="border-b">
                  <td className="py-3 px-3 text-left text-gray-600">
                    {index + 1 + (currentPage - 1) * clientsPerPage}
                  </td>
                  <td className="py-3 px-3 text-left text-gray-600 flex items-center">
                    <Image
                      src={client.images[0]}
                      alt={client.title_en}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full mr-2"
                    />
                  </td>
                  <td className="py-3 px-3 text-left text-gray-600">{client.caption}</td>
                  <td className="py-3 px-3 text-left text-gray-600">
                    <span className="px-3 py-1 rounded-full cursor-pointer">
                      {client.address}
                    </span>
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-500 p-2 rounded-full text-white"
                        onClick={() => handleBusinessModal(client)} // Pass the business to the modal
                      >
                        <FaBuilding />
                      </button>
                      <button
                        className="bg-blue-500 p-2 rounded-full text-white"
                        onClick={() => handleUserModal(client.user)} // Pass the user to the modal
                      >
                        <FaUser />
                      </button>
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

      {/* Business Modal */}
      <CustomModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Business Details"
        content={selectedBusiness ? (
          <div>
            <Image
              src={selectedBusiness.images[0]}
              alt={selectedBusiness.title_en}
              width={128}
              height={128}
              className="w-full h-32 object-cover rounded mb-4"
            />
            <p><strong>Title:</strong> {selectedBusiness.title_en}</p>
            <p><strong>Category:</strong> {selectedBusiness.category}</p>
            <p><strong>Address:</strong> {selectedBusiness.address}</p>
            <p><strong>Description:</strong> {selectedBusiness.caption}</p>
          </div>
        ) : (
          <div>No business selected.</div>
        )}
      />

      {/* User Modal */}
      <CustomModal
        open={modalOpen1}
        onClose={() => setModalOpen1(false)}
        title="User Details"
        content={selectedUser ? (
          <div>
            <Image
              src={selectedUser.image}
              alt={selectedUser.name}
              width={128}
              height={128}
              className="w-full h-32 object-cover rounded mb-4"
            />
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
          </div>
        ) : (
          <div>No user selected.</div>
        )}
      />
    </Stack>
  );
};

export default Page;