/**
 * Humble Bundle Store
 */
function handleHumbleBundleMutations() {
  if (someURL(["humblebundle.com"], hostname)) {
    initMenu("Humble Bundle Store");
    observeInit(document.body, HumbleBundleScrapper);
  }
}

/**
 * Tested on:
 * https://www.humblebundle.com/store
 * https://www.humblebundle.com/store/astroneer
 */
function HumbleBundleScrapper() {
  console.log('🔃 Runnig:', arguments.callee.name);
  [...document.querySelectorAll(".price-button")]
    .map((e) => {
      e.style.width = "auto";
      e.style.paddingLeft = "5px";
      e.style.paddingRight = "5px";
    })

  const targets = [
    ".price",
    ".full-price",
    ".current-price",
  ].join(", ")

  const priceElements = [...document.querySelectorAll(targets)]
    .filter((e) => e.innerText.includes("$"))
    .filter((e) => !alreadyScanned(e))
    .map((e) => {
      e.classList.add("impuestito", "impuestito-humble-bundle");
      return e;
    });

  const targetElements = priceElements.filter((e) => !alreadyProcessed(e));
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
handleHumbleBundleMutations();
