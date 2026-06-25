export const renderStars = (rating, size = "text-xs") => {
  const r = rating || 0;
  return Array.from({ length: 5 }, (_, i) =>
    `<i class="${i < r ? "fa-solid" : "fa-regular"} fa-star ${size}" aria-hidden="true"></i>`
  ).join("");
};

export const showToast = (message) => {
  const toast = document.createElement("div");
  toast.className =
    "fixed bottom-8 right-8 z-[200] bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce";
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check text-success-available" aria-hidden="true"></i>
    <span class="font-bold text-sm">${message}</span>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove("animate-bounce");
    toast.classList.add("opacity-0", "transition-opacity", "duration-500");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
};

let previousFocus = null;

export const lightboxShow = (selector) => {
  const el = document.querySelector(selector);
  if (!el) return;
  previousFocus = document.activeElement;
  el.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  const firstFocusable = el.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (firstFocusable) firstFocusable.focus();
};

export const lightboxHide = () => {
  document
    .querySelectorAll('[id*="lightbox"], [id*="modal"]')
    .forEach((el) => el.classList.add("hidden"));
  document.body.style.overflow = "";
  if (previousFocus) previousFocus.focus();
};

export const filterShowMoreClickHandler = (id, name, block) => {
  console.log(`Filter Show More: ${id} (${name}) in ${block}`);
  alert(`Refinement Modal for: ${name}`);
};

export const advancedChat = () => {
  console.log("Initializing Advanced Chat...");
  alert("Live Chat would be initialized here.");
};

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const openLightbox = document.querySelector('[id*="lightbox"]:not(.hidden), [id*="modal"]:not(.hidden)');
  if (openLightbox) lightboxHide();
});
