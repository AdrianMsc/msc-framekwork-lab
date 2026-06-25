export function initTable(tableElement) {
  let currentSort = {
    key: tableElement.querySelector("th[data-key]")?.dataset.key || "",
    asc: true,
  };

  const headerCells = tableElement.querySelectorAll("th[data-key]");
  let groups = Array.from(tableElement.querySelectorAll(".product-group"));

  function sortTable() {
    const sorted = [...groups].sort((a, b) => {
      let valA = a.dataset[currentSort.key] || "";
      let valB = b.dataset[currentSort.key] || "";

      let numA = parseFloat(valA);
      let numB = parseFloat(valB);

      if (!isNaN(numA) && !isNaN(numB)) {
        return currentSort.asc ? numA - numB : numB - numA;
      }
      return valA.localeCompare(valB);
    });

    sorted.forEach((group) => tableElement.appendChild(group));
    updateSortIndicators();
  }

  function updateSortIndicators() {
    headerCells.forEach((th) => {
      const key = th.dataset.key;
      th.setAttribute("aria-sort", "none");

      if (key === currentSort.key) {
        th.setAttribute(
          "aria-sort",
          currentSort.asc ? "ascending" : "descending",
        );
        th.classList.add("bg-slate-100");
      } else {
        th.classList.remove("bg-slate-100");
      }
    });
  }

  function setupToggling() {
    groups.forEach((group) => {
      const mainRow = group.querySelector(".main-row");
      const detailsRow = group.querySelector(".details-row");

      if (!mainRow || !detailsRow) return;

      mainRow.setAttribute("aria-expanded", "false");
      mainRow.setAttribute("role", "button");
      mainRow.setAttribute("tabindex", "0");

      const toggle = () => {
        const isHidden = detailsRow.classList.toggle("hidden");
        mainRow.classList.toggle("active");
        mainRow.setAttribute("aria-expanded", !isHidden);
      };

      mainRow.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });

      mainRow.addEventListener("click", (e) => {
        if (e.target.tagName === "A" || e.target.closest("a")) return;
        toggle();
      });
    });
  }

  headerCells.forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.dataset.key;
      currentSort.asc = currentSort.key === key ? !currentSort.asc : true;
      currentSort.key = key;
      sortTable();
    });
  });

  setupToggling();
  updateSortIndicators();
}
