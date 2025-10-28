// --- Tab Switching ---
document.addEventListener("DOMContentLoaded", async () => {
  
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Deactivate all tabs
      tabButtons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });

      // Hide all panels
      tabPanels.forEach((p) => p.classList.add("hidden"));

      // Activate clicked tab
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      // Show linked panel
      const targetPanel = document.getElementById(btn.getAttribute("aria-controls"));
      targetPanel.classList.remove("hidden");
    });
  });

  // --- Display Current Site Title ---
  const siteName = document.getElementById("current-site");

  try {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (activeTab && activeTab.title) {
      siteName.textContent = activeTab.title;
    } else {
      siteName.textContent = "Unknown Website";
    }
  } catch (error) {
    console.error("ClimaLens: Error loading site title:", error);
    siteName.textContent = "Unknown Website";
  }
});

  // --- Action Dropdown Behavior ---
  const actionSelect = document.getElementById("action-dropdown");
  const runButton = document.getElementById("run-action");

  // Disable Run button by default
  runButton.disabled = true;

  actionSelect.addEventListener("change", () => {
    const selected = actionSelect.value;

    if (selected) {
      runButton.disabled = false;

      // Capitalize first letter for button label
      const formatted =
        selected.charAt(0).toUpperCase() + selected.slice(1);

      runButton.textContent = `Run ${formatted}`;
    } else {
      runButton.disabled = true;
      runButton.textContent = "Run";
    }
  });

