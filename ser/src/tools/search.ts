import { getJson } from "serpapi";

export async function searchTool(
  query: string
): Promise<{ title: string; link: string }> {
  try {
    const response = await getJson({
      engine: "google",
      q: query,
      api_key: process.env.SERPAPI_KEY,
    });

    const firstResult = response.organic_results?.[0];

    if (!firstResult) {
      return {
        title: "No results found",
        link: "https://google.com/search?q=" + encodeURIComponent(query),
      };
    }

    return {
      title: firstResult.title || "Result found",
      link: firstResult.link || "https://google.com",
    };
  } catch (error) {
    console.error("Search error:", error);
    // Fallback for demo purposes
    return {
      title: `Search results for: ${query}`,
      link: "https://google.com/search?q=" + encodeURIComponent(query),
    };
  }
}
