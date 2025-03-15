/**
 * Ubisoft Store
 */
function handleUbisoftMutations() {
  if (someURL(["store.ubisoft"], hostname)) {
    initMenu('Ubisoft Store')
    observeInit(document.body, UbisoftScrapper);
  }
}

/**
 * Ubisoft Scrapper
 *
 * https://store.ubisoft.com/
 * https://store.ubisoft.com/ofertas/home
 */
function UbisoftScrapper() {

  console.log('🔃 Runnig:', arguments.callee.name);

  const targets = [
    "span.product-tiles_ui_components_ProductPrice__price",
    "span.product-tiles_ui_components_ProductPrice__regularPrice",
    ".standard-price",
    ".price-discount",
    ".price-item",
    ".product-tiles_product-card_components_Content__container span"
  ].join(", ")


  const finalPriceElements = [...document.querySelectorAll(targets)]
    .filter((e) => e.innerText.includes("$"))
    .filter((e) => !alreadyScanned(e))
    .map((e) => {
      e.classList.add("impuestito", "impuestito-ubisoft")
      return e;
    });

  const priceElementsTarget = finalPriceElements.filter((e) => !alreadyProcessed(e));
  if (priceElementsTarget.length > 0) {
    for (const element of priceElementsTarget) {
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
handleUbisoftMutations();
