/**
 * PlayStation Store
 */
function handlePlaystationMutations() {
  if (someURL(["playstation"], hostname)) {
    initMenu("PlayStation Store");
    observeInit(document, PlaystationScrapper);
  }
}

/**
 * Scrapes PlayStation price elements from the document, processes them, and applies specific classes.
 *
 * This function selects all `span` and `s` elements that contain a dollar sign (`$`) in their inner text,
 * ensures the text length is less than 15 characters, and that the inner text matches the inner HTML.
 * It then filters out elements that have already been scanned, adds specific classes to the remaining elements,
 * and processes them if they haven't been processed yet.
 *
 * The processed elements are passed to the `scrapper` function with specific parameters, and a class indicating
 * completion is added to each processed element.
 *
 * Tested on:
 * https://store.playstation.com/es-ar/category/024029c7-f61b-4bef-a4d7-06270ed12b56
 * https://store.playstation.com/es-ar/pages/latest
 * https://store.playstation.com/es-ar/pages/collections
 * https://store.playstation.com/es-ar/pages/deals
 * https://store.playstation.com/es-ar/pages/subscriptions
 * https://www.playstation.com/es-ar/ps-plus/whats-new/
 * https://www.playstation.com/es-ar/ps-plus/this-month-on-ps-plus/
 * https://store.playstation.com/es-ar/product/UP1004-CUSA03041_00-RDR2ULTMEDTNBUND
 * https://store.playstation.com/es-ar/product/UP2047-CUSA01164_00-PLAGUEOFFROGSPAC
 * https://store.playstation.com/es-ar/concept/10000649
 * https://www.playstation.com/es-ar/games/god-of-war/
 * https://www.playstation.com/es-ar/games/horizon-zero-dawn/
 * https://www.playstation.com/es-ar/games/god-of-war/
 * https://www.playstation.com/es-ar/games/ea-sports-fifa-22/
 *
 * @function
 */
function PlaystationScrapper() {
  const elements = [...document.querySelectorAll('span, s')]
    .filter((e) => e.innerText.includes("$"))
    .filter((e) => !alreadyScanned(e))
    .map((e) => {
      e.classList.add("impuestito", "impuestito-playstation")
      return e;
    });

  const targetElements = elements.filter((e) => !alreadyProcessed(e));
  if (targetElements.length > 0) {
    for (const element of targetElements) {
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
handlePlaystationMutations();
