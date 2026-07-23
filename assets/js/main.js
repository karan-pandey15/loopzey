"use strict";

// Sticky site header and mobile navigation
document.addEventListener("DOMContentLoaded", () => {
  const siteHeader = document.querySelector(".site-header");
  const mobileNavigation = document.querySelector("#mobileNavigation");

  const updateHeaderState = () => {
    siteHeader?.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  if (!mobileNavigation || typeof bootstrap === "undefined") {
    return;
  }

  mobileNavigation.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 991.98px)").matches) {
        bootstrap.Offcanvas.getOrCreateInstance(mobileNavigation).hide();
      }
    });
  });
});

// Interactive social feed tabs
document.addEventListener("DOMContentLoaded", () => {
  const tabs = [...document.querySelectorAll("[data-feed-tab]")];
  const cards = [...document.querySelectorAll(".feed-post-card")];

  if (!tabs.length || !cards.length) {
    return;
  }

  const feedData = {
    following: [
      { image: "assets/images/feed-travel.jpg", alt: "Friends traveling together", title: "Weekend Escape", author: "Aarav & Friends", likes: "♥ 4.8K", comments: "◉ 62" },
      { image: "assets/images/feed-sunset.jpg", alt: "Sunset over a tropical beach", title: "Golden Evenings", author: "Maya Coast", likes: "♥ 7.1K", comments: "◉ 84" },
      { image: "assets/images/feed-music.jpg", alt: "Colorful live music festival", title: "Live Sessions", author: "SoundWave", likes: "♥ 5.4K", comments: "◉ 73" }
    ],
    "for-you": [
      { image: "assets/images/feed-sunset.jpg", alt: "Sunset over a tropical beach", title: "Sunset Vibes", author: "Priya_Sky", likes: "♥ 12K", comments: "◉ 120" },
      { image: "assets/images/feed-travel.jpg", alt: "Friends traveling together", title: "Travel with me", author: "Wanderlust", likes: "♥ 8.5K", comments: "◉ 95" },
      { image: "assets/images/feed-music.jpg", alt: "Colorful live music festival", title: "Music is life", author: "BeatMaster", likes: "♥ 6.2K", comments: "◉ 80" }
    ],
    trending: [
      { image: "assets/images/feed-music.jpg", alt: "Colorful live music festival", title: "Festival Nights", author: "LiveLoop", likes: "♥ 18K", comments: "◉ 230" },
      { image: "assets/images/feed-travel.jpg", alt: "Friends traveling together", title: "Adventure Crew", author: "RoamTogether", likes: "♥ 14K", comments: "◉ 175" },
      { image: "assets/images/feed-sunset.jpg", alt: "Sunset over a tropical beach", title: "Golden Hour", author: "OceanSoul", likes: "♥ 11K", comments: "◉ 142" }
    ]
  };

  const activateFeedTab = (tab) => {
    const items = feedData[tab.dataset.feedTab];

    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
      item.tabIndex = isActive ? 0 : -1;
    });

    cards.forEach((card, index) => {
      const item = items[index];
      const image = card.querySelector("img");
      image.src = item.image;
      image.alt = item.alt;
      card.querySelector("[data-feed-title]").textContent = item.title;
      card.querySelector("[data-feed-author]").textContent = item.author;
      card.querySelector("[data-feed-likes]").textContent = item.likes;
      card.querySelector("[data-feed-comments]").textContent = item.comments;
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateFeedTab(tab));
    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
        return;
      }

      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextTab = tabs[(index + direction + tabs.length) % tabs.length];
      activateFeedTab(nextTab);
      nextTab.focus();
    });
  });
});
