// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_ARTICLE_TEXT") {
    try {
      // Extract main visible text from the webpage
      const articleText = extractMainText();
      sendResponse({ text: articleText });
    } catch (err) {
      console.error("ClimaLens: error extracting text:", err);
      sendResponse({ text: "Error extracting text. Please try again." });
    }
  }
  // Keep the message channel open for asynchronous responses
  return true;
});

/**
 * Extract the main visible text from a webpage.
 * This avoids navigation bars, scripts, footers, etc.
 */
function extractMainText() {
  // 1. Remove script and style elements
  document.querySelectorAll("script, style, noscript").forEach(el => el.remove());

  // 2. Attempt to find main content area
  let article =
    document.querySelector("article") ||
    document.querySelector("main") ||
    document.body;

  // 3. Extract and clean text
  let text = article.innerText || "";
  text = text.replace(/\s+/g, " ").trim();

  // 4. Return trimmed text (limit to 5000 chars for performance)
  return text.length > 5000 ? text.slice(0, 5000) + "..." : text;
}
