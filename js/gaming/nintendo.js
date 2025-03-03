/**
 * Epic Games Web Store
 */
function handleNintendoARMutations() {
  if (someURL(["nintendo"], hostname)) {
    writePlayground("Nintendo Store");

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
  const targets = [
    // ".fGENZM > div > div > span",
    // ".Duonm div.MVVbT > div > div > div.o2BsP.SH2al",
    // ".Duonm div.MVVbT > div > div > span",
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

  const targets = [
    ".Duonm > div > div.MVVbT > div > div > div.o2BsP.SH2al",
    ".Duonm > div > div.MVVbT > div > div > span",
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

/**
 * HOW IT WORKS?
 *
 * Find a game item list
 * Then get the original price and their discount if exists
 * Then replace both with the new price
 * Then add a click event to switch between original and new prices
 */

/**
 * Tested on:
 * https://www.nintendo.com/es-ar/store/games/
 */
function handleNintendoAllGamesArg() {
  const priceElements = [...document.querySelectorAll("span")].filter((e) => e.className.includes("Pricestyles__MSRP"));
  for (const element of priceElements) {
    if (element.className.includes("impuestito")) return;
    element.innerHTML = element.innerHTML.replace(/(.*)(<\/span>)(.*)(<\/span>)?/gi, '$1$2<span class="price-regular impuestito-nintendo">$3</span>$4');
    element.classList.add("impuestito");
  }

  const discountPriceElements = [...document.querySelectorAll("span")].filter((e) => e.className.includes("Pricestyles__SalePrice"));
  for (const element of discountPriceElements) {
    if (element.className.includes("impuestito")) return;
    element.innerHTML = element.innerHTML.replace(/(.*)(<\/span>)(.*)(<\/span>)?/gi, '$1$2<span class="price-regular impuestito-nintendo">$3</span>$4');
    element.classList.add("impuestito");
  }

  const targetElements = document.querySelectorAll(".impuestito .price-regular, .impuestito .price-discount");
  for (const element of targetElements) {
    const iconVisibility = element.className.includes("price-regular");

    if (!element.className.includes("impuestito-done")) {
      scrapper({
        priceElement: element,
        eventElement: element,
        currency: "ARS",
        showEmoji: false,
      });
      element.classList.add("impuestito-done");
    }
  }
}

function handleNintendoOtherVersionsGamesArg() {
  const priceElements = [...document.querySelectorAll("p")].filter((e) => e.innerHTML.includes("$"));
  for (const element of priceElements) {
    if (element.className.includes("impuestito")) return;
    element.classList.add("impuestito", "price-regular");
  }

  const targetElements = document.querySelectorAll(".impuestito.price-regular");
  for (const element of targetElements) {
    const iconVisibility = element.className.includes("price-regular");

    if (!element.className.includes("impuestito-done")) {
      scrapper({
        priceElement: element,
        eventElement: element,
        currency: "ARS",
        showEmoji: false,
      });
      element.classList.add("impuestito-done");
    }
  }
}

// TODO: https://www.nintendo.com/es-ar/store/products/monster-hunter-rise-plus-sunbreak-switch/
// Dropdown

// Init
handleNintendoARMutations();
