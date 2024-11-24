"use client";
import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Button } from "@/ui/button";
import { Textarea } from "@/ui/textarea";
import { Alert, AlertDescription } from "@/ui/alert";

let addCallCount = 0;

export default function StringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showExamples, setShowExamples] = useState(false);
  const [callCount, setCallCount] = useState(0);

  const add = (numbers) => {
    addCallCount++; // Increment the call count
    setCallCount(addCallCount); // Update the state to reflect in the UI

    if (!numbers) return 0;

    let processedNumbers = numbers;
    let delimiters = [",", "\n"]; // Default delimiters

    // Check for custom delimiter (e.g., //[*][%]\n1*2%3)
    if (numbers.startsWith("//")) {
      const firstNewLine = numbers.indexOf("\n");
      if (firstNewLine === -1) {
        throw new Error("Invalid format for custom delimiter");
      }
      const delimitersSection = numbers.substring(2, firstNewLine);
      processedNumbers = numbers.substring(firstNewLine + 1);

      // Extract custom delimiters in the form [longdelimiter]
      const delimiterMatches = delimitersSection.match(/\[([^\]]+)\]/g);
      if (delimiterMatches) {
        delimiters = delimiterMatches.map((match) => match.slice(1, -1)); // Remove brackets
      } else {
        delimiters = [delimitersSection]; // If only one custom delimiter
      }
    }

    // Escape delimiters for regex
    const escapedDelimiters = delimiters
      .map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");

    // Split numbers by the custom delimiters and newlines
    const nums = processedNumbers
      .split(new RegExp(`[${escapedDelimiters}\\n]+`)) // Split using custom delimiters and newlines
      .map((num) => num.trim())
      .filter((num) => num !== "");

    // Collect negative numbers to throw in error message
    const negativeNumbers = [];
    const parsedNums = nums.map((num) => {
      const parsed = parseInt(num, 10);
      if (isNaN(parsed)) {
        throw new Error(`Invalid number: ${num}`);
      }
      if (parsed < 0) {
        negativeNumbers.push(parsed); // Collect negative numbers
      }
      return parsed <= 1000 ? parsed : 0; // Numbers > 1000 are ignored
    });

    // If there are any negative numbers, throw an error with all of them in the message
    if (negativeNumbers.length > 0) {
      throw new Error(
        `Negative numbers not allowed: ${negativeNumbers.join(", ")}`
      );
    }

    return parsedNums.reduce((sum, num) => sum + num, 0);
  };

  const handleCalculate = () => {
    try {
      const normalizedInput = input.replace(/\\n/g, "\n"); // Normalize \n
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
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">String Calculator</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter numbers (e.g. 1,2,3 or //;\n1;2) or custom delimiters"
            className="resize-none"
            rows={3}
          />

          <Button onClick={handleCalculate} className="w-full">
            Calculate
          </Button>

          {result !== null && (
            <Alert variant="default" className="border-green-500 bg-green-50">
              <AlertDescription className="text-center font-medium">
                Result: {result}
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription className="text-center">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="text-center mt-4">
            <p className="font-medium text-gray-600">
              Call Counter: <span className="text-blue-500">{callCount}</span>
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col">
          <Button
            variant="ghost"
            onClick={() => setShowExamples(!showExamples)}
            className="w-full"
          >
            {showExamples ? "Hide Examples" : "Show Examples"}
          </Button>

          {showExamples && (
            <div className="mt-4 space-y-2">
              <p className="font-medium">Examples:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Simple: 1,2,3</li>
                <li>With newline: 1\n2,3</li>
                <li>Custom delimiter: //;\n1;2;3</li>
                <li>Multiple delimiters: //[*][%]\n1*2%3</li>
                <li>Long delimiter: //longdelimiter\n1longdelimiter2</li>
              </ul>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}