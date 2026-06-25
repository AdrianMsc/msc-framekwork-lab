import { showToast } from "./ui.js";

export let cart = [];

export const initCart = () => {
  try {
    cart = JSON.parse(localStorage.getItem("msc_cart")) || [];
  } catch {
    cart = [];
    localStorage.setItem("msc_cart", JSON.stringify(cart));
  }
  updateCartUI();
};

const saveCart = () => {
  localStorage.setItem("msc_cart", JSON.stringify(cart));
  updateCartUI();
};

export const updateCartUI = () => {
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
          <img src="${item.img}" class="h-full w-full object-contain" alt="" />
        </div>
        <div class="flex-grow min-w-0">
          <p class="font-bold text-xs truncate text-slate-800">${item.name}</p>
          <p class="text-[10px] text-slate-500 font-medium">MSC# ${item.msc} | Qty: ${item.qty}</p>
          <p class="text-xs font-bold text-primary">${item.price}</p>
        </div>
        <button onclick="window.removeFromCart('${item.msc}')" class="text-slate-300 hover:text-msc-red transition-colors" aria-label="Remove ${item.name} from cart">
          <i class="fa-solid fa-trash-can text-xs" aria-hidden="true"></i>
        </button>
      </div>
    `,
      )
      .join("");
  }
};

export const addToCart = (msc, name, price, img, qtyInputId) => {
  const qtyInput = document.getElementById(qtyInputId);
  const qty = parseInt(qtyInput?.value || 1);

  const existing = cart.find((item) => item.msc === msc);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ msc, name, price, img, qty });
  }

  saveCart();
  showToast(`Added ${qty} item(s) to cart`);
};

export const removeFromCart = (msc) => {
  cart = cart.filter((item) => item.msc !== msc);
  saveCart();
};
