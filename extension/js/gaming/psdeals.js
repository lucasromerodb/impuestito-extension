/**
 * XB Deals Web Store
 */
function handlePSDealsMutations() {
  if (someURL(["psdeals.net"], hostname) && someURL(["/ar-store"], pathname)) {
    initMenu("PS Deals (AR) Store");
    observeInit(document, psdealsScrapperAR);
  }
}

function psdealsScrapperAR() {
  const targets = [
    ".game-collection-item-price",
    ".game-collection-item-price-discount",
    ".game-collection-item-price-bonus",
    ".game-buy-button-price",
    ".game-buy-button-price-discount",
    ".game-buy-button-price-bonus",
  ];

  const elements = [...document.querySelectorAll(targets)]
    .filter((e) => e.innerText.includes("$"))
    .filter((e) => !alreadyScanned(e))
    .map((e) => {
      e.classList.add("impuestito", "impuestito-psdeals")
      return e;
    });

  const priceElementsTarget = elements;
  if (priceElementsTarget.length > 0) {
    for (const element of priceElementsTarget) {
      if (!element.className.includes("impuestito-done")) {
        scrapper({
          priceElement: element,
          eventElement: element,
          currency: "US",
          showEmoji: true,
          isDiscount: element.classList.contains("strikethrough"),
        });
      }
      element.classList.add("impuestito-done");
    }
  }
}

// Init
handlePSDealsMutations();
