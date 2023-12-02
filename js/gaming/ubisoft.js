/**
 * Epic Games Web Store
 */
function handleUbisoftMutations() {
  if (someURL(["ubisoft"], hostname)) {
    if (someURL(["es_AR"], href)) {
      console.log("🟢 impuestito is working...");
      observeInit(document, UbisoftScrapper);
    }
  }
}

/**
 * Epic Scrapper
 */
function UbisoftScrapper() {
  const elements = [];
  const finalPriceElements = [...document.querySelectorAll("span.standard-price")];
  if (finalPriceElements.length > 0) {
    for (const element of finalPriceElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-regular", "impuestito-ubisoft");
      elements.push(element);
    }
  }

  const basePriceElements = [...document.querySelectorAll("span.price-item")];
  if (basePriceElements.length > 0) {
    for (const element of basePriceElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-discount", "impuestito-ubisoft");
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
          currency: "ARS",
          showEmoji: false,
          isDiscount: element.classList.contains("price-discount"),
        });
      }
      element.classList.add("impuestito-done");
    }
  }
}

// Init
handleUbisoftMutations();
