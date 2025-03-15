/**
 * Nintendo Store
 */
function handleNintendoARMutations() {
  if (someURL(["nintendo"], hostname)) {
    initMenu("Nintendo Store");

    if (someURL(["/es-ar"], pathname)) {
      observeInit(document, NintendoARScrapper, { subtree: true, attributes: false, childList: true });
    }

    // if (someURL(["/us", "/en-us"], pathname)) {
    //   observeInit(document, NintendoUSScrapper, { subtree: true, attributes: false, childList: true });
    // }
  }
}

/**
 *
 * Tested on:
 * https://www.nintendo.com/es-ar/store/games/
 * https://www.nintendo.com/es-ar/store/games/#show=0&p=1&sort=df&f=topLevelFilters&topLevelFilters=Ofertas
 * https://www.nintendo.com/es-ar/store/products/sonic-x-shadow-generations-switch/
 * https://www.nintendo.com/es-ar/store/products/super-mario-bros-wonder-switch/
 */

function NintendoARScrapper() {
  console.log('🔃 Runnig:', arguments.callee.name);

  const targets = [
    ".W990N.SH2al._5auKz",
    ".o2BsP.SH2al",
    ".W990N.SH2al",
    ".W990N.QS4uJ",
    ".W990N.QS4uJ._5auKz",
    ".o2BsP.QS4uJ"
  ].join(", ");

  const elements = [...document.querySelectorAll(targets)]
    .filter((e) => e.innerText.includes("$"))
    // .filter((e) => e.innerText.includes('Precio normal') || e.innerText.includes('Precio promocional'))
    .filter((e) => !alreadyScanned(e))
    .map((e) => {
      e.classList.add("impuestito", "impuestito-nintendo")
      e.innerText = e.innerText.replace(/(precio(\s)?(normal|promocional)(:)?)/gi, "");
      return e;
    });

  const versions = [...document.querySelectorAll("main > section:first-child > div > div > div > div > div > p")]
    .filter((e) => e.innerText.includes("$"))
    .filter((e) => !alreadyScanned(e))
    .map((e) => {
      e.classList.add("impuestito", "impuestito-nintendo")
      return e;
    });


  const targetElements = [...elements, ...versions].filter((e) => !alreadyProcessed(e));
  if (targetElements.length > 0) {
    for (const element of targetElements) {
      scrapper({
        priceElement: element,
        eventElement: element,
        currency: "ARS",
        showEmoji: true,
        isDiscount: false,
      });
      element.classList.add("impuestito-done");
    }
  }
}

function NintendoUSScrapper() {
  console.log('🔃 Runnig:', arguments.callee.name);

  const targets = [
    ".W990N.SH2al._5auKz",
    ".o2BsP.SH2al",
    ".W990N.SH2al",
    ".W990N.QS4uJ",
    ".W990N.QS4uJ._5auKz",
    ".o2BsP.QS4uJ"
  ].join(", ");

  const elements = [...document.querySelectorAll(targets)]
    .filter((e) => e.innerText.includes("$"))
    // .filter((e) => e.innerText.includes('Precio normal') || e.innerText.includes('Precio promocional'))
    .filter((e) => !alreadyScanned(e))
    .map((e) => {
      e.classList.add("impuestito", "impuestito-nintendo")
      e.innerText = e.innerText.replace(/((regular|current)(\s)?price(:)?)/gi, "");
      return e;
    });

  const versions = [...document.querySelectorAll("main > section:first-child > div > div > div > div > div > p")]
    .filter((e) => e.innerText.includes("$"))
    .filter((e) => !alreadyScanned(e))
    .map((e) => {
      e.classList.add("impuestito", "impuestito-nintendo")
      return e;
    });


  const targetElements = [...elements, ...versions].filter((e) => !alreadyProcessed(e));
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

// TODO: https://www.nintendo.com/es-ar/store/products/monster-hunter-rise-plus-sunbreak-switch/
// Dropdown

// Init
handleNintendoARMutations();
