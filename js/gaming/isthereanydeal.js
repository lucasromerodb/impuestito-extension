/**
 * Epic Games Web Store
 */
function handleIsThereAnyDealMutations() {
  if (someURL(["isthereanydeal"], hostname)) {
    writePlayground("Is There Any Deal Store");
    observeInit(document.body, IsThereAnyDealScrapper);
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
function IsThereAnyDealScrapper() {
  console.log('🔃 Runnig:', arguments.callee.name);

  const targets = [
    "span",
    "div"
  ].join(", ")

  const finalPriceElements = [...document.querySelectorAll(targets)]
    .filter((e) => !alreadyScanned(e))
    .filter((e) => e.innerText.includes("$"))
    .map((e) => {
      e.classList.add("impuestito", "impuestito-isthereanydeal")
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
handleIsThereAnyDealMutations();
