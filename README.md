**String Calculator**
A String Calculator implemented in a test-driven development (TDD) manner. The calculator supports various operations on strings containing numbers, using flexible delimiters and adhering to specific rules.

**Features:**

**1. Basic Addition**
1. The Add method takes a string of numbers and returns their sum:
An empty string returns 0.
A single number returns its value.
Two numbers separated by a comma return their sum.
Example: 
"" → 0
"1" → 1
"1,2" → 3
2. Handles an unknown number of numbers:
Example:
"1,2,3,4,5" → 15

**2. Newline as Delimiter**
1. Supports newlines as delimiters between numbers:
Example:
"1\n2,3" → 6
2. Invalid input (e.g., 1,\n) is not supported

**3. Custom Delimiters**
1. Custom delimiters can be specified using the format: //[delimiter]\n[numbers...].
Example:
"//;\n1;2" → 3

2. Delimiters can be of any length:
Example:
"//[***]\n1***2***3" → 6

3.Multiple delimiters are supported:
Example:
"//[*][%]\n1*2%3" → 6

4.Handles multiple delimiters of varying lengths:
Example:
"//[**][%%]\n1**2%%3" → 6

**4. Error Handling**
Passing negative numbers to Add throws an exception:
Example:
Add("-1,2,-3")
Throws: "Negatives not allowed: -1, -3"

**5. Ignoring Large Numbers**
Numbers greater than 1000 are ignored:
Example:
"2,1001" → 2

**6. Invocation Tracking**
The Add method tracks how many times it has been called:
Example:
GetCalledCount() → Number of `Add` method invocations

