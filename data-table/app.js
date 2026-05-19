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
  document.querySelector(selector)?.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

window.lightboxHide = () => {
  document
    .querySelectorAll('[id*="lightbox"], [id*="modal"]')
    .forEach((el) => el.classList.add("hidden"));
  document.body.style.overflow = "";
};

// ==========================
// CART MANAGEMENT
// ==========================

let cart = JSON.parse(localStorage.getItem("msc_cart")) || [];

const saveCart = () => {
  localStorage.setItem("msc_cart", JSON.stringify(cart));
  updateCartUI();
};

const updateCartUI = () => {
  const countBadge = document.getElementById("cart-count");
  const itemsTitle = document.getElementById("cart-items-title");
  const container = document.getElementById("cart-items-container");
  const subtotalEl = document.getElementById("cart-subtotal");

  if (!countBadge || !container) return;

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return sum + price * item.qty;
  }, 0);

  countBadge.innerText = totalQty;
  if (itemsTitle) itemsTitle.innerText = `${totalQty} Item${totalQty !== 1 ? "s" : ""}`;
  if (subtotalEl) subtotalEl.innerText = `$${subtotal.toFixed(2)}`;

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-slate-400 text-center py-4">Your cart is empty</p>`;
  } else {
    container.innerHTML = cart
      .map(
        (item) => `
      <div class="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
        <div class="h-12 w-12 bg-slate-50 rounded p-1 flex-shrink-0">
          <img src="${item.img}" class="h-full w-full object-contain" />
        </div>
        <div class="flex-grow min-w-0">
          <p class="font-bold text-xs truncate text-slate-800">${item.name}</p>
          <p class="text-[10px] text-slate-500 font-medium">MSC# ${item.msc} | Qty: ${item.qty}</p>
          <p class="text-xs font-bold text-primary">${item.price}</p>
        </div>
        <button onclick="window.removeFromCart('${item.msc}')" class="text-slate-300 hover:text-msc-red transition-colors">
          <i class="fa-solid fa-trash-can text-xs"></i>
        </button>
      </div>
    `,
      )
      .join("");
  }
};

window.addToCart = (msc, name, price, img, qtyInputId) => {
  const qtyInput = document.getElementById(qtyInputId);
  const qty = parseInt(qtyInput?.value || 1);

  const existing = cart.find((item) => item.msc === msc);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ msc, name, price, img, qty });
  }

  saveCart();

  // Show a mini notification
  showToast(`Added ${qty} item(s) to cart`);
};

window.removeFromCart = (msc) => {
  cart = cart.filter((item) => item.msc !== msc);
  saveCart();
};

const showToast = (message) => {
  const toast = document.createElement("div");
  toast.className =
    "fixed bottom-8 right-8 z-[200] bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce";
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check text-success-available"></i>
    <span class="font-bold text-sm">${message}</span>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove("animate-bounce");
    toast.classList.add("opacity-0", "transition-opacity", "duration-500");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
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
      currentSort.asc = currentSort.key === key ? !currentSort.asc : true;
      currentSort.key = key;
      sortTable();
    });
  });

  setupToggling();
  updateSortIndicators();
}

// ==========================
// SEARCH AUTOCOMPLETE
// ==========================

