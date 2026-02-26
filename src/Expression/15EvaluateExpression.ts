import { StackImplementation } from "../stack/14Stack.js";

/**
 * Evaluates a space-separated arithmetic expression.
 *
 * Supports +, -, *, / and parentheses.
 * Returns undefined for invalid expressions.
 *
 * @param expression - The input arithmetic expression
 * @returns The computed result or undefined if invalid
 */
export function evaluateExpression(expression: string): number | undefined {
  if (!expression.trim()) return undefined;

  const values = new StackImplementation<number>();
  const operators = new StackImplementation<string>();

  const tokens = expression.split(" ");

  /**
   * Returns operator precedence.
   * @param op - Operator symbol
   * @returns Precedence level
   */
  const precedence = (op: string): number => {
    if (op === "+" || op === "-") return 1;
    if (op === "*" || op === "/") return 2;
    return 0;
  };

  /**
   * Applies the top operator to the top two values.
   * @returns true if successful, false otherwise
   */
  const applyOperator = (): boolean => {
    try {
      const operator = operators.pop();
      const right = values.pop();
      const left = values.pop();

      let result: number;

      switch (operator) {
        case "+":
          result = left + right;
          break;
        case "-":
          result = left - right;
          break;
        case "*":
          result = left * right;
          break;
        case "/":
          if (right === 0) return false;
          result = left / right;
          break;
        default:
          return false;
      }

      values.push(result);
      return true;
    } catch {
      return false;
    }
  };

  for (const token of tokens) {
    if (!isNaN(Number(token))) {
      values.push(Number(token));
    } else if (token === "(") {
      operators.push(token);
    } else if (token === ")") {
      while (operators.top() !== "(") {
        if (!applyOperator()) return undefined;
      }
      operators.pop();
    } else if (["+", "-", "*", "/"].includes(token)) {
      while (
        !operators.isEmpty() &&
        precedence(operators.top()!) >= precedence(token)
      ) {
        if (!applyOperator()) return undefined;
      }
      operators.push(token);
    } else {
      return undefined;
    }
  }

  while (!operators.isEmpty()) {
    if (!applyOperator()) return undefined;
  }

  try {
    return values.pop();
  } catch {
    return undefined;
  }
}
