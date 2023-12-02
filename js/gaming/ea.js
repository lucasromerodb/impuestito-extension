/**
 * Epic Games Web Store
 */
function handleEAMutations() {
  if (someURL(["ea.com"], hostname)) {
    if (someURL(["ea-play"], pathname)) {
      console.log("🟢 impuestito is working...");
      setTimeout(() => {
        observeInit(document, EAScrapper);
      }, 2000);
    }
  }
}

/**
 * Epic Scrapper
 */
function EAScrapper() {
  const elements = [];
  const finalPriceElements = [
    ...document.querySelector("ea-play-tile").shadowRoot.querySelectorAll("span.eapl-subscription-tile__price-number"),
    ...document.querySelector("ea-play-pro-tile").shadowRoot.querySelectorAll("span.eapl-subscription-tile__price-number"),
  ];
  if (finalPriceElements.length > 0) {
    for (const element of finalPriceElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-regular", "impuestito-ea");
      element.style.cssText = `
      background: linear-gradient(45deg, #00be5c 25%, #00f275, #00be5c, #008641, #004f26, #008641, #00be5c, #00be5c, #00be5c);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
      background-size: 500% auto;
      font-weight: bold !important;
      animation: textShine 3.5s ease-in-out infinite;
      `;
      elements.push(element);
    }
  }

  const priceElementsTarget = elements;
  if (priceElementsTarget.length > 0) {
    for (const element of priceElementsTarget) {
      if (!element.className.includes("impuestito-done")) {
        scrapper({
          priceElement: element,
          eventElement: element,
          currency: "US",
          showEmoji: false,
          isDiscount: element.classList.contains("price-discount"),
        });
      }
      element.classList.add("impuestito-done");
    }
  }
}

// Init
handleEAMutations();
