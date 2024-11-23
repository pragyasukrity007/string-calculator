import { add } from "@/utils/stringCalculator";

describe("String Calculator", () => {
  // Test empty string
  it("returns 0 for an empty string", () => {
    expect(add("")).toBe(0);
  });

 // Test single number
  it('returns the number for a single number input', () => {
    expect(add('1')).toBe(1);
    expect(add('5')).toBe(5);
    expect(add('9')).toBe(9);
  });
});
