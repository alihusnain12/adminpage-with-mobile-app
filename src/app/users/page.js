"use client";
import React, { useEffect, useState } from "react";
import { FaSearch, FaFilter, FaPen } from "react-icons/fa"; // Added FaPen icon for editing
import Image from "next/image";
import Modal from "react-modal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

// Define styles for status
const statusStyles = {
  online: "bg-green-200 text-green-800",
  deactivate: "bg-yellow-200 text-yellow-800",
  delete: "bg-blue-200 text-blue-800",
};

const LeadTable = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentClient, setCurrentClient] = useState(null);
  const [clientList, setClientList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Retrieve the token from localStorage
  const token = localStorage.getItem("authToken");

  const clientsPerPage = 5;
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clientList.slice(indexOfFirstClient, indexOfLastClient);

  const openModal = (status, client) => {
    setSelectedStatus(status);
    setCurrentClient(client);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedStatus("");
    setCurrentClient(null);
  };

  const saveStatusChange = () => {
    if (currentClient) {
      const updatedClients = clientList.map((client) =>
        client._id === currentClient._id
          ? { ...client, status: selectedStatus }
          : client
      );
      setClientList(updatedClients);
      closeModal();
    }
  };

  const statusOptions = ["online", "deactivate", "delete"];

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          console.log("Token is missing");
          return;
        }

        const res = await axios.get("https://api.loctour.com/api/users/all/1", {
          headers: {
            "x-auth-token": token,
          },
        });

        // Check if the response data has users
        if (res.data && res.data.users) {
          setClientList(res.data.users); 
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); 
  }, [token]); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  // delete User 

  const handleDelete=async(package_id)=>{
    try {
      const res=await axios.delete(`https://api.loctour.com/api/users/${package_id}`,
        {
          headers: {
              "x-auth-token": token,
          },
      }
      )
      toast.success("User deleted successfully")

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Stack spacing={2} className="mt-10">
      <div>
        <div className="bg-white p-5 shadow-xl rounded-xl">
          <div className="flex justify-between mb-4">
            <p className="text-xl font-bold">Users</p>
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
                  <th className="py-3 px-4 text-left text-gray-600">Client Name</th>
                  <th className="py-3 px-4 text-left text-gray-600">Email</th>
                  <th className="py-3 px-4 text-left text-gray-600">Phone</th>
                  <th className="py-3 px-4 text-left text-gray-600">Status</th>
                  <th className="py-3 px-4 text-left text-gray-600">Type</th>
                  <th className="py-3 px-4 text-right text-gray-600">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentClients.map((client, index) => (
                  <tr key={client._id} className="border-b">
                    <td className="py-3 px-3 text-left text-gray-600">{index + 1}</td> {/* Use index for row number */}
                    <td className="py-3 px-3 text-left text-gray-600 flex items-center">
                      <Image
                        src={client.image}
                        alt={client.name}
                        width={32}
                        height={32}
                        style={{ borderRadius: "50%" }}  
                        className=" h-16 w-16 mr-2" // Make image rounded
                      />
                      {client.name}
                    </td>
                    <td className="py-3 px-3 text-left text-gray-600">{client.email}</td>
                    <td className="py-3 px-3 text-left text-gray-600">{client.phone}</td>
                    <td className="py-3 px-3 text-left text-gray-600">
                      <span
                        className={`px-3 py-1 rounded-full cursor-pointer ${statusStyles[client.status]}`}
                        onClick={() => openModal(client.status, client)}
                      >
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-left text-gray-600">{client.type}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                      onClick={()=>handleDelete(client._id)}
                        className="mx-1 text-white hover:text-yellow-600 bg-blue-400 rounded-full p-2"
                      >
                        <MdDelete className="text-xl" /> 
                      </button>
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

        {/* Status Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="fixed inset-0 flex items-center justify-center z-50 p-5"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-80"
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">
              Change Status for {currentClient ? currentClient.name : ""}
            </h2>
            <div className="space-y-2 mb-4">
              {statusOptions.map((status) => (
                <div key={status} className="flex items-center">
                  <input
                    type="radio"
                    id={status}
                    name="status"
                    value={status}
                    checked={selectedStatus === status}
                    onChange={() => setSelectedStatus(status)}
                    className="mr-2"
                  />
                  <label htmlFor={status} className="cursor-pointer">
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={saveStatusChange}
                className="bg-blue-500 text-white rounded px-4 py-2 mr-2 hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 rounded px-4 py-2 hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <ToastContainer/>
    </Stack>
  );
};

export default LeadTable;
