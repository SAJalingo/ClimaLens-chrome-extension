// content.js - Fixed content extraction
console.log("climaLens: Content script loaded");

(function() {
    function extractPageContent() {
        try {
            console.log("Starting content extraction...");
            
            // Get the main content of the page
            const contentSelectors = [
                'article',
                'main',
                '[role="main"]',
                '.content',
                '.post-content',
                '.entry-content',
                '.article-content',
                'body'
            ];

            let mainContent = document.body;
            for (const selector of contentSelectors) {
                const element = document.querySelector(selector);
                if (element && element.textContent.trim().length > 100) {
                    mainContent = element;
                    console.log("Found content with selector:", selector);
                    break;
                }
            }

            // Clone to avoid modifying original DOM
            const contentClone = mainContent.cloneNode(true);
            
            // Remove unwanted elements
            const unwantedSelectors = [
                'nav', 'header', 'footer', 'aside', 
                'script', 'style', 'iframe', 
                '.comments', '.advertisement', '.ad',
                '.menu', '.navigation', '.sidebar',
                '.social-share', '.newsletter', '.popup'
            ];
            
            unwantedSelectors.forEach(selector => {
                const elements = contentClone.querySelectorAll(selector);
                elements.forEach(el => el.remove());
            });

            // Extract and clean text
            let text = contentClone.textContent
                .replace(/\s+/g, ' ')
                .trim();

            // If text is too short, try a different approach
            if (text.length < 200) {
                console.log("Primary extraction too short, trying body directly");
                text = document.body.textContent
                    .replace(/\s+/g, ' ')
                    .trim();
            }

            console.log("Extracted content length:", text.length);
            
            if (!text || text.length < 50) {
                return "No readable content found on this page";
            }

            return text.substring(0, 15000);

        } catch (error) {
            console.error("Content extraction error:", error);
            return "Error extracting content: " + error.message;
        }
    }

    // Execute and return content
    const extractedContent = extractPageContent();
    console.log("climaLens: Extraction complete -", extractedContent.length, "characters");
    return extractedContent;
})();