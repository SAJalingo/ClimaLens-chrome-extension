# 🌿 ClimaLens – Chrome Extension for Sustainability Insights

ClimaLens is a Chrome extension powered by Google's built-in AI (Gemini APIs) that helps sustainability analysts, energy professionals, and researchers extract insights, scan for greenwashing, and simplify complex sustainability content directly within the browser.

## 🚀 Features

- **Intelligence Summary** – Generates expert-level sustainability and energy insights from web content
- **Metrics Extractor** – Extracts ESG and climate-related data points for quick analysis
- **Greenwashing Scan** – Detects potentially misleading sustainability claims or inconsistencies
- **Simple Explanation** – Simplifies complex sustainability jargon for better understanding

## 🧠 Inspiration

As a Sustainability Data Analyst in energy and climate analytics, I frequently work with lengthy sustainability reports and research papers. Extracting insights manually is tedious and time-consuming. This motivated me to build ClimaLens, a browser extension that brings AI-powered sustainability intelligence directly to your tab.

## 🏗️ How It Works

ClimaLens integrates with Google's Built-in AI APIs through Chrome's Manifest V3 environment. It uses:

- Summarizer API for generating concise summaries
- Prompt API for running custom sustainability analysis (metrics extraction, greenwashing detection, etc.)
- Popup UI for interaction with users

The extension processes the active webpage content, sends it to Gemini AI, and returns structured insights directly inside the extension's interface.

## 🧩 Tech Stack

- HTML5, CSS3, JavaScript (ES6)
- Google Gemini Built-in AI APIs
- Chrome Manifest V3
- Local Storage for saved insights

## ⚙️ Installation & Testing Instructions

Follow these steps to test ClimaLens locally:

1. **Clone this repository**
   ```bash
   git clone https://github.com/yourusername/ClimaLens-Chrome-Extension.git
   cd ClimaLens-Chrome-Extension
