// ---------- Tab Switching ----------

document.querySelectorAll(".tab-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active state from all buttons
    document.querySelectorAll(".tab-button").forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });

    // Activate the clicked button
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");

    // Get target panel ID
    const targetPanelId = btn.getAttribute("data-tab-target");

    // Hide all tab panels
    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.hidden = true;
    });

    // Show the selected panel
    document.getElementById(targetPanelId).hidden = false;
  });
});

// ---------- Display Current Site Info ----------
document.addEventListener("DOMContentLoaded", () => {
  const currentSite = document.getElementById("current-site");

//   if (!currentSite) {
//     console.warn("#current-site element not found in popup HTML.");
//     return;
//   }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];

    if (activeTab) {
      // Display title and URL on two lines
      currentSite.textContent = `${activeTab.title}`;
    } else {
      currentSite.textContent = "No active tab detected.";
    }
  });
});


// === Action Dropdown Behavior ===
document.addEventListener("DOMContentLoaded", () => {
  // --- Select Elements ---
  const actionSelect = document.getElementById("action-dropdown");
  const runButton = document.getElementById("run-action");
  const resultArea = document.getElementById("result");

  // Action buttons
  const saveBtn = document.getElementById("save-result");
  const copyBtn = document.getElementById("copy-result");
  const rerunBtn = document.getElementById("rerun");
  const clearBtn = document.getElementById("clear");

  // --- Initial States ---
  runButton.disabled = true;
  [saveBtn, copyBtn, rerunBtn, clearBtn].forEach(btn => (btn.disabled = true));

  // --- Dropdown Behavior ---
  actionSelect.addEventListener("change", () => {
    const selectedValue = actionSelect.value;

    if (selectedValue) {
      runButton.disabled = false;
      const selectedText = actionSelect.options[actionSelect.selectedIndex].text;
      runButton.textContent = selectedText;
    } else {
      runButton.disabled = true;
      runButton.textContent = "Run";
    }
  });

  // --- Run Button Click ---
  runButton.addEventListener("click", async () => {
    const selectedAction = actionSelect.value;
    if (!selectedAction) return;

    // Disable run button temporarily and show loading
    runButton.disabled = true;
    resultArea.textContent = "Processing…";

    // Simulate async work (e.g., Gemini API call)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock result
    resultArea.textContent = `✅ ${selectedAction.toUpperCase()} result: This is a mock AI output.`;

    // Enable buttons after result is ready
    [saveBtn, copyBtn, rerunBtn, clearBtn].forEach(btn => (btn.disabled = false));

    // Re-enable run button for re-use
    runButton.disabled = false;
  });
});
