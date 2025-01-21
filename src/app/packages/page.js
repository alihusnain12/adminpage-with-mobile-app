"use client"; 
import React, { useEffect, useState } from "react"; 
import { FaDollarSign, FaClock, FaTrash } from "react-icons/fa"; // Importing trash icon for delete button
import axios from "axios"; 
import EditPackageModal from "@/components/EditPackageModal"; 
import { toast } from "react-toastify"; 
import CreatePackage from "@/components/packages"; 
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";

const Packages = () => { 
    const [packages, setPackages] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [selectedPackage, setSelectedPackage] = useState(null); 
    const token = localStorage.getItem("authToken"); 

    const fetchPackages = async () => { 
        try { 
            const response = await axios.get("https://api.loctour.com/api/package/all", { 
                headers: { "x-auth-token": token, }, 
            }); 
            setPackages(response.data.packages.slice(0, 3)); 
        } catch (error) { 
            console.error("Error fetching packages:", error); 
        } 
    }; 

    useEffect(() => { 
        fetchPackages(); 
    }, []); 

    const handlePackageCreated = () => { 
        fetchPackages(); 
    }; 

    const handleEditClick = (packageData) => { 
        setSelectedPackage(packageData); 
        setIsModalOpen(true); 
    }; 

    const handleSave = async (updatedPackage) => { 
        if (!token) { 
            toast.error("No authentication token found. Please log in."); 
            return; 
        } 
        try { 
            const response = await axios.put( 
                `https://api.loctour.com/api/package/edit/${updatedPackage._id}`, 
                updatedPackage, 
                { 
                    headers: { "x-auth-token": token, }, 
                } 
            ); 
            if (response.status === 200) { 
                fetchPackages(); 
                setIsModalOpen(false); 
            } 
        } catch (error) { 
            console.error("Error updating package:", error); 
        } 
    }; 

    const handleCloseModal = () => { 
        setIsModalOpen(false); 
    };

    const handleDelete = async (packageId) => {
        if (!token) {
            toast.error("No authentication token found. Please log in.");
            return;
        }
        try {
            const response = await axios.delete(
                `https://api.loctour.com/api/package/${packageId}`,
                {
                    headers: {
                        "x-auth-token": token,
                    },
                }
            );
            if (response.status === 200) {
                toast.success("Package deleted successfully");
                fetchPackages();
            }
        } catch (error) {
            console.error("Error deleting package:", error);
            toast.error("Error deleting package");
        }
    };

    return (
        <div className="mt-7">
            <div className="bg-gray-200 w-full rounded-xl p-6 shadow-2xl">
                <div>
                    <h1 className="font-bold text-2xl mb-2">Present Packages</h1>
                </div>
                <div className="flex justify-between items-center space-x-4 mt-4">
                    {packages.length > 0 ? (
                        packages.map((item, index) => (
                            <div
                                key={index}
                                className="border rounded-xl p-7 w-1/3 h-96 flex flex-col justify-between bg-gradient-to-r from-blue-100 via-white to-blue-100 shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl"
                            >
                                <div className="flex flex-col justify-center items-center mb-4">
                                    <p className="text-3xl font-bold text-center text-blue-500">{item.name}</p>
                                </div>
                                <div className="flex justify-center items-center mt-4">
                                <LiaMoneyBillWaveAltSolid className="text-blue-400 mr-2" size={30}/>

                                    <p className="text-2xl text-gray-500">${item.amount}</p>
                                </div>
                                <div className="flex justify-center items-center mt-2">
                                    <FaClock className="text-blue-400 mr-2" size={30}/>
                                    <p className="text-center p-1 text-gray-500 overflow-hidden text-ellipsis">
                                        Expiry date: {item.expirey_length} days
                                    </p>
                                </div>
                                <div className="overflow-y-auto max-h-24 mt-2 p-1">
                                    <p className="text-center text-gray-500 overflow-hidden text-ellipsis">
                                        {item.subtitle}
                                    </p>
                                </div>
                                <div className="flex justify-center mt-4 space-x-4">
                                    <button
                                        onClick={() => handleEditClick(item)}
                                        className="bg-blue-500 text-white rounded-lg px-[22px] py-2 hover:bg-blue-600 transition duration-300"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition duration-300"
                                    >
                                      Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No packages available.</p>
                    )}
                </div>
            </div>
            <CreatePackage onPackageCreated={handlePackageCreated} />
            <EditPackageModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                packageData={selectedPackage}
            />
        </div>
    );
};

export default Packages;
