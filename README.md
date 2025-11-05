# ClimaLens – Chrome Extension for Sustainability Insights

ClimaLens is a Chrome extension powered by Chrome's built-in AI (Summarizer API) that helps sustainability analysts, energy professionals, and researchers extract insights, scan for greenwashing, and simplify complex sustainability content directly within the browser.

## Features

- **Intelligence Summary** – Generates expert-level sustainability and energy insights from web content
- **Metrics Extractor** – Extracts ESG and climate-related data points for quick analysis
- **Greenwashing Scan** – Detects potentially misleading sustainability claims or inconsistencies
- **Simple Explanation** – Simplifies complex sustainability jargon for better understanding

## Inspiration

As a Sustainability Data Analyst in energy and climate analytics, I frequently work with lengthy sustainability reports and research papers. Extracting insights manually is tedious and time-consuming. This motivated me to build ClimaLens, a browser extension that brings AI-powered sustainability intelligence directly to your tab.

## How It Works

ClimaLens integrates with Chrome's Built-in AI (Summarizer API). It uses:

- Summarizer API for generating concise summaries, metrics extraction, greenwashing detection and simple explanation.
- Popup UI for interaction with users

The extension processes the active webpage content, sends it to Gemini AI, and returns structured insights directly inside the extension's interface.

## Tech Stack

- HTML5, CSS3, JavaScript (ES6)
- Google Gemini Built-in AI APIs
- Chrome Manifest V3
- Local Storage for saved insights

## Installation & Testing Instructions

Follow these steps to test ClimaLens locally:
### Installation

1. **Clone this repository**
   ```bash
   git clone https://github.com/yourusername/ClimaLens-Chrome-Extension.git
   cd ClimaLens-Chrome-Extension

2. **Open Chrome Extensions Page**
   - Open Google Chrome browser
   - Navigate to `chrome://extensions/` in the address bar
   - Alternatively, click **Settings** → **Extensions** → **Manage Extensions**

3. **Enable Developer Mode**
   - Locate the **Developer mode** toggle in the top-right corner
   - Switch the toggle to **ON** position
   - You should see additional developer options appear

4. **Load Unpacked Extension**
   - Click the **"Load unpacked"** button
   - A file dialog window will open
   - Navigate to and select the project folder containing `manifest.json`
   - Click **Select Folder** to load the extension

5. **Verify Installation**
   - You should see **ClimaLens** in your extensions list
   - The ClimaLens icon (🌿) should appear in your browser toolbar
   - Ensure the extension is enabled (toggle switch is ON)

#### ✅ Verification Checklist:
- [ ] Extension appears in chrome://extensions/
- [ ] Developer mode is enabled
- [ ] No error messages in extensions page
- [ ] ClimaLens icon visible in toolbar
- [ ] Extension status shows "Enabled"

#### 🚨 Troubleshooting:
- If the extension doesn't load, ensure you selected the folder containing `manifest.json`
- If icons don't appear, try refreshing the extensions page
- For permission errors, check that all required files are present in the folder

## Testing the Extension

#### Step 1: Visit a Test Webpage
Navigate to a webpage with sustainability content to test ClimaLens:

**Recommended Test Pages:**
- [UN Sustainable Development Goals](https://www.un.org/sustainabledevelopment/)
- [Corporate ESG Reports](https://www.apple.com/environment/)
- [Sustainability News Articles](https://www.greenbiz.com/)
- Any webpage with climate, ESG, or sustainability content

#### Step 2: Test Each Feature

1. **Access ClimaLens**
   - Click the ClimaLens icon in your browser toolbar
   - The extension popup will open with available features

2. **Run Feature Tests**
   - Select **"Intelligence Summary"** from the dropdown menu
   - Click the **"Run"** button to start analysis
   - Wait for AI processing (typically 5-10 seconds)
   - Review the generated insights in the results panel

3. **Repeat for All Features**
   - **"Metrics Extractor"** - Extracts key ESG data points
   - **"Greenwashing Scan"** - Identifies potential misleading claims
   - **"Simple Explanation"** - Simplifies complex terminology

#### Step 3: Verify Functionality

**Expected Results Checklist:**
- [ ] **Results Display**: Insights appear in the extension popup
- [ ] **Copy Functionality**: "Copy" button successfully copies text to clipboard
- [ ] **Clear/Reset**: "Clear" button removes current results
- [ ] **Save Feature**: "Save" functionality preserves insights in local storage
- [ ] **Re-run Capability**: Can process multiple analyses on the same page

### Feature Testing Matrix

| Feature | Test Action | Expected Outcome |
|---------|-------------|------------------|
| Intelligence Summary | Run on sustainability article | Concise expert insights generated |
| Metrics Extractor | Run on ESG report | Key data points and metrics extracted |
| Greenwashing Scan | Run on corporate sustainability page | Potential misleading claims identified |
| Simple Explanation | Run on technical climate paper | Complex concepts simplified |

### Testing Tips
- Ensure the webpage has sufficient text content for analysis
- Test on different types of sustainability content for best results
- Try the "Save" feature and verify insights persist after browser restart
- Use the "Copy" function to export insights to other applications
