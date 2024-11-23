export function add(numbers) {
  // Handle empty or null input
  if (!numbers || numbers.trim() === "") return 0;

  // Helper function to process numbers
  const processNumbers = (str, delimiterPattern) => {
    const negativeNumbers = []; // To track negative numbers

    // Split numbers and map them to integers
    const result = str
      .split(delimiterPattern)
      .map((num) => num.trim()) // Remove whitespace
      .filter((num) => num !== "") // Remove empty strings
      .map((num) => {
        const parsed = parseInt(num, 10); // Convert to integer
        if (isNaN(parsed)) return 0; // If invalid number, treat as 0
        if (parsed < 0) {
          negativeNumbers.push(parsed); // Track negative numbers
        }
        return parsed; // Return the parsed number
      })
      .reduce((sum, num) => sum + num, 0); // Sum up the numbers

    // If there are negative numbers, throw an error
    if (negativeNumbers.length > 0) {
      throw new Error(
        `negative numbers not allowed: ${negativeNumbers.join(", ")}`
      );
    }

    return result; // Return the sum
  };

  // Handle custom delimiter
  if (numbers.startsWith("//")) {
    const delimiterIndex = numbers.indexOf("\n");
    if (delimiterIndex === -1 || delimiterIndex === numbers.length - 1) {
      return 0; // Invalid format or no numbers after delimiter
    }

    const delimiter = numbers.substring(2, delimiterIndex); // Extract delimiter
    const numbersSection = numbers.substring(delimiterIndex + 1); // Extract numbers section

    // Escape special regex characters in delimiter
    const escapedDelimiter = delimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return processNumbers(
      numbersSection,
      new RegExp(`[,\\n${escapedDelimiter}]`) // Handle delimiter in regex
    );
  }

  // Handle default delimiters (comma and newline)
  return processNumbers(numbers, /[,\n]/);
}
