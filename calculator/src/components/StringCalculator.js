"use client";
import React, { useState } from "react";
import { add } from "@/utils/stringCalculator";

export default function StringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    try {
      const normalizedInput = input.replace(/\\n/g, "\n");
      const calculatedResult = add(normalizedInput);
      setResult(calculatedResult);
      setError(null);
    } catch (err) {
      setResult(null);
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInput(newValue);
    setError(null);
    setResult(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCalculate();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          String Calculator
        </h1>

        <div className="space-y-4">
          <textarea
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter numbers (e.g. 1,2,3 or //;\n1;2)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent resize-none"
            rows={3}
          />

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md 
                     hover:bg-blue-600 transition duration-300 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Calculate
          </button>
        </div>

        {result !== null && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
            <p className="text-center font-medium">Result: {result}</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md">
            <p className="text-center font-medium">{error}</p>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          <p className="font-medium mb-2">Examples:</p>
          <ul className="space-y-1 list-disc pl-5">
            <li>Simple: 1,2,3</li>
            <li>With newline: 1\n2,3</li>
            <li>Custom delimiter: //;\n1;2;3</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
