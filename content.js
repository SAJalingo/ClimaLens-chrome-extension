// content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_ARTICLE_TEXT") {
    let text = "";

    // Try to get readable article content
    const article = document.querySelector("article");
    if (article) {
      text = article.innerText;
    } else {
      // Fallback: get all text from <p> tags
      const paragraphs = Array.from(document.querySelectorAll("p"));
      text = paragraphs.map(p => p.innerText).join("\n");
    }

    // Respond with extracted text
    if (text.trim().length > 50) {
      sendResponse({ text });
    } else {
      sendResponse({ text: null });
    }
  }
  return true; // Keeps message channel open for async response
});