const initSearch = () => {
  const searchInput = document.getElementById("main-search-input");
  const overlay = document.getElementById("search-history-overlay");
  const recentSection = document.getElementById("section_recentSearches");
  const trendingSection = document.getElementById("trendingSearchesSection");
  const categoriesSection = document.getElementById("popularCategoriesSection");
  const resultsContainer = document.getElementById("searchResultsContainer");
  
  const suggestionsList = document.getElementById("searchSuggestionsList");
  const matchingCatList = document.getElementById("matchingCategoriesList");
  const recommendationsList = document.getElementById("searchRecommendationsList");

  if (!searchInput || !overlay) return;

  const mockData = {
    "hammer": {
      suggestions: [
        "dead blow hammers",
        "trade hammers",
        "hammers",
        "welders hammers"
      ],
      categories: [
        "Rotary Hammer Drill Bits",
        "Hammer & Chipper Replacement Chisels",
        "Sledge Hammers"
      ],
      recommendations: [
        {
          id: "29165982",
          title: 'Bon Tool - Dead Blow Hammer: 3 lb Head, 4" Face Dia, Rubber Head - 14" OAL, Rubber Handle',
          img: "https://cdn.mscdirect.com/global/images/ProductImages/8596653AI-24.jpg"
        },
        {
          id: "48783229",
          title: 'Arm & Hammer - Air Freshener: Spray, 7 oz Aerosol Can - Light & Pleasant Scent',
          img: "https://cdn.mscdirect.com/global/images/ProductImages/0650578-21.jpg"
        },
        {
          id: "19923101",
          title: 'Bon Tool - Dead Blow Hammer: 4 lb Head, 2" Face Dia, Rubber Head - 14-1/2" OAL, Rubber Handle',
          img: "https://cdn.mscdirect.com/global/images/ProductImages/8937426AA-24.jpg"
        }
      ]
    }
  };

  const highlightMatch = (text, query) => {
    if (!query) return `<b>${text}</b>`;
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);
    if (index === -1) return `<b>${text}</b>`;
    
    const before = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const after = text.substring(index + query.length);
    
    return `${before ? `<b>${before}</b>` : ''}${match}${after ? `<b>${after}</b>` : ''}`;
  };

  searchInput.addEventListener("focus", () => {
    overlay.classList.remove("hidden");
    searchInput.dispatchEvent(new Event("input"));
  });

  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !overlay.contains(e.target)) {
      overlay.classList.add("hidden");
    }
  });

  if (recentSection) {
    const recentItems = recentSection.querySelectorAll('li:not(:first-child)');
    recentItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const text = e.target.textContent.trim();
        searchInput.value = text;
        // Trigger input event to show results
        searchInput.dispatchEvent(new Event("input"));
        searchInput.focus();
      });
    });
  }

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length === 0) {
      recentSection.classList.remove("hidden");
      categoriesSection.classList.remove("hidden");
      if(trendingSection) trendingSection.classList.add("hidden");
      resultsContainer.classList.add("hidden");
      return;
    }

    // Hide default sections
    recentSection.classList.add("hidden");
    categoriesSection.classList.add("hidden");
    if(trendingSection) trendingSection.classList.add("hidden");
    
    // Show results
    resultsContainer.classList.remove("hidden");
    
    // Fetch mock data (default to hammer data if query includes hammer, else generic)
    const data = query.includes("hammer") ? mockData["hammer"] : {
      suggestions: [`${query} tools`, `${query} accessories`],
      categories: [`${query} Kits`, `${query} Components`],
      recommendations: [
         {
          id: "12345678",
          title: `Generic Product matching "${query}"`,
          img: "https://cdn.mscdirect.com/global/images/ProductImages/0335654-24.jpg"
        },
        {
          id: "98765432",
          title: `Premium ${query} Accessory`,
          img: "https://cdn.mscdirect.com/global/images/ProductImages/0652912AA-24.jpg"
        }
      ]
    };

    // Render Suggestions
    suggestionsList.innerHTML = data.suggestions.map(s => `
      <li class="px-6 py-2 cursor-pointer hover:bg-slate-50 text-[15px] text-slate-700 transition-colors">
        ${highlightMatch(s, query)}
      </li>
    `).join("");

    // Render Categories
    matchingCatList.innerHTML = data.categories.map(c => `
      <li class="cursor-pointer hover:underline text-[15px] font-bold text-slate-700 transition-colors">
        ${c}
      </li>
    `).join("");

    // Render Recommendations
    recommendationsList.innerHTML = data.recommendations.map(r => `
      <div class="bg-white rounded-xl p-3 flex gap-4 items-center shadow-sm cursor-pointer hover:shadow-md transition-shadow border border-slate-100">
        <div class="h-16 w-16 flex-shrink-0 flex items-center justify-center">
          <img src="${r.img}" alt="${r.title}" onerror="this.src='https://cdn.mscdirect.com/global/images/ProductImages/8174838-21.jpg'" class="max-h-full max-w-full object-contain mix-blend-multiply" />
        </div>
        <div class="flex flex-col min-w-0">
          <span class="text-xs font-black text-slate-900 mb-1">${r.id}</span>
          <span class="text-[13px] text-slate-700 leading-snug">${r.title}</span>
        </div>
      </div>
    `).join("");
  });
};

