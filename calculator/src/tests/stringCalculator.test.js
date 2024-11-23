import { add } from "@/utils/stringCalculator";

describe("String Calculator", () => {
  // Test empty string
  it("returns 0 for an empty string", () => {
    expect(add("")).toBe(0);
  });

});
