"use client";
import React, { useEffect, useState } from 'react';

const EditPackageModal = ({ isOpen, onClose, onSave, packageData }) => {
  const [formData, setFormData] = useState(packageData);

  useEffect(() => {
    setFormData(packageData);
  }, [packageData]);

  const handleChange = (e) => { 
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Edit Package</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-left mb-1 text-white">Name</label>
            <input
              name="name"
              value={formData?.name || ''}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-left mb-1 text-white">Amount</label>
            <input
              name="amount"
              value={formData?.amount || ''}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-left mb-1 text-white">Subtitle</label>
            <input
              name="subtitle"
              value={formData?.subtitle || ''}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-left mb-1 text-white">Expiry Length (days)</label>
            <input
              name="expirey_length"
              value={formData?.expirey_length || ''}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md w-full p-2"
            />
          </div>
          <button type="submit" className="bg-white text-blue-500 rounded-md p-2 w-full hover:bg-gray-200 transition duration-300">Save</button>
        </form>
        <button onClick={onClose} className="mt-4 text-red-600 hover:text-red-400 transition duration-300">Close</button>
      </div>
    </div>
  );
};

export default EditPackageModal;
