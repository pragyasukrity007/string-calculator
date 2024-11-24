let addCallCount = 0;

export function getCalledCount() {
  return addCallCount;
}

export function resetCallCount() {
  addCallCount = 0;
}

export function add(numbers) {
  addCallCount++; // Increment counter at start of function

  // Handle empty or null input
  if (!numbers || numbers.trim() === "") return 0;

  const processNumbers = (str, delimiterPattern) => {
    const negativeNumbers = [];
    const result = str
      .split(delimiterPattern) // Split numbers by delimiter
      .map((num) => num.trim()) // Remove whitespace
      .filter((num) => num !== "") // Remove empty strings
      .map((num) => {
        const parsed = parseInt(num, 10); // Convert to integer
        if (isNaN(parsed)) {
          return 0; // If invalid number, treat as 0
        }
        if (parsed < 0) {
          negativeNumbers.push(parsed); // Track negative numbers
        }
        // Ignore numbers greater than 1000
        return parsed > 1000 ? 0 : parsed; // Return the parsed number
      })
      .reduce((sum, num) => sum + num, 0); // Sum up the numbers

    // If there are negative numbers, throw an error
    if (negativeNumbers.length > 0) {
      throw new Error(
        `negative numbers not allowed: ${negativeNumbers.join(", ")}`
      );
    }

    return result;
  };

  // Check for custom delimiters
  if (numbers.startsWith("//")) {
    const delimiterIndex = numbers.indexOf("\n");
    if (delimiterIndex === -1) return 0;

    const delimitersSection = numbers.substring(2, delimiterIndex); // Extract delimiter
    const numbersSection = numbers.substring(delimiterIndex + 1); // Extract numbers section

    // Handle multiple delimiters in the format //[longdelimiter]\n1longdelimiter2
    const delimiters = delimitersSection
      .match(/\[([^\]]+)\]/g) // Match custom delimiters like [longdelimiter]
      ?.map((d) => d.slice(1, -1)) || [delimitersSection]; // Extract delimiter content or use default

    console.log("Extracted delimiters:", delimiters); // Debugging step

    // Escape delimiters for regex (special characters like [] are escaped properly)
    const escapedDelimiters = delimiters
      .map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) // Escape each delimiter
      .join("|"); // Combine multiple delimiters using OR (|)

    console.log("Escaped delimiters:", escapedDelimiters); // Debugging step

    // Use the combined regex for splitting the numbers section
    const splitRegex = new RegExp(`[,\n${escapedDelimiters}]`, "g");
    console.log("Using regex to split:", splitRegex); // Debugging step

    return processNumbers(
      numbersSection,
      splitRegex // Use the correct regex for splitting
    );
  }

  // Default case: Split by comma and newline
  return processNumbers(numbers, /[,\n]/);
}