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
  const siteName = document.querySelector(".site-name");
  const siteUrl = document.querySelector(".site-url");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab) {
      siteName.textContent = activeTab.title || "Unknown Website";
      siteUrl.textContent = activeTab.url || "No URL Found";
    }
  });
});
