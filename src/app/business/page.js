"use client";
import React, { useEffect, useState } from "react";
import { FaSearch, FaFilter, FaBuilding, FaUser } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useTranslation } from "react-i18next"; // Import useTranslation
import axios from "axios";

const Page = () => {
    const { t, i18n } = useTranslation(); // Use the translation hook
    const token = localStorage.getItem("authToken");
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [clientList, setClientList] = useState([]);
    const clientsPerPage = 5;

    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = clientList.slice(indexOfFirstClient, indexOfLastClient);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const fetchdata = async () => {
        try {
            const res = await axios.get("https://api.loctour.com/api/bussiness/admin/1", {
                headers: {
                    'x-auth-token': token,
                }
            });
            console.log(res.data);
            setClientList(res.data.users);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchdata();
    }, [token]);

    return (
        <Stack spacing={2} className="mt-10">
            <div>
                <div className="bg-white p-5 shadow-xl rounded-xl">
                    <div className="flex justify-between mb-4">
                        <p className="text-xl font-bold">{t("Check In")}</p>
                        <div className="flex space-x-2">
                            <button className="border px-4 py-2 rounded flex items-center">
                                <FaSearch className="mr-2"/>
                                {t("Search")}
                            </button>
                            <button className="border px-4 py-2 rounded flex items-center">
                                <FaFilter className="mr-2"/>
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
                              {currentClients.map((client, index) => (
                                <tr key={client._id} className="border-b">
                                  <td className="py-3 px-4 text-left text-gray-600">{index + 1}</td>
                                  <td className="py-3 px-4 text-left text-gray-600 flex items-center">
                                    <Image
                                      src={client.images[0]}
                                      alt="client"
                                      width={32}
                                      height={32}
                                      className="rounded-full mr-2"
                                    />
                                  </td>
                                  <td className="py-3 px-4 text-left text-gray-600">{client.title_en}</td>
                                  <td className="py-3 px-4 text-left text-gray-600">
                                    <span>{client.address_en}</span>
                                  </td>
                                  <td className="py-3 px-4 text-left text-gray-600">
                                    <div className="flex space-x-2">
                                        <Link href="/business">
                                            <button className="bg-blue-500 p-2 rounded-full text-white">
                                                <FaBuilding />
                                            </button>
                                        </Link>
                                        <Link href="/users">
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
            </div>
        </Stack>
    );
};

export default Page;
