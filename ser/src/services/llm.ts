import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateLLMResponse(
  prompt: string,
  tool: string,
  toolResult: string
): Promise<{ content: string; tokens: number }> {
  try {
    const systemPrompt =
      tool === "web-search"
        ? "You are a helpful assistant. Based on the search result provided, give a friendly and informative response to the user's query. Start with 'Based on my search, here's what I found:'"
        : "You are a helpful assistant. Based on the calculation result provided, give a friendly response to the user's math query. Start with 'The answer to your calculation is:'";

    const userMessage = `User asked: "${prompt}"\nTool result: ${toolResult}\n\nPlease provide a helpful response.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 150,
    });

    const content =
      completion.choices[0]?.message?.content ||
      "Sorry, I could not generate a response.";
    const tokens = completion.usage?.total_tokens || 0;

    return { content, tokens };
  } catch (error) {
    console.error("LLM error:", error);

    // Fallback response
    if (tool === "web-search") {
      return {
        content: `Based on my search, here's what I found: ${toolResult}`,
        tokens: 0,
      };
    } else {
      return {
        content: `The answer to your calculation is: ${toolResult}`,
        tokens: 0,
      };
    }
  }
}
