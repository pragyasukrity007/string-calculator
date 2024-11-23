export function add(numbers) {
  // Handle empty or null input
  if (!numbers || numbers.trim() === "") return 0;

  // Handle numbers with a given delimiter pattern
  const processNumbers = (str, delimiterPattern) => {
    return str
      .split(delimiterPattern)
      .map((num) => num.trim())
      .filter((num) => num !== "")
      .map((num) => {
        const parsed = parseInt(num, 10);
        if (isNaN(parsed)) return 0;
        if (parsed < 0) {
          throw new Error(`negative numbers not allowed: ${parsed}`);
        }
        return parsed;
      })
      .reduce((sum, num) => sum + num, 0);
  };

  // Handle custom delimiter
  if (numbers.startsWith("//")) {
    const delimiterIndex = numbers.indexOf("\n");
    if (delimiterIndex === -1 || delimiterIndex === numbers.length - 1) {
      return 0; // Invalid format or no numbers after delimiter
    }

    const delimiter = numbers.substring(2, delimiterIndex);
    const numbersSection = numbers.substring(delimiterIndex + 1);

    // Escape special regex characters in delimiter
    const escapedDelimiter = delimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return processNumbers(
      numbersSection,
      new RegExp(`[,\\n${escapedDelimiter}]`)
    );
  }

  // Handle default delimiters (comma and newline)
  return processNumbers(numbers, /[,\n]/);
}
