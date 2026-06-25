import {
  lightboxShow, lightboxHide,
  filterShowMoreClickHandler, advancedChat,
} from "./lib/ui.js";

import {
  initCart, updateCartUI, addToCart, removeFromCart,
} from "./lib/cart.js";

import {
  renderFractionalTable, renderFractionalList, renderFractionalGrid,
  setListPage, setGridPage,
} from "./lib/views.js";

import { initSearch } from "./lib/search.js";

window.filterShowMoreClickHandler = filterShowMoreClickHandler;
window.advancedChat = advancedChat;
window.lightboxShow = lightboxShow;
window.lightboxHide = lightboxHide;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;

const initFeatures = () => {
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
    Object.values(viewButtons).forEach((btn) => {
      if (!btn) return;
      btn.classList.remove("bg-white", "shadow-sm");
      btn.classList.add("btn-ghost");
    });
    if (viewButtons[view]) {
      viewButtons[view].classList.add("bg-white", "shadow-sm");
      viewButtons[view].classList.remove("btn-ghost");
    }

    Object.values(containers).forEach((container) => {
      if (!container) return;
      container.classList.add("hidden");
    });
    if (containers[view]) {
      containers[view].classList.remove("hidden");
    }

    Object.values(paginationContainers).forEach((c) => {
      if (c) c.classList.add("hidden");
    });
    if (paginationContainers[view]) {
      paginationContainers[view].classList.remove("hidden");
    }

    if (view === "list") renderFractionalList();
    if (view === "grid") renderFractionalGrid();
  };

  if (viewButtons.table)
    viewButtons.table.addEventListener("click", () => switchView("table"));
  if (viewButtons.list)
    viewButtons.list.addEventListener("click", () => switchView("list"));
  if (viewButtons.grid)
    viewButtons.grid.addEventListener("click", () => switchView("grid"));

  switchView("list");
};

document.addEventListener("DOMContentLoaded", () => {
  initCart();
  renderFractionalTable();
  initSearch();
  initFeatures();
  updateCartUI();
});
