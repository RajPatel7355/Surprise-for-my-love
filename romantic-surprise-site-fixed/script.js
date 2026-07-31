const openGiftButton = document.getElementById("openGiftButton");
const scrollToMemories = document.getElementById("scrollToMemories");
const finalSurpriseButton = document.getElementById("finalSurpriseButton");
const finalMessage = document.getElementById("finalMessage");
const reasonMessage = document.getElementById("reasonMessage");

function createFloatingHeart() {
  const container = document.querySelector(".floating-hearts");
  if (!container) return;

  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "♡";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${14 + Math.random() * 24}px`;
  heart.style.animationDuration = `${6 + Math.random() * 6}s`;
  heart.style.animationDelay = `${Math.random() * 1.5}s`;
  container.appendChild(heart);

  window.setTimeout(() => heart.remove(), 13000);
}

function createHeartBurst(originX, originY, amount = 18) {
  for (let index = 0; index < amount; index += 1) {
    const heart = document.createElement("span");
    heart.className = "burst-heart";
    heart.textContent = index % 2 === 0 ? "❤" : "♥";
    heart.style.left = `${originX}px`;
    heart.style.top = `${originY}px`;

    const angle = (Math.PI * 2 * index) / amount;
    const distance = 70 + Math.random() * 110;
    heart.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    heart.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
    heart.style.fontSize = `${14 + Math.random() * 18}px`;

    document.body.appendChild(heart);
    window.setTimeout(() => heart.remove(), 1100);
  }
}

window.setInterval(createFloatingHeart, 700);
for (let index = 0; index < 10; index += 1) {
  window.setTimeout(createFloatingHeart, index * 180);
}

if (openGiftButton) {
  openGiftButton.addEventListener("click", () => {
    const rect = openGiftButton.getBoundingClientRect();
    createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 24);
    document.querySelector(".landing-card")?.classList.add("fade-out");

    window.setTimeout(() => {
      window.location.href = "surprise.html";
    }, 650);
  });
}

if (scrollToMemories) {
  scrollToMemories.addEventListener("click", () => {
    document.getElementById("memories")?.scrollIntoView({ behavior: "smooth" });
  });
}

document.querySelectorAll(".reason-card").forEach((button) => {
  button.addEventListener("click", () => {
    if (reasonMessage) {
      reasonMessage.textContent = button.dataset.message || "You are wonderful in more ways than I can count.";
    }

    const rect = button.getBoundingClientRect();
    createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 10);
  });
});

if (finalSurpriseButton && finalMessage) {
  finalSurpriseButton.addEventListener("click", () => {
    finalMessage.textContent = "I choose you—today, tomorrow, and in every little moment after that. ❤️";
    const rect = finalSurpriseButton.getBoundingClientRect();
    createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 30);
    finalSurpriseButton.textContent = "You Are My Favourite Surprise ❤️";
    finalSurpriseButton.disabled = true;
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
