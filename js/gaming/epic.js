/**
 * Epic Games Web Store
 */
function handleEpicMutations() {
  if (someURL(["epicgames"], hostname)) {
    writePlayground("Epic Games Store");
    observeInit(document.body, EpicScrapper);
  }
}

/**
 * Epic Scrapper
 *
 * Tested on:
 * https://store.epicgames.com/en-US/
 * https://store.epicgames.com/en-US/p/kingdom-come-deliverance-2-664783
 * https://store.epicgames.com/en-US/browse?q=assassins&sortBy=relevancy&sortDir=DESC&count=40
 *
 */
function EpicScrapper() {
  console.log('🔃 Runnig:', arguments.callee.name);

  const finalPriceElements = [...document.querySelectorAll("div, span, b")]
    .filter((e) => e.innerText.includes("$") && e.innerText.length < 15 && e.innerText === e.innerHTML)
    .filter((e) => !alreadyScanned(e))
    .map((e) => {
      e.classList.add("impuestito", "impuestito-epic")
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
handleEpicMutations();
