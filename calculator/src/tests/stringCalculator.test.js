import { add, getCalledCount, resetCallCount } from "@/utils/stringCalculator";

describe("String Calculator", () => {
  beforeEach(() => {
    resetCallCount(); // Reset the call count before each test
  });

  //Step 1:  Test empty string
  it("returns 0 for an empty string", () => {
    expect(add("")).toBe(0);
  });

  //Step 2: Test single number
  it("returns the number for a single number input", () => {
    expect(add("1")).toBe(1);
    expect(add("5")).toBe(5);
    expect(add("9")).toBe(9);
  });

  //Step 3: Test two comma-separated numbers
  it("adds two comma-separated numbers", () => {
    expect(add("1,5")).toBe(6);
    expect(add("2,3")).toBe(5);
  });

  //Step 4: Test multiple comma-separated numbers
  it("adds multiple comma-separated numbers", () => {
    expect(add("1,5,2,8,3")).toBe(19);
    expect(add("2,3,4,5")).toBe(14);
  });

  //Step 5: Test new lines between numbers
  it("supports new line as a delimiter", () => {
    expect(add("1\n2,3")).toBe(6);
    expect(add("1,2\n3")).toBe(6);
    expect(add("1\n2\n3")).toBe(6);
  });

  //Step 6: Test Custom Delimiter
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

  // Step 7: Handle negative numbers
  test("throws on single negative number", () => {
    expect(() => add("-1,2")).toThrow("negative numbers not allowed: -1");
  });

  test("shows all negative numbers in exception", () => {
    expect(() => add("1,-2,-3,4")).toThrow(
      "negative numbers not allowed: -2, -3"
    );
  });

  //Step 9: Call Counter
  test("getCalledCount should initially return 0", () => {
    expect(getCalledCount()).toBe(0);
  });

  test("getCalledCount should increment when add is called", () => {
    const initialCount = getCalledCount();
    add("1,2");
    expect(getCalledCount()).toBe(initialCount + 1);
  });

  test("getCalledCount should increment for each add call", () => {
    const initialCount = getCalledCount();
    add("1,2");
    add("3,4");
    add("5,6");
    expect(getCalledCount()).toBe(initialCount + 3);
  });

  //Step 10: Test for numbers greater than 1000
  it("ignores numbers greater than 1000", () => {
    expect(add("1001,2")).toBe(2); // 1001 is ignored
    expect(add("1000,1001")).toBe(1000); // 1001 is ignored
    expect(add("999,1001,1")).toBe(1000); // Only 999 and 1 are summed
  });

  //Step 11: Test for multiple delimiters
  it("allows multiple custom delimiters", () => {
    expect(add("//[*][%]\n1*2%3")).toBe(6);
    expect(add("//[***][%%%]\n1***2%%%3")).toBe(6);
    expect(add("//[*][%]\n1*2%3%4")).toBe(10);
  });

  it("handles single custom delimiter", () => {
    expect(add("//;\n1;2;3")).toBe(6);
    expect(add("//[***]\n1***2***3")).toBe(6);
  });

  it("ignores numbers greater than 1000", () => {
    expect(add("//[*][%]\n1001*2%3")).toBe(5);
  });

  it("throws an error for negative numbers", () => {
    expect(() => add("//[*][%]\n1*2%-3")).toThrow(
      "negative numbers not allowed: -3"
    );
  });

  //Step 11: Test for long delimiters
  test("should handle long delimiters correctly", () => {
    const input = "//longdelimiter\n1longdelimiter2";
    const result = add(input);
    expect(result).toBe(3); // The sum of 1 and 2
  });

  test("should support long delimiters", () => {
    expect(add("//[***]\n1***2***3")).toBe(6); // Testing with '***' delimiter
  });

  test("should support multiple long delimiters", () => {
    expect(add("//[***][%%%]\n1***2%%%3")).toBe(6); // Multiple delimiters '***' and '%%%'
  });

  test("should handle long delimiters with other characters", () => {
    expect(add("//[****][%%]\n4****5%%6")).toBe(15); // Complex delimiters '****' and '%%'
  });

  test("should return 0 for empty input with long delimiter", () => {
    expect(add("//[***]\n")).toBe(0); // Empty input, should return 0
  });

  test("should ignore numbers greater than 1000 with long delimiter", () => {
    expect(add("//[***]\n1***1001***3")).toBe(4); // 1001 should be ignored
  });

  test("should throw error for negative numbers with long delimiter", () => {
    expect(() => add("//[***]\n-1***2")).toThrowError(
      "negative numbers not allowed: -1"
    );
    // Should throw an error for negative numbers
  });
});
