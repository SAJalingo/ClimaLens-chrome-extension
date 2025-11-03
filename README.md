# ClimaLens – Chrome Extension for Sustainability Insights

**ClimaLens** is a Chrome extension powered by **Google’s Built-in AI (Gemini APIs)** that helps sustainability analysts, energy professionals, and researchers **extract insights**, **scan for greenwashing**, and **simplify complex sustainability content** directly within the browser.

---

## Features

- **Intelligence Summary** – Generates expert-level sustainability and energy insights from web content.  
- **Metrics Extractor** – Extracts ESG and climate-related data points for quick analysis.  
- **Greenwashing Scan** – Detects potentially misleading sustainability claims or inconsistencies.  
- **Simple Explanation** – Simplifies complex sustainability jargon for better understanding.  

---

## Inspiration

As a **Sustainability Data Analyst** in energy and climate analytics, I frequently work with lengthy sustainability reports and research papers. Extracting insights manually is tedious and time-consuming.  
This motivated me to build **ClimaLens**, a browser extension that brings **AI-powered sustainability intelligence** directly to your tab.

---

## How It Works

ClimaLens integrates with **Google’s Built-in AI APIs** through **Chrome’s Manifest V3** environment.  
It uses the following APIs:

- **Summarizer API** – Generates concise summaries (metrics extraction, greenwashing detection, etc.).  
- **Popup UI** – Provides an interactive and intuitive interface for users.  

The extension processes the active webpage content, sends it to **Gemini AI**, and returns structured insights directly inside the extension interface.

---

## Tech Stack

- **HTML5, CSS3, JavaScript (ES6)**  
- **Google Gemini Built-in AI APIs**  
- **Chrome Manifest V3**  
- **Local Storage** for saving and managing insights  

---

## Installation & Testing Instructions

Follow these steps to test **ClimaLens** locally:

# Step 1: Clone the Repository

```bash
# Clone this repository
git clone https://github.com/<yourusername>/ClimaLens-Chrome-Extension.git
cd ClimaLens-Chrome-Extension```

# Step 2: Load the Extension in Chrome

1.  Open **Google Chrome** and go to:chrome://extensions/
    
2.  Enable **Developer Mode** (toggle switch at the top-right corner).
    
3.  Click **Load unpacked** and select the project folder:/ClimaLens-Chrome-Extension
    
4.  Once loaded, you should see **ClimaLens** appear in your Chrome extensions toolbar.
    

# Step 3: Using the Extension

1.  Visit any **sustainability-related webpage**, such as:
    
    *   Environmental or climate change articles
        
    *   ESG reports
        
    *   Renewable energy blogs
        
2.  Click on the **ClimaLens icon** in your Chrome toolbar.
    
3.  In the popup:
    
    *   Choose an **AI Action** from the dropdown:
        
        *   Intelligence Summary
            
        *   Metrics Extractor
            
        *   Greenwashing Scan
            
        *   Simple Explanation
            
    *   Click the **Run** button to start the analysis.
        
4.  Wait for the AI to process the content.
    
    *   Results will appear directly in the **result panel** inside the popup.
        

# Step 4: Testing Features

Once AI results appear, test the following interactive features:

*   **Copy** – Copies the AI-generated text to clipboard.
    
*   **Re-run** – Reprocesses the same page content for fresh results.
    
*   **Clear** – Clears the result panel.
    
*   **Save** – Stores the AI output locally for later access under the “Saved Insights” tab.
    

> Note: These buttons remain disabled until a result is generated to ensure a smooth UX.

# Step 5: Testing Different AI Actions


AI ActionDescriptionExample Use Case**Intelligence Summary**Generates a professional, concise summary of sustainability content.Analyze climate policy articles.**Metrics Extractor**Extracts ESG or emission-related data from reports.Extract carbon footprint data from corporate reports.**Greenwashing Scan**Flags potentially misleading sustainability claims.Evaluate company press releases for accuracy.**Simple Explanation**Simplifies technical climate or energy terminology.Explain ESG or decarbonization concepts.

⚠️ Troubleshooting
------------------

If the extension does not work as expected:

*   Ensure you are **not on restricted pages** like chrome://, chrome-extension://, or pages requiring login.
    
*   Reload the tab and try again.
    
*   Check the **Console (Ctrl + Shift + J)** for logs labeled “ClimaLens:”.
    
*   Make sure you have a stable internet connection for Gemini AI requests.
    

✅ Expected Results
------------------

When testing successfully:

*   The current website title appears in the header.
    
*   The **Run** button activates after selecting an action.
    
*   After running, the AI output displays clearly in the result panel.
    
*   **Save**, **Copy**, **Re-run**, and **Clear** buttons become enabled.
    
*   Saved items can be accessed under the **Saved Insights** tab.
