/**
 * Epic Games Web Store
 */
function handleGOGMutations() {
  if (someURL(["gog.com"], hostname)) {
    writePlayground("GOG Store");
    observeInit(document, GOGScrapper);
  }
}

/**
 * GOG Scrapper
 */
function GOGScrapper() {
  // FINAL: ...document.querySelectorAll(".final-value, .big-spot__price-amount, .product-tile__price-discounted, .product-actions-price__final-amount._price, .menu-inside-category ._price, .menu-cart-item__price ._price, .series__buy-all-price-final._price"),
  // BASE: ...document.querySelectorAll(".base-value, .product-tile__price._price, .product-actions-price__base-amount._price, .series__buy-all-price-base._price"),
  const targets = [
    ".final-value",
    ".base-value",
    ".big-spot__price-amount",
    ".product-tile__price-discounted",
    ".product-actions-price__final-amount._price",
    ".menu-inside-category ._price",
    ".menu-cart-item__price ._price",
    ".series__buy-all-price-final._price",
    ".product-tile__price._price",
    ".product-actions-price__base-amount._price",
    ".series__buy-all-price-base._price",
  ].join(", ");

  const elements = [...document.querySelectorAll(targets)]
    .filter((e) => !alreadyScanned(e))
    .map((e) => {
      e.classList.add("impuestito", "impuestito-gog")
      return e;
    });

  console.log(elements);

  const targetElements = elements.filter((e) => !alreadyProcessed(e));
  if (targetElements.length > 0) {
    for (const element of targetElements) {
      scrapper({
        priceElement: element,
        eventElement: element,
        currency: "US",
        showEmoji: true,
        isDiscount: element.classList.contains("price-discount"),
      });
      element.classList.add("impuestito-done");
    }
  }
}

// Init
handleGOGMutations();