// ==========================
// FEATURE INITIALIZATION
// ==========================

const initFeatures = () => {
  // 1. Read More Toggle
  const toggleBtn = document.getElementById("toggleButton");
  const categoryText = document.getElementById("categoryText");
  if (toggleBtn && categoryText) {
    toggleBtn.addEventListener("click", () => {
      categoryText.classList.toggle("line-clamp-3");
      toggleBtn.innerHTML = categoryText.classList.contains("line-clamp-3")
        ? 'READ MORE <i class="fa-solid fa-chevron-down text-[10px] ml-1"></i>'
        : 'READ LESS <i class="fa-solid fa-chevron-up text-[10px] ml-1"></i>';
    });
  }

  // 2. Carousel Controls
  const carousel = document.querySelector(".carousel");
  const nextBtn = document.querySelector(".fa-chevron-right")?.parentElement;
  const prevBtn = document.querySelector(".fa-chevron-left")?.parentElement;

  if (carousel && nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: 300, behavior: "smooth" });
    });
    prevBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: -300, behavior: "smooth" });
    });
  }

  // 3. View Switcher
  const viewButtons = {
    table: document.getElementById("view-table-btn"),
    list: document.getElementById("view-list-btn"),
    grid: document.getElementById("view-grid-btn"),
  };

  const containers = {
    table: document.getElementById("table-view-container"),
    list: document.getElementById("list-view-container"),
    grid: document.getElementById("grid-view-container"),
  };

  const paginationContainers = {
    list: document.getElementById("list-pagination"),
    grid: document.getElementById("grid-pagination"),
  };

  const switchView = (view) => {
    // Update Buttons
    Object.values(viewButtons).forEach((btn) => {
      if (!btn) return;
      btn.classList.remove("bg-white", "shadow-sm");
      btn.classList.add("btn-ghost");
    });
    if (viewButtons[view]) {
      viewButtons[view].classList.add("bg-white", "shadow-sm");
      viewButtons[view].classList.remove("btn-ghost");
    }

    // Update Containers
    Object.values(containers).forEach((container) => {
      if (!container) return;
      container.classList.add("hidden");
    });
    if (containers[view]) {
      containers[view].classList.remove("hidden");
    }

    // Update Pagination Containers
    Object.values(paginationContainers).forEach((c) => {
      if (c) c.classList.add("hidden");
    });
    if (paginationContainers[view]) {
      paginationContainers[view].classList.remove("hidden");
    }

    // Specific rendering if needed (optional optimization)
    if (view === "list") renderFractionalList();
    if (view === "grid") renderFractionalGrid();
  };

  if (viewButtons.table)
    viewButtons.table.addEventListener("click", () => switchView("table"));
  if (viewButtons.list)
    viewButtons.list.addEventListener("click", () => switchView("list"));
  if (viewButtons.grid)
    viewButtons.grid.addEventListener("click", () => switchView("grid"));

  // Set initial view to List by default
  switchView("list");
};

// ==========================
// TABLE RENDERING
// ==========================

import fractionalInchData from "./dummyData.js";

const fixedImgUrl =
  "https://cdn.mscdirect.com/global/images/ProductImages/8174838-21.jpg";

