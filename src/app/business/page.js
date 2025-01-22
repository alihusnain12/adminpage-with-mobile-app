"use client"
import React, { useEffect, useState } from "react";
import { FaSearch, FaFilter, FaPen } from "react-icons/fa"; 
import Image from "next/image";
import { useRouter } from "next/navigation";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useTranslation } from "react-i18next"; 
import axios from "axios";
import Modal from "react-modal"; 

const Page = () => {
    const { t, i18n } = useTranslation(); // Use the translation hook
    const token = localStorage.getItem("authToken");
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [clientList, setClientList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null); // To store the selected client data for editing
    const [updatedClient, setUpdatedClient] = useState({
        title_en: "",
        address_en: "",
        // Add any other fields that need to be updated
    });

    const clientsPerPage = 5;
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = clientList.slice(indexOfFirstClient, indexOfLastClient);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        const indexOfLastClient = value * clientsPerPage;
        const indexOfFirstClient = indexOfLastClient - clientsPerPage;
        const currentClients = clientList.slice(indexOfFirstClient, indexOfLastClient);
    };

    const fetchData = async () => {
        try {
            const res = await axios.get("https://api.loctour.com/api/bussiness/admin/1", {
                headers: {
                    'x-auth-token': token,
                }
            });
            setClientList(res.data.users);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    const openModal = (client) => {
        setSelectedClient(client); // Set the client data to the state
        setUpdatedClient({
            title_en: client.title_en,
            address_en: client.address_en,
        });
        setModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setModalOpen(false); // Close the modal
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedClient({
            ...updatedClient,
            [name]: value,
        });
    };

    const handleSave = async () => {
        try {
            const res = await axios.put(
                `https://api.loctour.com/api/bussiness/edit/${selectedClient._id}`,
                updatedClient,
                {
                    headers: {
                        'x-auth-token': token,
                    }
                }
            );
            if (res.status === 200) {
                // Update the client list with the new data
                setClientList(clientList.map(client =>
                    client._id === selectedClient._id ? { ...client, ...updatedClient } : client
                ));
                closeModal(); 
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Stack spacing={2} className="mt-10">
            <div>
                <div className="bg-white p-5 shadow-xl rounded-xl">
                    <div className="flex justify-between mb-4">
                        <p className="text-xl font-bold">{t("Business")}</p>
                        <div className="flex space-x-2">
                            <button className="border px-4 py-2 rounded flex items-center">
                                <FaSearch className="mr-2" />
                                {t("Search")}
                            </button>
                            <button className="border px-4 py-2 rounded flex items-center">
                                <FaFilter className="mr-2" />
                                {t("Filter")}
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-3 px-4 text-left text-gray-600">#</th>
                                    <th className="py-3 px-4 text-left text-gray-600">{t("Image")}</th>
                                    <th className="py-3 px-4 text-left text-gray-600">{t("Description")}</th>
                                    <th className="py-3 px-4 text-left text-gray-600">{t("Address")}</th>
                                    <th className="py-3 px-4 text-left text-gray-600">{t("Actions")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientList && currentClients.map((client, index) => (
                                    <tr key={client._id} className="border-b">
                                        <td className="py-3 px-4 text-left text-gray-600">{index + 1 + (currentPage-1)*clientsPerPage}</td>
                                        <td className="py-3 px-4 text-left text-gray-600 flex items-center">
                                            <Image
                                                src={client.images[0]}
                                                alt="client"
                                                width={32}
                                                height={32}
                                                className=" h-16 w-16 rounded-full mr-2"
                                            />
                                        </td>
                                        <td className="py-3 px-4 text-left text-gray-600">{client.title_en}</td>
                                        <td className="py-3 px-4 text-left text-gray-600">{client.address_en}</td>
                                        <td className="py-3 px-4 text-left text-gray-600">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => openModal(client)}
                                                    className="bg-blue-500 p-2 rounded-full text-white"
                                                >
                                                    <FaPen />
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
            </div>

            {/* Edit Modal */}
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                className="fixed inset-0 flex items-center justify-center z-50 p-5"
                overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-80"
            >
                <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-center">{t("Edit Client")}</h2>

                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="title_en" className="text-gray-600">{t("Description")}</label>
                            <input
                                type="text"
                                id="title_en"
                                name="title_en"
                                value={updatedClient.title_en}
                                onChange={handleInputChange}
                                className="border px-4 py-2 rounded"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="address_en" className="text-gray-600">{t("Address")}</label>
                            <input
                                type="text"
                                id="address_en"
                                name="address_en"
                                value={updatedClient.address_en}
                                onChange={handleInputChange}
                                className="border px-4 py-2 rounded"
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white rounded px-4 py-2 mr-2 hover:bg-blue-600"
                        >
                            {t("Save")}
                        </button>
                        <button
                            onClick={closeModal}
                            className="bg-gray-300 rounded px-4 py-2 hover:bg-gray-400"
                        >
                            {t("Cancel")}
                        </button>
                    </div>
                </div>
            </Modal>
        </Stack>
    );
};

export default Page;