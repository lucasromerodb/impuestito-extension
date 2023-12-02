/**
 * XB Deals Web Store
 */
function handleXBDealsMutations() {
  if (someURL(["xbdeals.net"], hostname) && someURL(["/ar-store"], pathname)) {
    console.log("🟢 impuestito is working...");
    observeInit(document, dekuDealsScrapper);
  }
}

function dekuDealsScrapper() {
  const elements = [];
  const finalPriceElements = [
    ...document.querySelectorAll(".game-collection-item-price"),
    ...document.querySelectorAll(".game-collection-item-price-discount"),
    ...document.querySelectorAll(".game-collection-item-price-bonus"),
    ...document.querySelectorAll(".game-buy-button-price"),
    ...document.querySelectorAll(".game-buy-button-price-bonus"),
  ];
  if (finalPriceElements.length > 0) {
    for (const element of finalPriceElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "impuestito-xbdeals");
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
          isDiscount: element.classList.contains("strikethrough"),
        });
      }
      element.classList.add("impuestito-done");
    }
  }
}

// Init
handleXBDealsMutations();
