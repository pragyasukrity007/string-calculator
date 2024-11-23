import { add } from "@/utils/stringCalculator";

describe("String Calculator", () => {
  // Test empty string
  it("returns 0 for an empty string", () => {
    expect(add("")).toBe(0);
  });

  // Test single number
  it("returns the number for a single number input", () => {
    expect(add("1")).toBe(1);
    expect(add("5")).toBe(5);
    expect(add("9")).toBe(9);
  });

  //Test two comma-separated numbers
  it("adds two comma-separated numbers", () => {
    expect(add("1,5")).toBe(6);
    expect(add("2,3")).toBe(5);
  });

  //Test multiple comma-separated numbers
  it("adds multiple comma-separated numbers", () => {
    expect(add("1,5,2,8,3")).toBe(19);
    expect(add("2,3,4,5")).toBe(14);
  });

  //Test new lines between numbers
  it("supports new line as a delimiter", () => {
    expect(add("1\n2,3")).toBe(6);
    expect(add("1,2\n3")).toBe(6);
    expect(add("1\n2\n3")).toBe(6);
  });

  //Test Custom Delimiter
  it("supports custom single-character delimiters", () => {
    expect(add("//;\n1;2")).toBe(3);
    expect(add("//|\n1|2|3")).toBe(6);
    expect(add("//@\n1@2")).toBe(3);
  });

  it("returns 0 if no numbers are provided after the delimiter", () => {
    expect(add("//;\n")).toBe(0);
  });

  it("handles mixed delimiters and empty values correctly", () => {
    expect(add("//;\n1;;2")).toBe(3); // Double delimiter results in valid numbers
  });

  it("handles empty sections with custom delimiter", () => {
    expect(add("//;\n1;;2")).toBe(3);
  });

  it("handles whitespace around numbers", () => {
    expect(add("1, 2,3 ")).toBe(6);
  });

  it("handles invalid number formats", () => {
    expect(add("1,a,3")).toBe(4); // Invalid number 'a' treated as 0
  });

  it("handles missing numbers section with custom delimiter", () => {
    expect(add("//@\n")).toBe(0);
  });
});
