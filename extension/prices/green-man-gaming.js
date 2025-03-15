/**
 * Green Man Gaming Store
 */
function handleGreenManGamingMutations() {
  if (someURL(["greenmangaming.com"], hostname)) {
    initMenu("Green Man Gaming Store");
    observeInit(document.body, GreenManGamingScrapper);
  }
}

/**
 * Tested on:
 * https://www.greenmangaming.com/
 * https://www.greenmangaming.com/games/
 * https://www.greenmangaming.com/games/railway-empire-2-bella-italia-pc/
 */
function GreenManGamingScrapper() {
  console.log('🔃 Runnig:', arguments.callee.name);

  const toRemove = [
    ".prev-price > span",
    ".current-price > span",
  ].join(", ");

  [...document.querySelectorAll(toRemove)]
    .map((e) => {
      e.remove();
    })

  const targets = [
    "gmgprice",
  ].join(", ")

  const priceElements = [...document.querySelectorAll(targets)]
    .filter((e) => e.innerText.includes("$"))
    .filter((e) => !alreadyScanned(e))
    .map((e) => {
      e.classList.add("impuestito", "impuestito-green-man-gaming");
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
handleGreenManGamingMutations();
