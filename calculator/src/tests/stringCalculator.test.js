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
});