let listPage = 1;
let gridPage = 1;
const LIST_PAGE_SIZE = 10;
const GRID_PAGE_SIZE = 9;

const renderPagination = (
  containerId,
  currentPage,
  totalPages,
  onPageChange,
) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  if (totalPages <= 1) return;

  const div = document.createElement("div");
  div.className =
    "join shadow-sm bg-white rounded-xl overflow-hidden border border-slate-200";

  // Previous
  const prev = document.createElement("button");
  prev.className = `join-item btn btn-sm md:btn-md bg-white border-none hover:bg-slate-50 text-slate-600 ${currentPage === 1 ? "btn-disabled opacity-50" : ""}`;
  prev.innerHTML = '<i class="fa-solid fa-chevron-left text-[10px]"></i>';
  prev.setAttribute("aria-label", "Previous page");
  prev.onclick = () => onPageChange(currentPage - 1);
  div.appendChild(prev);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    // Simple logic for brevity: show all or just around current
    if (totalPages > 7) {
      if (i > 2 && i < totalPages - 1 && Math.abs(i - currentPage) > 1) {
        if (i === 3 || i === totalPages - 2) {
          const dot = document.createElement("button");
          dot.className =
            "join-item btn btn-sm md:btn-md bg-white border-none btn-disabled";
          dot.innerText = "...";
          div.appendChild(dot);
        }
        continue;
      }
    }

    const btn = document.createElement("button");
    btn.className = `join-item btn btn-sm md:btn-md border-none ${i === currentPage ? "bg-primary text-white hover:bg-primary" : "bg-white text-slate-600 hover:bg-slate-50"}`;
    btn.innerText = i;
    btn.setAttribute("aria-label", `Page ${i}`);
    btn.onclick = () => onPageChange(i);
    div.appendChild(btn);
  }

  // Next
  const next = document.createElement("button");
  next.className = `join-item btn btn-sm md:btn-md bg-white border-none hover:bg-slate-50 text-slate-600 ${currentPage === totalPages ? "btn-disabled opacity-50" : ""}`;
  next.innerHTML = '<i class="fa-solid fa-chevron-right text-[10px]"></i>';
  next.setAttribute("aria-label", "Next page");
  next.onclick = () => onPageChange(currentPage + 1);
  div.appendChild(next);

  container.appendChild(div);
};

