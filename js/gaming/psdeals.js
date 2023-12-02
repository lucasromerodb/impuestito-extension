/**
 * XB Deals Web Store
 */
function handlePSDealsMutations() {
  if (someURL(["psdeals.net"], hostname) && someURL(["/ar-store"], pathname)) {
    console.log("🟢 impuestito is working...");
    observeInit(document, psdealsScrapper);
  }
}

function psdealsScrapper() {
  const elements = [];
  const finalPriceElements = [
    ...document.querySelectorAll(".game-collection-item-price"),
    ...document.querySelectorAll(".game-collection-item-price-discount"),
    ...document.querySelectorAll(".game-collection-item-price-bonus"),
    ...document.querySelectorAll(".game-buy-button-price"),
    ...document.querySelectorAll(".game-buy-button-price-discount"),
    ...document.querySelectorAll(".game-buy-button-price-bonus"),
  ];
  if (finalPriceElements.length > 0) {
    for (const element of finalPriceElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "impuestito-psdeals");
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
          isDiscount: element.classList.contains("strikethrough"),
        });
      }
      element.classList.add("impuestito-done");
    }
  }
}

// Init
handlePSDealsMutations();
