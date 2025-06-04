export async function calculatorTool(
  expression: string
): Promise<{ result: number | string }> {
  try {
    // Extract math expression from natural language
    const mathMatch = expression.match(/[\d+\-*/().\s]+/);
    const mathExpression = mathMatch ? mathMatch[0].trim() : expression;

    // Basic validation - only allow safe characters
    if (!/^[\d+\-*/().\s]+$/.test(mathExpression)) {
      throw new Error("Invalid mathematical expression");
    }

    // Safe evaluation using Function constructor (safer than eval)
    const sanitized = mathExpression.replace(/[^0-9+\-*/().\s]/g, "");
    const result = Function(`"use strict"; return (${sanitized})`)();

    if (typeof result !== "number" || !isFinite(result)) {
      throw new Error("Invalid calculation result");
    }

    return { result };
  } catch (error) {
    console.error("Calculator error:", error);
    return { result: `Error: Could not evaluate "${expression}"` };
  }
}
