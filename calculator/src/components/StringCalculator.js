'use client';
import React, { useState } from 'react';
import { add } from '../utils/stringCalculator';

export default function StringCalculator() {
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    try {
      const calculatedResult = add(numbers);
      setResult(calculatedResult);
      setError(null);
    } catch (err) {
      setResult(null);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="calculator-container w-full sm:w-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-calculator-text">
          String Calculator
        </h1>
        <input 
          type="text" 
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          placeholder="Enter numbers (e.g., 1,2,3)"
          className="calculator-input mb-4"
        />
        <button 
          onClick={handleCalculate}
          className="calculator-button"
        >
          Calculate
        </button>
        
        {result !== null && (
          <div className="result-display">
            Result: {result}
          </div>
        )}
        
        {error && (
          <div className="error-display">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}