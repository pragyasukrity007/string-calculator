export function add(numbers) {
  // Handle empty string
  if (!numbers) return 0;

  //Handle Single number support
  if (!numbers.includes(",")) return parseInt(numbers);

  //Handle Multiple numbers comma-separated
  return numbers.split(",").reduce((sum, num) => sum + parseInt(num), 0);
}
