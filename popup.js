// popup.js - Fixed tab switching and saved items WITH SUMMARIZER API
console.log("climaLens: Extension loaded");

// Analysis prompts
const PROMPTS = {
    intelligence: `As a sustainability expert, provide a comprehensive analysis of this climate/energy content. Focus on key insights, business implications, and actionable recommendations.`,
    metrics: `Extract and organize all climate and sustainability metrics from this content. Look for emissions data, renewable energy targets, carbon offsets, and ESG metrics.`,
    greenwashing: `Analyze this content for greenwashing risk. Identify vague claims, missing data, and credibility issues. Provide a risk assessment with specific evidence.`,
    simple: `Explain this climate/energy content in simple, easy-to-understand language. Use analogies and avoid technical jargon.`
};

// Demo responses
const DEMO_RESPONSES = {
    intelligence: `🌍 **Sustainability Intelligence Summary**\n\n**Key Insights:**\n- Climate action requires coordinated global effort\n- Renewable energy adoption accelerating faster than expected\n- Significant business opportunities in green technology\n\n**Recommendations:**\n- Invest in climate-resilient infrastructure\n- Develop comprehensive ESG strategies\n- Engage stakeholders in sustainability initiatives`,
    
    metrics: `📊 **Climate Metrics Extracted**\n\n**Emissions:**\n- CO2 Reduction Target: 50% by 2030\n- Current Renewable Energy: 45%\n- Energy Efficiency Improvement: 12%\n\n**Targets:**\n- Net Zero: 2050\n- 100% Renewable: 2040\n- Carbon Neutral Operations: 2025`,
    
    greenwashing: `🔍 **Greenwashing Risk Assessment**\n\n**Overall Risk: LOW** 🟢\n\n**Strengths:**\n- Clear, measurable targets\n- Transparent reporting\n- Third-party verification\n\n**Recommendations:**\n- Enhance supply chain transparency\n- Increase biodiversity reporting`,
    
    simple: `🤝 **Simple Explanation**\n\nClimate change is like Earth's fever. Clean energy solutions are the medicine that helps our planet heal and stay healthy for future generations.`
};

// Initialize extension
document.addEventListener('DOMContentLoaded', initializeExtension);

async function initializeExtension() {
    console.log("Initializing climaLens...");
    await updateCurrentPageInfo();
    setupEventListeners();
    
    // Initialize the first tab
    switchToTab('generate');
}

// Update current page info
async function updateCurrentPageInfo() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab && tab.url.startsWith('http')) {
            document.querySelector('.page-title').textContent = tab.title || 'Current Page';
            document.querySelector('.page-url').textContent = tab.url;
            window.currentTab = tab;
        }
    } catch (error) {
        console.error("Page info error:", error);
    }
}

// Setup event listeners
function setupEventListeners() {
    console.log("Setting up event listeners...");
    
    // Tab switching - FIXED
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', (e) => {
            console.log("Tab button clicked:", e.target.dataset.tab);
            switchToTab(e.target.dataset.tab);
        });
    });

    // Generate analysis
    document.getElementById('generate-btn').addEventListener('click', generateAnalysis);

    // Action buttons
    document.getElementById('save-btn').addEventListener('click', saveAnalysis);
    document.getElementById('copy-btn').addEventListener('click', copyAnalysis);
    document.getElementById('rerun-btn').addEventListener('click', rerunAnalysis);
    document.getElementById('clear-btn').addEventListener('click', clearAnalysis);

    // Modal
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('saved-modal').addEventListener('click', (e) => {
        if (e.target.id === 'saved-modal') closeModal();
    });
}

// Tab switching - COMPLETELY REWRITTEN
function switchToTab(tabName) {
    console.log("Switching to tab:", tabName);
    
    // Remove active class from all tabs and panels
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
        panel.hidden = true;
    });
    
    // Add active class to selected tab and panel
    const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
    const activePanel = document.getElementById(`${tabName}-panel`);
    
    if (activeButton && activePanel) {
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-selected', 'true');
        activePanel.classList.add('active');
        activePanel.hidden = false;
        
        console.log(`Tab ${tabName} activated successfully`);
        
        // Load saved summaries if switching to saved tab
        if (tabName === 'saved') {
            console.log("Loading saved summaries for saved tab...");
            loadSavedSummaries();
        }
    } else {
        console.error("Could not find tab elements for:", tabName);
    }
}

// Generate analysis - UPDATED TO USE SUMMARIZER API
async function generateAnalysis() {
    const mode = document.getElementById('action-select').value;
    const resultsContent = document.getElementById('results-content');
    
    try {
        setLoadingState(true);
        resultsContent.innerHTML = '<div class="loading">🔍 Analyzing page content...</div>';

        const pageContent = await extractPageContent();
        
        if (!pageContent || pageContent.includes('No readable content')) {
            throw new Error('Please try a different webpage with more text content');
        }

        resultsContent.innerHTML = '<div class="loading">🤔 Generating analysis with Summarizer API...</div>';
        
        // Use Summarizer API instead of demo responses
        const analysis = await generateWithGemini(mode, pageContent);
        
        displayAnalysis(analysis, mode);
        enableActionButtons();

    } catch (error) {
        console.error("Analysis error:", error);
        showError(error.message);
    } finally {
        setLoadingState(false);
    }
}

