
// modalHandler.js
export function initModal(modalId, tabButtonsSelector, tabContentsSelector) {
  const modal = document.getElementById(modalId);
  const tabButtons = document.querySelectorAll(tabButtonsSelector);
  const tabContents = document.querySelectorAll(tabContentsSelector);

  window.addEventListener("click", (event) => {
    if (event.target === modal) modal.style.display = "none";
  });

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(button.dataset.tab).classList.add("active");
    });
  });
}

export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "block";
}
