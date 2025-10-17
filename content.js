chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_ARTICLE_TEXT") {
    let text = "";

    // Try extracting main content
    const article = document.querySelector("article");
    if (article) {
      text = article.innerText;
    } else {
      // Fallback: use body text if no article tag found
      text = document.body.innerText || "No readable content found.";
    }

    sendResponse({ text });
  }

  return true; // Keep message channel open for async response
});