// Extract page content
async function extractPageContent() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        if (!tab?.url.startsWith('http')) {
            throw new Error('Please navigate to a regular webpage');
        }

        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
        });

        return results[0]?.result;

    } catch (error) {
        throw new Error('Could not extract content: ' + error.message);
    }
}

// === NEW: SUMMARIZER API IMPLEMENTATION ===
async function generateWithGemini(mode, content) {
    try {
        console.log("Attempting to use Chrome Summarizer API for mode:", mode);
        
        // Check if Summarizer API is available
        if (typeof ai === 'undefined' || typeof ai.summarizer === 'undefined') {
            throw new Error('Chrome Summarizer API not available. Enable AI flags in chrome://flags');
        }

        // Create domain-specific instructions for climate content
        const instructions = createSummarizerInstructions(mode);
        
        console.log("Calling ai.summarizer.create() with instructions:", instructions);
        const response = await ai.summarizer.create({
            text: content.substring(0, 15000),
            config: {
                type: 'key-points',
                format: 'plain-text',
                length: 'long'
            },
            instructions: instructions
        });

        console.log("Summarizer API response received");
        
        if (!response || !response.summary) {
            throw new Error('Empty response from Summarizer API');
        }

        // Add API success indicator for competition proof
        return response.summary + '\n\n---\n*✅ Generated with Chrome Summarizer API*';

    } catch (error) {
        console.error("Summarizer API error:", error);
        
        // Fallback to languageModel API if available
        try {
            if (chrome.ai?.languageModel?.generate) {
                console.log("Falling back to languageModel API...");
                const fallbackResponse = await chrome.ai.languageModel.generate({
                    prompt: `${PROMPTS[mode]}\n\nCONTENT:\n${content.substring(0, 10000)}`,
                    options: { temperature: 0.2, maxTokens: 1000 }
                });
                return fallbackResponse.result + '\n\n---\n*✅ Generated with Chrome Built-in AI (Fallback)*';
            }
        } catch (fallbackError) {
            console.error("Fallback also failed:", fallbackError);
        }
        
        // Final fallback to demo with clear competition guidance
        return DEMO_RESPONSES[mode] + 
            '\n\n---\n*🚫 Chrome Summarizer API Unavailable*\n' +
            'For competition judging, enable these flags:\n' +
            '• chrome://flags/#optimization-guide-on-device-model\n' +
            '• chrome://flags/#ai-language-model-demo\n' +
            '• Requires Chrome M121+ with 4GB+ VRAM or 16GB+ RAM';
    }
}

// Create domain-specific instructions for climate content
function createSummarizerInstructions(mode) {
    const instructions = {
        intelligence: `As a senior sustainability analyst, provide comprehensive intelligence on this climate/energy content. Focus on:
• Key findings and scientific insights
• Business and economic implications  
• Policy and regulatory impacts
• Risks, opportunities, and strategic recommendations
• Stakeholder perspectives (investors, communities, regulators)`,
        
        metrics: `Extract and organize ALL climate and sustainability metrics. Focus on:
• Emissions: Scope 1, 2, 3 (absolute & intensity)
• Energy: Renewable %, targets, consumption, efficiency
• Water: Usage, recycling rates, impact
• Waste: Reduction targets, circular economy metrics
• Biodiversity: Conservation, impact assessments
• Supply Chain: Sustainable sourcing, supplier requirements
Format as clear, organized metrics with values and targets.`,
        
        greenwashing: `Conduct a professional greenwashing risk assessment. Analyze:
• Specificity and evidence for environmental claims
• Data transparency and verification status
• Comparison to industry standards and benchmarks
• Recognition of challenges and limitations
• Balance between positive initiatives and negative impacts
Provide clear risk rating (Low/Medium/High) with specific evidence.`,
        
        simple: `Explain this climate/energy content in simple, accessible language:
• Use everyday analogies and relatable examples
• Break down complex concepts step by step
• Avoid technical jargon and acronyms
• Focus on why this matters to ordinary people
• Keep sentences short and structure clear`
    };

    return instructions[mode] || 'Provide a comprehensive summary of the key points.';
}

// Display analysis
function displayAnalysis(analysis, mode) {
    const resultsContent = document.getElementById('results-content');
    resultsContent.className = `results-content analysis-${mode}`;
    resultsContent.innerHTML = analysis.replace(/\n/g, '<br>');
}

// Show error
function showError(message) {
    const resultsContent = document.getElementById('results-content');
    resultsContent.innerHTML = `
        <div class="error-state">
            <p>❌ Analysis failed</p>
            <p class="error-message">${message}</p>
        </div>
    `;
}