const renderFractionalTable = () => {
  const table = document.getElementById("msc-tv-table-");
  if (!table) return;

  // Remove existing hardcoded rows if any
  const existingGroups = table.querySelectorAll(".product-group");
  existingGroups.forEach((g) => g.remove());

  fractionalInchData.forEach((item) => {
    const tbody = document.createElement("tbody");
    tbody.className = "product-group group/body";
    tbody.dataset.millDia = item.millDia;
    tbody.dataset.loc = item.loc;
    tbody.dataset.shankDia = item.shankDia;
    tbody.dataset.oal = item.oal;
    tbody.dataset.helix = item.helix;

    const primaryBrandKey =
      Object.keys(item.brands).find((k) => item.brands[k].msc !== "-") || "sgs";
    const primaryBrand = item.brands[primaryBrandKey] || {
      msc: "N/A",
      price: "$0.00",
    };
    const brandName =
      primaryBrandKey === "maford"
        ? "M.A. FORD"
        : primaryBrandKey.toUpperCase();
    const mscNum = primaryBrand.msc;

    tbody.innerHTML = `
            <tr class="main-row cursor-pointer hover:bg-blue-50/30 transition-colors border-l-4 border-l-transparent hidden md:table-row" data-ids="${Object.values(
              item.brands,
            )
              .map((b) => b.msc)
              .filter((id) => id !== "-")
              .join(",")}">
                <td class="p-1 font-bold text-center">${item.millDia}</td>
                <td class="p-1 text-center">${item.loc}</td>
                <td class="p-1 text-center">${item.shankDia}</td>
                <td class="p-1 text-center">${item.oal}</td>
                <td class="p-1 text-center">${item.helix}</td>
                
                <td class="border-l border-slate-100 p-1 ${item.brands.hertel.msc === "-" ? "text-slate-300" : ""}">
                    ${item.brands.hertel.msc === "-" ? "-" : `<a href="#" class="text-primary font-bold hover:underline">${item.brands.hertel.msc}</a>`}
                </td>
                <td class="p-1 text-right ${item.brands.hertel.msc === "-" ? "text-slate-300" : "font-bold text-slate-700"}">${item.brands.hertel.price}</td>

                <td class="border-l border-slate-100 p-1 ${item.brands.accupro.msc === "-" ? "text-slate-300" : ""}">
                    ${item.brands.accupro.msc === "-" ? "-" : `<a href="#" class="text-primary font-bold hover:underline">${item.brands.accupro.msc}</a>`}
                </td>
                <td class="p-1 text-right ${item.brands.accupro.msc === "-" ? "text-slate-300" : "font-bold text-slate-700"}">${item.brands.accupro.price}</td>

                <td class="border-l border-slate-100 p-1 ${item.brands.widia.msc === "-" ? "text-slate-300" : ""}">
                    ${item.brands.widia.msc === "-" ? "-" : `<a href="#" class="text-primary font-bold hover:underline">${item.brands.widia.msc}</a>`}
                </td>
                <td class="p-1 text-right ${item.brands.widia.msc === "-" ? "text-slate-300" : "font-bold text-slate-700"}">${item.brands.widia.price}</td>

                <td class="border-l border-slate-100 p-1 ${item.brands.seco.msc === "-" ? "text-slate-300" : ""}">
                    ${item.brands.seco.msc === "-" ? "-" : `<a href="#" class="text-primary font-bold hover:underline">${item.brands.seco.msc}</a>`}
                </td>
                <td class="p-1 text-right ${item.brands.seco.msc === "-" ? "text-slate-300" : "font-bold text-slate-700"}">${item.brands.seco.price}</td>

                <td class="border-l border-slate-100 p-1 ${item.brands.maford.msc === "-" ? "text-slate-300" : ""}">
                    ${item.brands.maford.msc === "-" ? "-" : `<a href="#" class="text-primary font-bold hover:underline">${item.brands.maford.msc}</a>`}
                </td>
                <td class="p-1 text-right ${item.brands.maford.msc === "-" ? "text-slate-300" : "font-bold text-slate-700"}">${item.brands.maford.price}</td>

                <td class="border-l border-slate-100 p-1 ${item.brands.sgs.msc === "-" ? "text-slate-300" : ""}">
                    ${item.brands.sgs.msc === "-" ? "-" : `<a href="#" class="text-primary font-bold hover:underline">${item.brands.sgs.msc}</a>`}
                </td>
                <td class="p-1 text-right ${item.brands.sgs.msc === "-" ? "text-slate-300" : "font-bold text-slate-700"}">${item.brands.sgs.price}</td>
            </tr>
            <tr class="details-row hidden">
                <td colspan="17" class="p-0 bg-white border-b border-slate-100">
                    <div id="tableview-part-item-${mscNum}" class="p-2 md:p-4 xl:p-6 bg-slate-50/30 rounded-2xl shadow-sm md:shadow-none">
                        <div class="flex flex-wrap md:flex-nowrap gap-6">
                            <!-- Product Image -->
                            <div class="flex-shrink-0 mb-5 md:mb-0">
                                <div class="h-40 w-40 bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-center relative shadow-sm">
                                    <a href="#"><img src="${fixedImgUrl}" alt="${brandName} Ball End Mill" class="max-h-full object-contain" width="160" height="160"></a>
                                </div>
                            </div>
                            
                            <!-- Product Details -->
                            <div class="flex-grow">
                                <div class="flex flex-col md:flex-row justify-between items-start gap-4">
                                    <div>
                                        <p class="font-bold uppercase text-xs mb-1 text-primary tracking-wider"><a href="#" class="hover:underline">${brandName}</a></p>
                                        <h3 class="font-bold text-lg text-slate-800 leading-tight">
                                            <a href="#" class="hover:text-primary">Ball End Mill: ${item.millDia}" Dia, ${item.loc}" LOC, 4 Flute, Solid Carbide</a>
                                        </h3>
                                        <p class="text-slate-500 text-sm mt-1">
                                            ${item.oal}" OAL, ${item.shankDia}" Shank Dia, ${item.helix} deg Helix, AlTiN Finish, Single End, Series 01B
                                        </p>
                                        
                                        <div class="flex items-center gap-4 mt-4">
                                            <span class="text-sm font-medium text-slate-600">MSC# <a href="#" class="text-primary font-bold hover:underline">${mscNum}</a></span>
                                            <span class="text-sm font-medium text-slate-600">Mfr# ${item.mfrPart}</span>
                                        </div>
                                        <div class="flex items-center gap-1 mt-2 text-amber-400">
                                            ${Array.from({ length: 5 })
                                              .map(
                                                (_, i) =>
                                                  `<i class="${i < (item.rating || 3) ? "fa-solid" : "fa-regular"} fa-star text-xs"></i>`,
                                              )
                                              .join("")}
                                            <span class="ml-2 text-xs font-bold text-slate-600">${item.rating || 3}.0</span>
                                        </div>
                                    </div>
                                    <!-- Pricing & CTA -->
                                    <div class="w-full md:w-64 bg-white rounded-2xl md:border md:border-slate-200 md:p-5 shadow-sm">
                                        <div class="flex justify-between items-center pb-3 border-b-0 md:border-b border-slate-100 mb-4">
                                            <span class="text-xs font-bold text-slate-600 uppercase tracking-widest">Your Price</span>
                                            <div class="text-right">
                                                <span class="text-2xl font-black text-slate-800">${primaryBrand.price}</span>
                                                <span class="text-xs font-bold text-slate-600">/ ea.</span>
                                            </div>
                                        </div>
                                        <div class="space-y-3">
                                            <div class="flex items-center justify-between">
                                                <p class="text-success-available font-bold text-sm">
                                                    <i class="fa-solid fa-check mr-1"></i> ${item.stock} In Stock
                                                </p>
                                            </div>
                                            <p class="text-slate-500 text-[11px] font-medium">
                                                <i class="fa-solid fa-location-dot mr-1"></i> ${item.locStock} available in ${item.location}
                                            </p>
                                        </div>
                                        <div class="mt-6 flex flex-col gap-3">
                                            <div class="flex items-center justify-between gap-3">
                                                <label class="text-xs font-black uppercase text-slate-600" for="qty-${mscNum}">Qty</label>
                                                <input id="qty-${mscNum}" type="number" value="1" aria-label="Quantity" class="input input-bordered input-sm w-20 rounded-lg text-center font-bold focus:outline-none focus:border-primary">
                                            </div>
                                            <button 
                                                onclick="window.addToCart('${mscNum}', 'Ball End Mill: ${item.millDia}', '${primaryBrand.price}', '${fixedImgUrl}', 'qty-${mscNum}')"
                                                class="btn btn-sm md:btn-md btn-primary w-full rounded-xl text-white font-bold shadow-lg shadow-blue-100"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        `;
    table.appendChild(tbody);
  });

  // Re-initialize table logic (sorting, toggling) after rendering
  initTable(table);
};

