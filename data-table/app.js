// ==========================
// GENERIC TABLE MANAGER
// ==========================

/**
 * Initializes functionality for a single table
 * @param {HTMLTableElement} tableElement 
 */
function initTable(tableElement) {
  let currentSort = {
    key: tableElement.querySelector("th[data-key]")?.dataset.key || "",
    asc: true,
  };

  const headerCells = tableElement.querySelectorAll("th[data-key]");
  let groups = Array.from(tableElement.querySelectorAll(".product-group"));

  // --- Sorting ---
  function sortTable() {
    const sorted = [...groups].sort((a, b) => {
      let valA = a.dataset[currentSort.key] || "";
      let valB = b.dataset[currentSort.key] || "";

      let numA = parseFloat(valA);
      let numB = parseFloat(valB);

      if (!isNaN(numA) && !isNaN(numB)) {
        return currentSort.asc ? numA - numB : numB - numA;
      }
      return (valA).localeCompare(valB);
    });

    // Re-append to the table body or table directly
    sorted.forEach((group) => tableElement.appendChild(group));
    updateSortIndicators();
  }

  function updateSortIndicators() {
    headerCells.forEach((th) => {
      const key = th.dataset.key;
      th.setAttribute("aria-sort", "none");
      let label = th.innerText.replace("⬆", "").replace("⬇", "").trim();

      if (key === currentSort.key) {
        th.setAttribute("aria-sort", currentSort.asc ? "ascending" : "descending");
        th.innerText = `${label} ${currentSort.asc ? "⬆" : "⬇"}`;
      } else {
        th.innerText = label;
      }
    });
  }

  // --- Toggling ---
  function setupToggling() {
    groups.forEach((group) => {
      const mainRow = group.querySelector(".main-row");
      const detailsRow = group.querySelector(".details-row");

      if (!mainRow || !detailsRow) return;

      mainRow.addEventListener("click", (e) => {
        if (e.target.tagName === "A" || e.target.closest("a")) return;

        detailsRow.classList.toggle("hidden");

        if (!detailsRow.classList.contains("hidden")) {
          mainRow.classList.add("active");
          // Apply highlight style if it's the MSC table type
          if (tableElement.classList.contains("msc-tv-table")) {
            mainRow.querySelectorAll("td").forEach(td => td.classList.add("qv-selected"));
          }
        } else {
          mainRow.classList.remove("active");
          if (tableElement.classList.contains("msc-tv-table")) {
            mainRow.querySelectorAll("td").forEach(td => td.classList.remove("qv-selected"));
          }
        }
      });
    });
  }

  // --- Events ---
  headerCells.forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.dataset.key;
      if (currentSort.key === key) {
        currentSort.asc = !currentSort.asc;
      } else {
        currentSort.key = key;
        currentSort.asc = true;
      }
      sortTable();
    });
  });

  setupToggling();
  // Initial sort indicator setup
  updateSortIndicators();
}

// ==========================
// INIT ALL TABLES
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  // Target both original and new table formats
  const tables = document.querySelectorAll("table");
  tables.forEach(table => {
    if (table.querySelector(".product-group")) {
      initTable(table);
    }
  });
});
