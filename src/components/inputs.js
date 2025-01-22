"use client"
import { useState } from "react";

const NumberInputFields = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  // Handler to update state and ensure values are between 1 and 10
  const handleChange = (e, setInput) => {
    const value = e.target.value;
    if (value === "" || (value >= 1 && value <= 10)) {
      setInput(value);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10">
        <h1 className="pb-10 text-2xl font-bold">Icons</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Large</h2>
        <input
          type="number"
          id="input1"
          name="input1"
          value={input1}
          onChange={(e) => handleChange(e, setInput1)}
          min="1"
          max="10"
          required
          className="w-full p-3 text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Medium</h2>
        <input
          type="number"
          id="input2"
          name="input2"
          value={input2}
          onChange={(e) => handleChange(e, setInput2)}
          min="1"
          max="10"
          required
          className="w-full p-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Small</h2>
        <input
          type="number"
          id="input3"
          name="input3"
          value={input3}
          onChange={(e) => handleChange(e, setInput3)}
          min="1"
          max="10"
          required
          className="w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default NumberInputFields;
