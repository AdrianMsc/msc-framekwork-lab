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
// TABLE RENDERING
// ==========================

import fractionalInchData from './dummyData.js';

const renderFractionalTable = () => {
    const table = document.getElementById('msc-tv-table-');
    if (!table) return;

    // Remove existing hardcoded rows if any
    const existingGroups = table.querySelectorAll('.product-group');
    existingGroups.forEach(g => g.remove());

    fractionalInchData.forEach(item => {
        const tbody = document.createElement('tbody');
        tbody.className = 'product-group group/body';
        tbody.dataset.millDia = item.millDia;
        tbody.dataset.loc = item.loc;
        tbody.dataset.shankDia = item.shankDia;
        tbody.dataset.oal = item.oal;
        tbody.dataset.helix = item.helix;

        const primaryBrandKey = Object.keys(item.brands).find(k => item.brands[k].msc !== '-') || 'sgs';
        const primaryBrand = item.brands[primaryBrandKey] || { msc: 'N/A', price: '$0.00' };
        const brandName = primaryBrandKey === 'maford' ? 'M.A. FORD' : primaryBrandKey.toUpperCase();
        const mscNum = primaryBrand.msc;
        // Using a fixed image to prevent broken links as requested
        const fixedImgUrl = "https://cdn.mscdirect.com/global/images/ProductImages/8174838-21.jpg";

        tbody.innerHTML = `
            <tr class="main-row cursor-pointer hover:bg-blue-50/30 transition-colors border-l-4 border-l-transparent" data-ids="${Object.values(item.brands).map(b => b.msc).filter(id => id !== '-').join(',')}">
                <td class="p-1 font-bold text-center">${item.millDia}</td>
                <td class="p-1 text-center">${item.loc}</td>
                <td class="p-1 text-center">${item.shankDia}</td>
                <td class="p-1 text-center">${item.oal}</td>
                <td class="p-1 text-center">${item.helix}</td>
                
                <td class="border-l border-slate-100 p-1 ${item.brands.hertel.msc === '-' ? 'text-slate-300' : ''}">
                    ${item.brands.hertel.msc === '-' ? '-' : `<a href="#" class="text-primary font-bold hover:underline">${item.brands.hertel.msc}</a>`}
                </td>
                <td class="p-1 text-right ${item.brands.hertel.msc === '-' ? 'text-slate-300' : 'font-bold text-slate-700'}">${item.brands.hertel.price}</td>

                <td class="border-l border-slate-100 p-1 ${item.brands.accupro.msc === '-' ? 'text-slate-300' : ''}">
                    ${item.brands.accupro.msc === '-' ? '-' : `<a href="#" class="text-primary font-bold hover:underline">${item.brands.accupro.msc}</a>`}
                </td>
                <td class="p-1 text-right ${item.brands.accupro.msc === '-' ? 'text-slate-300' : 'font-bold text-slate-700'}">${item.brands.accupro.price}</td>

                <td class="border-l border-slate-100 p-1 ${item.brands.widia.msc === '-' ? 'text-slate-300' : ''}">
                    ${item.brands.widia.msc === '-' ? '-' : `<a href="#" class="text-primary font-bold hover:underline">${item.brands.widia.msc}</a>`}
                </td>
                <td class="p-1 text-right ${item.brands.widia.msc === '-' ? 'text-slate-300' : 'font-bold text-slate-700'}">${item.brands.widia.price}</td>

                <td class="border-l border-slate-100 p-1 ${item.brands.seco.msc === '-' ? 'text-slate-300' : ''}">
                    ${item.brands.seco.msc === '-' ? '-' : `<a href="#" class="text-primary font-bold hover:underline">${item.brands.seco.msc}</a>`}
                </td>
                <td class="p-1 text-right ${item.brands.seco.msc === '-' ? 'text-slate-300' : 'font-bold text-slate-700'}">${item.brands.seco.price}</td>

                <td class="border-l border-slate-100 p-1 ${item.brands.maford.msc === '-' ? 'text-slate-300' : ''}">
                    ${item.brands.maford.msc === '-' ? '-' : `<a href="#" class="text-primary font-bold hover:underline">${item.brands.maford.msc}</a>`}
                </td>
                <td class="p-1 text-right ${item.brands.maford.msc === '-' ? 'text-slate-300' : 'font-bold text-slate-700'}">${item.brands.maford.price}</td>

                <td class="border-l border-slate-100 p-1 ${item.brands.sgs.msc === '-' ? 'text-slate-300' : ''}">
                    ${item.brands.sgs.msc === '-' ? '-' : `<a href="#" class="text-primary font-bold hover:underline">${item.brands.sgs.msc}</a>`}
                </td>
                <td class="p-1 text-right ${item.brands.sgs.msc === '-' ? 'text-slate-300' : 'font-bold text-slate-700'}">${item.brands.sgs.price}</td>
            </tr>
            <tr class="details-row hidden">
                <td colspan="17" class="p-0 bg-white border-b border-slate-100">
                    <div id="tableview-part-item-${mscNum}" class="p-4 xl:p-6 bg-slate-50/30">
                        <div class="flex flex-wrap md:flex-nowrap gap-6">
                            <!-- Product Image -->
                            <div class="flex-shrink-0">
                                <div class="h-40 w-40 bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-center relative shadow-sm">
                                    <a href="#"><img src="${fixedImgUrl}" alt="${brandName} Ball End Mill" class="max-h-full object-contain"></a>
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
                                            ${Array.from({length: 5}).map((_, i) => `<i class="${i < item.rating ? 'fa-solid' : 'fa-regular'} fa-star text-xs"></i>`).join('')}
                                            <span class="ml-2 text-xs font-bold text-slate-400">${item.rating > 0 ? item.rating + '.0' : '0'}</span>
                                        </div>
                                    </div>

                                    <!-- Pricing & CTA -->
                                    <div class="w-full md:w-64 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                                        <div class="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
                                            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Price</span>
                                            <div class="text-right">
                                                <span class="text-2xl font-black text-slate-800">${primaryBrand.price}</span>
                                                <span class="text-xs font-bold text-slate-400">/ ea.</span>
                                            </div>
                                        </div>

                                        <div class="space-y-3">
                                            <div class="flex items-center justify-between">
                                                <p class="text-success-available font-bold text-sm">
                                                    <i class="fa-solid fa-check mr-1"></i> ${item.stock} In Stock
                                                </p>
                                            </div>
                                            <p class="text-slate-400 text-[11px] font-medium">
                                                <i class="fa-solid fa-location-dot mr-1"></i> ${item.locStock} available in ${item.location}
                                            </p>
                                        </div>

                                        <div class="mt-6 flex flex-col gap-3">
                                            <div class="flex items-center justify-between gap-3">
                                                <label class="text-xs font-black uppercase text-slate-400">Qty</label>
                                                <input type="number" value="1" class="input input-bordered input-sm w-20 rounded-lg text-center font-bold focus:outline-none focus:border-primary">
                                            </div>
                                            <button class="btn btn-primary w-full rounded-xl text-white font-bold shadow-lg shadow-blue-100">
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
// INIT ON LOAD
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  renderFractionalTable();
  initFeatures();
});
