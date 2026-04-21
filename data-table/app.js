// ==========================
// UTILITIES & GLOBAL ACTIONS
// ==========================

window.filterShowMoreClickHandler = (id, name, block) => {
    console.log(`Filter Show More: ${id} (${name}) in ${block}`);
    alert(`Refinement Modal for: ${name}`);
};

window.advancedChat = () => {
    console.log("Initializing Advanced Chat...");
    // Mock for Chat Integration
    alert("Live Chat would be initialized here.");
};

window.lightboxShow = (selector) => {
    document.querySelector(selector)?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
};

window.lightboxHide = () => {
    document.querySelectorAll('[id*="lightbox"], [id*="modal"]').forEach(el => el.classList.add('hidden'));
    document.body.style.overflow = '';
};

// ==========================
// GENERIC TABLE MANAGER
// ==========================

function initTable(tableElement) {
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
      let label = th.innerText.replace("⬆", "").replace("⬇", "").trim();

      if (key === currentSort.key) {
        th.setAttribute("aria-sort", currentSort.asc ? "ascending" : "descending");
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

      mainRow.addEventListener("click", (e) => {
        if (e.target.tagName === "A" || e.target.closest("a")) return;
        detailsRow.classList.toggle("hidden");
        mainRow.classList.toggle("active");
      });
    });
  }

  headerCells.forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.dataset.key;
      currentSort.asc = (currentSort.key === key) ? !currentSort.asc : true;
      currentSort.key = key;
      sortTable();
    });
  });

  setupToggling();
  updateSortIndicators();
}

// ==========================
// FEATURE INITIALIZATION
// ==========================

const initFeatures = () => {
    // 1. Read More Toggle
    const toggleBtn = document.getElementById('toggleButton');
    const categoryText = document.getElementById('categoryText');
    if (toggleBtn && categoryText) {
        toggleBtn.addEventListener('click', () => {
            categoryText.classList.toggle('line-clamp-3');
            toggleBtn.innerHTML = categoryText.classList.contains('line-clamp-3') 
                ? 'READ MORE <i class="fa-solid fa-chevron-down text-[10px] ml-1"></i>' 
                : 'READ LESS <i class="fa-solid fa-chevron-up text-[10px] ml-1"></i>';
        });
    }

    // 2. Carousel Controls
    const carousel = document.querySelector('.carousel');
    const nextBtn = document.querySelector('.fa-chevron-right')?.parentElement;
    const prevBtn = document.querySelector('.fa-chevron-left')?.parentElement;

    if (carousel && nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: 300, behavior: 'smooth' });
        });
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }

    // 3. View Switcher
    const viewButtons = document.querySelectorAll('.hidden.md\\:flex button');
    const mainContent = document.querySelector('main');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => {
                b.classList.remove('bg-white', 'shadow-sm');
                b.classList.add('btn-ghost');
            });
            btn.classList.add('bg-white', 'shadow-sm');
            btn.classList.remove('btn-ghost');
            
            // Example layout toggle
            if (btn.innerText.includes('Grid')) {
                mainContent?.classList.add('grid-mode');
            } else {
                mainContent?.classList.remove('grid-mode');
            }
        });
    });
};

// ==========================
// INIT ON LOAD
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  const tables = document.querySelectorAll("table");
  tables.forEach(table => {
    if (table.querySelector(".product-group")) {
      initTable(table);
    }
  });

  initFeatures();
});
