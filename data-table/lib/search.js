export const initSearch = () => {
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
        searchInput.dispatchEvent(new Event("input"));
        searchInput.focus();
      });
    });
  }

  const clearBtn = document.getElementById("clear-recent-searches");
  if (clearBtn && recentSection) {
    clearBtn.addEventListener("click", () => {
      const items = recentSection.querySelectorAll('li:not(:first-child)');
      items.forEach(item => item.remove());
      clearBtn.classList.add("opacity-50", "pointer-events-none");
      clearBtn.innerText = "Cleared";
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

    recentSection.classList.add("hidden");
    categoriesSection.classList.add("hidden");
    if(trendingSection) trendingSection.classList.add("hidden");
    
    resultsContainer.classList.remove("hidden");
    
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

    suggestionsList.innerHTML = data.suggestions.map(s => `
      <li class="px-6 py-2 cursor-pointer hover:bg-slate-50 text-[15px] text-slate-700 transition-colors">
        ${highlightMatch(s, query)}
      </li>
    `).join("");

    matchingCatList.innerHTML = data.categories.map(c => `
      <li class="cursor-pointer hover:underline text-[15px] font-bold text-slate-700 transition-colors">
        ${c}
      </li>
    `).join("");

    recommendationsList.innerHTML = data.recommendations.map(r => `
      <div class="bg-white rounded-xl p-3 flex gap-4 items-center shadow-sm cursor-pointer hover:shadow-md transition-shadow border border-slate-100">
        <div class="h-16 w-16 flex-shrink-0 flex items-center justify-center">
          <img src="${r.img}" alt="${r.title}" onerror="this.src='https://cdn.mscdirect.com/global/images/ProductImages/8174838-21.jpg'" class="max-h-full max-w-full object-contain mix-blend-multiply" loading="lazy" />
        </div>
        <div class="flex flex-col min-w-0">
          <span class="text-xs font-black text-slate-900 mb-1">${r.id}</span>
          <span class="text-[13px] text-slate-700 leading-snug">${r.title}</span>
        </div>
      </div>
    `).join("");
  });
};