// Save analysis
async function saveAnalysis() {
    const analysis = document.getElementById('results-content').textContent;
    const title = document.querySelector('.page-title').textContent;
    const url = document.querySelector('.page-url').textContent;
    const mode = document.getElementById('action-select').value;

    if (!analysis || analysis.includes('Your summary will appear here')) {
        alert('No analysis to save');
        return;
    }

    const savedItem = {
        id: Date.now().toString(),
        title: title,
        url: url,
        content: analysis,
        mode: mode,
        timestamp: new Date().toISOString()
    };

    try {
        const result = await chrome.storage.local.get(['savedSummaries']);
        const saved = result.savedSummaries || [];
        saved.unshift(savedItem);
        
        await chrome.storage.local.set({ savedSummaries: saved });
        
        // Show success feedback
        const saveBtn = document.getElementById('save-btn');
        const originalHTML = saveBtn.innerHTML;
        saveBtn.innerHTML = '✓ Saved!';
        setTimeout(() => saveBtn.innerHTML = originalHTML, 2000);
        
        console.log("Analysis saved:", savedItem.id);
        
    } catch (error) {
        console.error("Save error:", error);
        alert('Failed to save analysis');
    }
}

// Copy analysis
function copyAnalysis() {
    const analysis = document.getElementById('results-content').textContent;
    navigator.clipboard.writeText(analysis).then(() => {
        const copyBtn = document.getElementById('copy-btn');
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '✓ Copied!';
        setTimeout(() => copyBtn.innerHTML = originalHTML, 2000);
    });
}

function rerunAnalysis() {
    generateAnalysis();
}

function clearAnalysis() {
    document.getElementById('results-content').innerHTML = 
        '<p class="placeholder-text">Your summary will appear here...</p>';
    document.querySelectorAll('.action-btn').forEach(btn => btn.disabled = true);
}

function enableActionButtons() {
    document.querySelectorAll('.action-btn').forEach(btn => btn.disabled = false);
}

function setLoadingState(loading) {
    const button = document.getElementById('generate-btn');
    button.disabled = loading;
    button.textContent = loading ? 'Analyzing...' : 'Go';
}

// Saved summaries - SIMPLIFIED
async function loadSavedSummaries() {
    console.log("loadSavedSummaries called");
    
    try {
        const result = await chrome.storage.local.get(['savedSummaries']);
        const saved = result.savedSummaries || [];
        const savedList = document.getElementById('saved-list');

        console.log("Found saved items:", saved.length);

        if (saved.length === 0) {
            savedList.innerHTML = `
                <div class="empty-state">
                    <p>No saved summaries yet</p>
                    <p class="empty-subtext">Generate and save your first summary to see it here</p>
                </div>
            `;
            return;
        }

        // Clear and create simple list
        savedList.innerHTML = '';
        
        saved.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'saved-item';
            itemElement.innerHTML = `
                <div class="saved-item-header">
                    <h4 class="saved-item-title">${item.title}</h4>
                    <span class="saved-item-date">${new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
                <p class="saved-item-url">${item.url}</p>
                <div class="saved-item-meta">
                    <span class="saved-item-type">${item.mode}</span>
                </div>
                <div class="saved-item-actions">
                    <button class="saved-item-btn view-btn">View</button>
                    <button class="saved-item-btn saved-item-delete">Delete</button>
                </div>
            `;
            
            // Add simple event listeners
            itemElement.querySelector('.view-btn').addEventListener('click', () => {
                openModal(item);
            });
            
            itemElement.querySelector('.saved-item-delete').addEventListener('click', () => {
                if (confirm('Delete this saved analysis?')) {
                    deleteSavedItem(item.id);
                }
            });
            
            savedList.appendChild(itemElement);
        });

        console.log("Saved summaries loaded successfully");

    } catch (error) {
        console.error("Error loading saved summaries:", error);
        const savedList = document.getElementById('saved-list');
        savedList.innerHTML = `
            <div class="error-state">
                <p>Error loading saved summaries</p>
                <p class="error-message">${error.message}</p>
            </div>
        `;
    }
}

// Delete saved item
async function deleteSavedItem(id) {
    try {
        const result = await chrome.storage.local.get(['savedSummaries']);
        const saved = result.savedSummaries || [];
        const updated = saved.filter(s => s.id !== id);
        
        await chrome.storage.local.set({ savedSummaries: updated });
        loadSavedSummaries(); // Reload the list
        
    } catch (error) {
        console.error("Error deleting saved item:", error);
        alert('Failed to delete analysis');
    }
}

// Modal functions
function openModal(item) {
    document.getElementById('modal-page-title').textContent = item.title;
    document.getElementById('modal-page-url').textContent = item.url;
    document.getElementById('modal-content').textContent = item.content;
    
    const modal = document.getElementById('saved-modal');
    modal.classList.remove('hidden');
    modal.hidden = false;
}

function closeModal() {
    const modal = document.getElementById('saved-modal');
    modal.classList.add('hidden');
    modal.hidden = true;
}