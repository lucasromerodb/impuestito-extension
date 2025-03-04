/**
 * EA Store
 */
function handleEAMutations() {
  if (someURL(["ea.com"], hostname)) {
    if (someURL(["ea-play"], pathname)) {
      writePlayground("EA Store");
      setTimeout(() => {
        observeInit(document, EAScrapper);
      }, 200);
    }
  }
}

/**
 * EA Scrapper
 *
 * Tested on:
 *
 * https://www.ea.com/ea-play
 * https://www.ea.com/games/ea-sports-wrc/wrc-24/buy
 */
function EAScrapper() {
  console.log('🔃 Runnig:', arguments.callee.name);

  const finalPriceElements = [
      ...document.querySelector("ea-play-tile").shadowRoot.querySelectorAll("span.eapl-subscription-tile__price-number"),
      ...document.querySelector("ea-play-pro-tile").shadowRoot.querySelectorAll("span.eapl-subscription-tile__price-number"),
    ]
    .filter((e) => !alreadyScanned(e))
    .map((e) => {
      e.classList.add("impuestito", "impuestito-ea")
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
          isDiscount: false,
        });
      element.classList.add("impuestito-done");
    }
  }
}

// Init
handleEAMutations();
