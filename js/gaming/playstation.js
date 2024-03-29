/**
 * PlayStation Web Store
 */
function handlePlaystationMutations() {
  if (someURL(["playstation"], hostname)) {
    console.log("🟢 impuestito is working...");
    if (someURL(["/category", "/search"], pathname)) {
      observeInit(document, handlePlaystationGrid);
    }

    if (someURL(["/pages", "/view"], pathname)) {
      observeInit(document, handlePlaystationSlider);
    }

    if (someURL(["/games"], pathname)) {
      observeInit(document, () => {
        handlePlaystationGames();
        handlePlaystationGamesEditions();
      });
    }

    if (someURL(["/ps-plus"], pathname)) {
      observeInit(document, handlePlaystationPlus);
    }

    if (someURL(["/product", "/concept"], pathname)) {
      observeInit(document, () => {
        handlePlaystationProduct();
        handlePlaystationProductEditions();
        handlePlaystationProductComplements();
      });
    }
  }
}

/**
 * HOW IT WORKS?
 *
 * Find a game item list
 * Then get the original price and their discount if exists
 * Then replace both with the new price
 * Then add a click event to switch between original and new prices
 */

/*
 * Tested on:
 * https://store.playstation.com/es-ar/category/024029c7-f61b-4bef-a4d7-06270ed12b56
 */
function handlePlaystationGrid() {
  handleMutations(".psw-product-tile__details", "playstation--grid", (game) => {
    // Price
    scrapper({
      priceElement: game.lastElementChild.querySelector(".psw-m-r-3"),
      eventElement: game.lastElementChild.querySelector(".psw-m-r-3"),
      currency: "US",
      showEmoji: false,
    });

    // Regular Price
    scrapper({
      priceElement: game.lastElementChild.querySelector(".psw-c-t-2"),
      eventElement: game.lastElementChild.querySelector(".psw-m-r-3"),
      currency: "US",
      showEmoji: false,
      isDiscount: true,
    });
  });
}

/*
 * Tested on:
 * https://store.playstation.com/es-ar/pages/latest
 * https://store.playstation.com/es-ar/pages/collections
 * https://store.playstation.com/es-ar/pages/deals
 * https://store.playstation.com/es-ar/pages/ps5
 * https://store.playstation.com/es-ar/pages/subscriptions
 */
function handlePlaystationSlider() {
  handleMutations(".psw-strand-scroller .psw-product-tile__details", "playstation--slider", (game) => {
    // Price
    scrapper({
      priceElement: game.lastElementChild.querySelector(".psw-m-r-3"),
      eventElement: game.lastElementChild.querySelector(".psw-m-r-3"),
      currency: "US",
      showEmoji: false,
    });

    // Regular Price
    scrapper({
      priceElement: game.lastElementChild.querySelector(".psw-c-t-2"),
      eventElement: game.lastElementChild.querySelector(".psw-m-r-3"),
      currency: "US",
      showEmoji: false,
      isDiscount: true,
    });
  });
}

/*
 * Tested on:
 * https://www.playstation.com/es-ar/ps-plus
 * https://www.playstation.com/es-ar/ps-plus/this-month-on-ps-plus/
 */
function handlePlaystationPlus() {
  handleMutations(".tier-selector__tier", "playstation--plus", (game) => {
    for (let offerNum = 0; offerNum < 3; offerNum++) {
      // Price
      scrapper({
        priceElement: game.querySelector(`[data-qa="mfe-tier-selector#standalonePrice#offer${offerNum}#price"]`),
        eventElement: game.querySelector(`[data-qa="mfe-tier-selector#standalonePrice#offer${offerNum}#price"]`),
        currency: "US",
        showEmoji: false,
      });
    }
  });
}

/*
 * Tested on:
 * https://store.playstation.com/es-ar/product/UP1004-CUSA03041_00-RDR2ULTMEDTNBUND
 * https://store.playstation.com/es-ar/product/UP2047-CUSA01164_00-PLAGUEOFFROGSPAC
 * https://store.playstation.com/es-ar/concept/10000649
 */