// ==========================
// LIST RENDERING
// ==========================

const renderFractionalList = () => {
  const container = document.getElementById("list-view-container");
  if (!container) return;
  container.innerHTML = "";

  // Flatten data for brand-specific cards
  const flattenedData = [];
  fractionalInchData.forEach((item) => {
    Object.keys(item.brands).forEach((brandKey) => {
      if (item.brands[brandKey].msc !== "-") {
        flattenedData.push({ ...item, selectedBrandKey: brandKey });
      }
    });
  });

  const totalPages = Math.ceil(flattenedData.length / LIST_PAGE_SIZE);
  const start = (listPage - 1) * LIST_PAGE_SIZE;
  const pagedData = flattenedData.slice(start, start + LIST_PAGE_SIZE);

  pagedData.forEach((data) => {
    const item = data;
    const brandKey = data.selectedBrandKey;
    const brandData = item.brands[brandKey];
    const brandName =
      brandKey === "maford" ? "M.A. FORD" : brandKey.toUpperCase();

    const card = document.createElement("div");
    card.className =
      "bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row";

    card.innerHTML = `
            <!-- Left: Image & Compare -->
            <div class="w-full md:w-48 p-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
                <div class="h-32 w-32 flex items-center justify-center mb-4">
                    <img src="${fixedImgUrl}" alt="${brandName} Ball End Mill" class="max-h-full object-contain" width="128" height="128">
                </div>
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" class="checkbox checkbox-sm checkbox-primary rounded">
                    <span class="text-xs font-bold text-slate-500 uppercase tracking-tight">Compare</span>
                </label>
            </div>

            <!-- Middle: Info -->
            <div class="flex-1 p-6">
                <div class="mb-4">
                    <p class="text-xs font-black text-slate-800 uppercase tracking-widest mb-1">${brandName}</p>
                    <h3 class="text-lg font-black text-slate-800 leading-tight mb-2 hover:text-primary cursor-pointer transition-colors">
                        Ball End Mill: ${item.millDia}" Dia, ${item.loc}" LOC, 4 Flute, Solid Carbide
                    </h3>
                    <p class="text-sm text-slate-500 leading-relaxed">
                        ${item.oal}" OAL, ${item.shankDia}" Shank Dia, ${item.helix} deg Helix, AlTiN Finish, Single End, Series 01B
                    </p>
                </div>

                <div class="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
                    <div class="text-xs font-bold text-slate-600">
                        MSC# <span class="text-primary hover:underline cursor-pointer">${brandData.msc}</span>
                    </div>
                    <div class="text-xs font-bold text-slate-600">
                        Mfr# ${item.mfrPart}
                    </div>
                </div>

                <div class="flex items-center gap-1 mb-4 text-msc-blue">
                    ${Array.from({ length: 5 })
                      .map(
                        (_, i) =>
                          `<i class="${i < (item.rating || 3) ? "fa-solid" : "fa-regular"} fa-star text-xs"></i>`,
                      )
                      .join("")}
                    <span class="ml-2 text-xs font-bold text-slate-600">${item.rating || 3}</span>
                </div>

                <div class="space-y-1">
                    <p class="text-success-available font-bold text-sm">
                        <i class="fa-solid fa-check mr-1"></i> ${item.stock} In Stock
                    </p>
                    <p class="text-slate-500 text-xs font-medium">
                        <i class="fa-solid fa-location-dot mr-1"></i> ${item.locStock} available in ${item.location}
                    </p>
                </div>

                <div class="mt-4">
                    <a href="#" class="text-primary text-xs font-black uppercase tracking-widest hover:underline">View Alternatives</a>
                </div>
            </div>

            <!-- Right: Pricing & CTA -->
            <div class="w-full md:w-64 p-6 bg-slate-50/30 border-t md:border-t-0 md:border-l border-slate-100 flex flex-col">
                <div class="flex justify-between items-start mb-6">
                    <span class="text-xs font-black text-slate-600 uppercase tracking-widest pt-1">Your Price</span>
                    <div class="text-right">
                        <span class="text-2xl font-black text-slate-800 tracking-tight">${brandData.price}</span>
                        <span class="text-xs font-bold text-slate-400">/ ea.</span>
                    </div>
                </div>

                <div class="mt-auto space-y-4">
                    <div class="flex items-center justify-between gap-4">
                        <label class="text-xs font-black uppercase text-slate-800 tracking-tight" for="qty-list-${brandData.msc}">Quantity</label>
                        <input id="qty-list-${brandData.msc}" type="number" value="1" aria-label="Quantity" class="input input-bordered input-sm w-24 rounded-lg text-center font-bold focus:outline-none focus:border-primary bg-white shadow-sm">
                    </div>
                    <button 
                        onclick="window.addToCart('${brandData.msc}', 'Ball End Mill: ${item.millDia}', '${brandData.price}', '${fixedImgUrl}', 'qty-list-${brandData.msc}')"
                        class="btn btn-primary w-full rounded-full text-white font-black uppercase tracking-widest shadow-lg shadow-blue-100 h-12"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    container.appendChild(card);
  });

  renderPagination("list-pagination", listPage, totalPages, (newPage) => {
    listPage = newPage;
    renderFractionalList();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

// ==========================
// GRID RENDERING
// ==========================

const renderFractionalGrid = () => {
  const container = document.getElementById("grid-view-container");
  if (!container) return;
  container.innerHTML = "";

  const totalPages = Math.ceil(fractionalInchData.length / GRID_PAGE_SIZE);
  const start = (gridPage - 1) * GRID_PAGE_SIZE;
  const pagedData = fractionalInchData.slice(start, start + GRID_PAGE_SIZE);

  pagedData.forEach((item) => {
    const brandKey =
      Object.keys(item.brands).find((k) => item.brands[k].msc !== "-") || "sgs";
    const brandData = item.brands[brandKey];
    const brandName =
      brandKey === "maford" ? "M.A. FORD" : brandKey.toUpperCase();

    const card = document.createElement("div");
    card.className =
      "card bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all rounded-3xl overflow-hidden group";
    card.innerHTML = `
            <figure class="px-6 pt-6 relative">
                <div class="bg-slate-50 w-full rounded-2xl p-4 h-48 flex items-center justify-center group-hover:bg-white transition-colors">
                    <img src="${fixedImgUrl}" alt="${brandName} Ball End Mill" class="max-h-full object-contain mix-blend-multiply" width="200" height="200">
                </div>
            </figure>
            <div class="card-body p-6">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Your Price</span>
                    <div class="text-right">
                        <span class="text-xl font-black text-slate-900 tracking-tight">${brandData.price}</span>
                        <span class="text-xs font-bold text-slate-600">/ea.</span>
                    </div>
                </div>
                <p class="text-xs font-black text-primary uppercase mb-1">${brandName}</p>
                <h3 class="text-sm font-bold text-slate-700 leading-snug h-10 line-clamp-2 hover:text-primary cursor-pointer transition-colors">
                    Ball End Mill: ${item.millDia}" Dia, ${item.loc}" LOC, 4 Flute, Solid Carbide
                </h3>
                <div class="flex items-center gap-2 mt-4 text-[11px]">
                    <span class="font-bold text-slate-400">MSC #</span>
                    <span class="font-bold text-slate-700">${brandData.msc}</span>
                </div>
                <div class="card-actions mt-6 flex gap-2">
                    <input id="qty-grid-${brandData.msc}" type="number" value="1" aria-label="Quantity" class="input input-bordered w-16 text-center font-bold text-sm focus:border-primary rounded-xl bg-white">
                    <button 
                        onclick="window.addToCart('${brandData.msc}', 'Ball End Mill: ${item.millDia}', '${brandData.price}', '${fixedImgUrl}', 'qty-grid-${brandData.msc}')"
                        class="btn btn-primary flex-1 text-white font-black rounded-xl"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    container.appendChild(card);
  });

  renderPagination("grid-pagination", gridPage, totalPages, (newPage) => {
    gridPage = newPage;
    renderFractionalGrid();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

// ==========================
// INIT ON LOAD
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  renderFractionalTable();
  // Grid and List will be rendered on demand or initially via switchView
  initSearch();
  initFeatures();
  updateCartUI();
});
