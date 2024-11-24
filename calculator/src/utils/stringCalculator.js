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
      .split(delimiterPattern)
      .map((num) => num.trim())
      .filter((num) => num !== "")
      .map((num) => {
        const parsed = parseInt(num, 10);
        if (isNaN(parsed)) return 0;
        if (parsed < 0) {
          negativeNumbers.push(parsed);
        }
        return parsed;
      })
      .reduce((sum, num) => sum + num, 0);

    if (negativeNumbers.length > 0) {
      throw new Error(`negative numbers not allowed: ${negativeNumbers.join(", ")}`);
    }

    return result;
  };

  if (numbers.startsWith("//")) {
    const delimiterIndex = numbers.indexOf("\n");
    if (delimiterIndex === -1 || delimiterIndex === numbers.length - 1) {
      return 0;
    }

    const delimiter = numbers.substring(2, delimiterIndex);
    const numbersSection = numbers.substring(delimiterIndex + 1);
    const escapedDelimiter = delimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return processNumbers(numbersSection, new RegExp(`[,\\n${escapedDelimiter}]`));
  }

  return processNumbers(numbers, /[,\n]/);
}