function handlePlaystationProduct() {
  handleMutations(".pdp-cta", "playstation--product", (game) => {
    for (let offerNum = 0; offerNum < 2; offerNum++) {
      // Price
      scrapper({
        priceElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#finalPrice"]`),
        eventElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#finalPrice"]`),
        currency: "US",
        showEmoji: false,
      });

      // Regular Price
      scrapper({
        priceElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#originalPrice"]`),
        eventElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#finalPrice"]`),
        currency: "US",
        showEmoji: false,
        isDiscount: true,
      });
    }
  });
}

/*
 * Tested on:
 * https://store.playstation.com/es-ar/product/UP1004-CUSA03041_00-RDR2ULTMEDTNBUND
 */
function handlePlaystationProductEditions() {
  handleMutations(".pdp-upsells article", "playstation--product-editions", (game, i) => {
    // Price
    scrapper({
      priceElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#finalPrice"]`),
      eventElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#finalPrice"]`),
      currency: "US",
      showEmoji: false,
    });

    // Regular Price
    scrapper({
      priceElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#originalPrice"]`),
      eventElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#finalPrice"]`),
      currency: "US",
      showEmoji: false,
      isDiscount: true,
    });
  });
}

/*
 * Tested on:
 * https://store.playstation.com/es-ar/product/UP1004-CUSA03041_00-RDR2ULTMEDTNBUND
 */
function handlePlaystationProductComplements() {
  handleMutations('ul[data-qa="add-ons"] li', "playstation--product-complements", (game, i) => {
    // Price
    console.log(game);
    scrapper({
      priceElement: game.querySelector(`[data-qa="add-ons-grid#${i}#price#display-price"]`),
      eventElement: game.querySelector(`[data-qa="add-ons-grid#${i}#price#display-price"]`),
      currency: "US",
      showEmoji: false,
    });
  });
}

/*
 * Tested on:
 * https://www.playstation.com/es-ar/games/god-of-war/
 * https://www.playstation.com/es-ar/games/horizon-zero-dawn/
 */
function handlePlaystationGames() {
  handleMutations(".game-hero__title-content", "playstation--games", (game) => {
    for (let offerNum = 0; offerNum < 2; offerNum++) {
      // Price
      scrapper({
        priceElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#finalPrice"]`),
        eventElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#finalPrice"]`),
        currency: "US",
        showEmoji: false,
      });

      // Regular Price
      scrapper({
        priceElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#originalPrice"]`),
        eventElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#finalPrice"]`),
        currency: "US",
        showEmoji: false,
        isDiscount: true,
      });
    }
  });
}

/*
 * Tested on:
 * https://www.playstation.com/es-ar/games/god-of-war/
 * https://www.playstation.com/es-ar/games/ea-sports-fifa-22/
 */
function handlePlaystationGamesEditions() {
  handleMutations('[data-qa="mfeUpsell"] article', "playstation--games-editions", (game, i) => {
    // Price
    scrapper({
      priceElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#finalPrice"]`),
      eventElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#finalPrice"]`),
      currency: "US",
      showEmoji: false,
    });

    // Regular Price
    scrapper({
      priceElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#originalPrice"]`),
      eventElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#finalPrice"]`),
      currency: "US",
      showEmoji: false,
      isDiscount: true,
    });
  });
}

/*
 * TODO: EA Play cards
 * Tested on:
 * https://store.playstation.com/es-ar/product/UP1004-CUSA03041_00-RDR2ULTMEDTNBUND
 */
// function handlePlaystationEAPlay() {
//   handleMutations("#gdk__content > div.section", (game, i) => {
//     // Price
//     // priceElement: [...document.querySelectorAll('#gdk__content div.section')[2].querySelectorAll('span[data-qa]')].filter(e=>e.innerText.includes('US$'))
//     scrapper({
//       priceElement: game.querySelectorAll("span").filter((e) => e.innerText.includes("$") && e.innerText.includes("Ahorra") && e.innerText === e.innerHTML),
//       eventElement: game.querySelector(`[data-qa="add-ons-grid#${i}#price#display-price"]`),
//       currency: "US",
//       showEmoji: false,
//     });
//   });
// }

// Init
handlePlaystationMutations();
