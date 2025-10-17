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
  const actionSelect = document.getElementById("action-select");
  const actionButton = document.getElementById("action-button");
  const result = document.getElementById("result");
  const saveBtn = document.getElementById("save-btn");
  const copyBtn = document.getElementById("copy-btn");
  const rerunBtn = document.getElementById("rerun-btn");
  const clearBtn = document.getElementById("clear-btn");

  // ✅ Disable action button until user selects an action
  actionButton.disabled = true;

  // ✅ Initially disable all control buttons
  [saveBtn, copyBtn, rerunBtn, clearBtn].forEach(btn => btn.disabled = true);

  // 🔹 Enable action button when a valid action is selected
  actionSelect.addEventListener("change", () => {
    const selectedAction = actionSelect.value;
    if (selectedAction) {
      actionButton.disabled = false;
      actionButton.textContent = selectedAction.charAt(0).toUpperCase() + selectedAction.slice(1);
    } else {
      actionButton.disabled = true;
      actionButton.textContent = "Select Action";
    }
  });

  // 🔹 When action button is clicked
  actionButton.addEventListener("click", async () => {
    result.textContent = "Extracting text...";

    try {
      // Send message to content script to extract text
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const response = await chrome.tabs.sendMessage(tab.id, { type: "GET_ARTICLE_TEXT" });

      // Handle extracted text
      if (response && response.text) {
        result.textContent = response.text.slice(0, 500) + "…"; // Limit to preview
        // Enable control buttons
        [saveBtn, copyBtn, rerunBtn, clearBtn].forEach(btn => btn.disabled = false);
      } else {
        result.textContent = "No text found on this page.";
      }
    } catch (error) {
      console.error("Error extracting text:", error);
      result.textContent = "Failed to extract text.";
    }
  });

  // 🔹 Clear button handler
  clearBtn.addEventListener("click", () => {
    result.textContent = "";
    [saveBtn, copyBtn, rerunBtn, clearBtn].forEach(btn => btn.disabled = true);
  });
});
