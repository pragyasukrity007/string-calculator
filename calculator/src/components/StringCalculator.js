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

export default function StringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showExamples, setShowExamples] = useState(false);

  const add = (numbers) => {
    if (!numbers) return 0;

    let delimiter = ",";
    let processedNumbers = numbers;

    // Check for custom delimiter
    if (numbers.startsWith("//")) {
      const firstNewLine = numbers.indexOf("\n");
      if (firstNewLine === -1) {
        throw new Error("Invalid format for custom delimiter");
      }
      delimiter = numbers.substring(2, firstNewLine);
      processedNumbers = numbers.substring(firstNewLine + 1);
    }

    // Split numbers by delimiter and newlines
    const nums = processedNumbers
      .split(new RegExp(`[${delimiter}\\n]`))
      .map((num) => num.trim())
      .filter((num) => num !== "");

    // Convert to numbers and validate
    const parsedNums = nums.map((num) => {
      const parsed = parseInt(num, 10);
      if (isNaN(parsed)) {
        throw new Error(`Invalid number: ${num}`);
      }
      if (parsed < 0) {
        throw new Error("Negative numbers not allowed");
      }
      return parsed <= 1000 ? parsed : 0; // Numbers > 1000 are ignored
    });

    return parsedNums.reduce((sum, num) => sum + num, 0);
  };

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
            placeholder="Enter numbers (e.g. 1,2,3 or //;\n1;2)"
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
              </ul>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
