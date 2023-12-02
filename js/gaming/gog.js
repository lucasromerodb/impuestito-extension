/**
 * Epic Games Web Store
 */
function handleGOGMutations() {
  if (someURL(["gog.com"], hostname)) {
    console.log("🟢 impuestito is working...");
    observeInit(document, GOGScrapper);
  }
}

/**
 * Epic Scrapper
 */
function GOGScrapper() {
  const elements = [];
  const finalPriceElements = [
    ...document.querySelectorAll("span.big-spot__price-amount"),
    ...document.querySelectorAll("span.product-tile__price-discounted._price"),
    ...document.querySelectorAll("span.product-actions-price__final-amount._price"),
    ...document.querySelectorAll("div.paginated-products-grid span.final-value"),
    ...document.querySelectorAll("div.menu-inside-category span._price"),
    ...document.querySelectorAll("span.menu-cart-item__price ._price"),
  ];
  if (finalPriceElements.length > 0) {
    for (const element of finalPriceElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-regular", "impuestito-gog");
      elements.push(element);
    }
  }

  const basePriceElements = [
    ...document.querySelectorAll("span.product-tile__price._price"),
    ...document.querySelectorAll("span.product-actions-price__base-amount._price"),
    ...document.querySelectorAll("div.paginated-products-grid span.base-value"),
  ];
  if (basePriceElements.length > 0) {
    for (const element of basePriceElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-discount", "impuestito-gog");
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
handleGOGMutations();
