/**
 * Test suite for evaluateExpression function.
 *
 * Verifies:
 * - Basic arithmetic operations (+, -, *, /)
 * - Operator precedence
 * - Parentheses handling
 * - Complex expressions
 * - Error handling (division by zero, invalid tokens,
 *   incomplete expressions, empty string)
 */

import { describe, it, expect } from "vitest";
import { evaluateExpression } from "./15EvaluateExpression.js";

describe("evaluateExpression", () => {
  /** Should correctly add two numbers */
  it("should evaluate simple addition", () => {
    expect(evaluateExpression("2 + 3")).toBe(5);
  });

  /** Should follow operator precedence (* before +) */
  it("should respect operator precedence", () => {
    expect(evaluateExpression("2 + 3 * 4")).toBe(14);
  });

  /** Should correctly evaluate expressions inside parentheses */
  it("should evaluate expressions with parentheses", () => {
    expect(evaluateExpression("5 * ( 6 + 2 )")).toBe(40);
  });

  /** Should handle mixed operators and parentheses */
  it("should evaluate complex expression", () => {
    expect(evaluateExpression("5 * ( 6 + 2 ) - 12 / 4")).toBe(37);
  });

  /** Should evaluate left-to-right subtraction correctly */
  it("should handle subtraction correctly", () => {
    expect(evaluateExpression("10 - 4 - 1")).toBe(5);
  });

  /** Should perform division correctly */
  it("should handle division correctly", () => {
    expect(evaluateExpression("20 / 5")).toBe(4);
  });

  /** Should return undefined when dividing by zero */
  it("should return undefined for division by zero", () => {
    expect(evaluateExpression("10 / 0")).toBeUndefined();
  });

  /** Should return undefined for invalid input tokens */
  it("should return undefined for invalid token", () => {
    expect(evaluateExpression("a * 3")).toBeUndefined();
  });

  /** Should return undefined for incomplete expressions */
  it("should return undefined for incomplete expression", () => {
    expect(evaluateExpression("5 +")).toBeUndefined();
  });

  /** Should return undefined for empty input */
  it("should return undefined for empty string", () => {
    expect(evaluateExpression("")).toBeUndefined();
  });
});
