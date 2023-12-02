/**
 * Microsoft Xbox Web Store
 */
function handleXboxMutations() {
  if (someURL(["xbox.com"], hostname)) {
    console.log("🟢 impuestito is working...");
    if (someURL(["games/all-games", "browse/games"], pathname)) {
      observeInit(document, handleXboxAllGames);
    }

    if (someURL(["games/store/"], pathname)) {
      observeInit(document, handleXboxGameButton);
      observeInit(document, handleXboxGameRelated);
    }

    if (someURL(["games/"], pathname)) {
      observeInit(document, handleXboxGamesFeatured);
    }

    if (someURL(["game-pass"], pathname)) {
      observeInit(document, handleXboxGamePass);
    }
  }
}

/**
 * PAGES TO TEST
 *
 * Game Pass featured page
 *
 * https://www.xbox.com/es-AR/xbox-game-pass?xr=shellnav
 * https://www.xbox.com/es-AR/xbox-game-pass?xr=shellnav#join
 *
 * Gold
 * https://www.xbox.com/es-AR/live/gold?xr=shellnav#dealswithgold
 * https://www.xbox.com/es-AR/live/gold/upgrade
 */

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
 * https://www.xbox.com/es-ar/games/all-games
 */
function handleXboxAllGames() {
  const priceElements = [...document.querySelectorAll("li a[data-m] div div div span")].filter((e) => e.className.includes("ProductCard-module__price"));
  if (priceElements.length > 0) {
    for (const element of priceElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-regular", "impuestito-xbox");
    }
  }

  const discountPriceElements = [...document.querySelectorAll("li a[data-m] div div div span")].filter((e) => e.className.includes("Price-module__originalPrice"));
  if (discountPriceElements.length > 0) {
    for (const element of discountPriceElements) {
      if (element.className.includes("impuestito")) return;
      // element.innerHTML = element.innerHTML.replace(/(<.*\/span>)(.*)?/gi, '$1<span class="price-discount">$2</span>');
      element.classList.add("impuestito", "price-discount", "impuestito-xbox");
    }
  }

  const targetElements = document.querySelectorAll(".impuestito.price-regular, .impuestito.price-discount");
  if (targetElements.length > 0) {
    for (const element of targetElements) {
      const iconVisibility = element.className.includes("price-regular");

      if (!element.className.includes("impuestito-done")) {
        scrapper({
          priceElement: element,
          eventElement: element,
          currency: "ARS",
          showEmoji: false,
          isDiscount: element.classList.contains("price-discount"),
        });
        element.classList.add("impuestito-done");
      }
    }
  }
}

/**
 * Tested on:
 * https://www.xbox.com/es-ar/games/store/dragon-ball-xenoverse-2/BX03760D0QGN
 * https://www.xbox.com/es-ar/games/store/grand-theft-auto-iv/BRQ2SCZCTXF2
 * https://www.xbox.com/es-ar/games/store/lego-los-increbles/BZP3R43F8DNH
 * https://www.xbox.com/es-ar/games/store/tom-clancys-rainbow-six-extraction/9P53VF7859PW
 * https://www.xbox.com/es-ar/games/store/psychonauts/C5HHPG1TXDNG
 */
function handleXboxGameRelated() {
  const priceElements = [...document.querySelector("#PageContent").querySelectorAll("span")]
    .filter((e) => e.className.includes("ProductCard-module__price"))
    .filter((e) => e.innerText.includes("$") && e.innerText === e.innerHTML && e.innerText.length < 20);
  if (priceElements.length > 0) {
    for (const element of priceElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-regular", "impuestito-xbox");
    }
  }

  const discountPriceElements = [...document.querySelector("#PageContent").querySelectorAll("span")]
    .filter((e) => e.className.includes("Price-module__originalPrice"))
    .filter((e) => e.innerText.includes("$") && e.innerText.includes("Ahorra") && e.innerText === e.innerHTML);
  if (discountPriceElements.length > 0) {
    for (const element of discountPriceElements) {
      if (element.className.includes("impuestito")) return;
      element.innerHTML = element.innerHTML.replace(/(Ahorra)(.*)(\s?con\s?)/gi, '$1<span class="impuestito price-gamepass price-xbox price-discount">$2</span> $3');
    }
  }

  const priceEditionElements = [...document.querySelector("#PageContent").querySelectorAll("span")]
    .filter((e) => e.className.includes("Price-module__boldText"))
    .filter((e) => e.innerText.includes("$") && e.innerText === e.innerHTML && e.innerText.length < 20);
  if (priceEditionElements.length > 0) {
    for (const element of priceEditionElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-regular", "impuestito-xbox");
    }
  }

  const discountPriceEditionElements = [...document.querySelector("#PageContent").querySelectorAll("span")]
    .filter((e) => e.className.includes("Price-module__originalPrice"))
    .filter((e) => e.innerText.includes("$") && e.innerText === e.innerHTML && e.innerText.length < 20);
  if (discountPriceEditionElements.length > 0) {
    for (const element of discountPriceEditionElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-discount", "impuestito-xbox");
    }
  }

  const targetElements = document.querySelectorAll(".impuestito");
  if (targetElements.length > 0) {
    for (const element of targetElements) {
      if (!element.className.includes("impuestito-done")) {
        scrapper({
          priceElement: element,
          eventElement: element,
          currency: "ARS",
          showEmoji: false,
          isDiscount: element.classList.contains("price-discount"),
        });
        element.classList.add("impuestito-done");
      }
    }
  }
}

/**
 * Tested on:
 * https://www.xbox.com/es-ar/games/store/dragon-ball-xenoverse-2/BX03760D0QGN
 * https://www.xbox.com/es-ar/games/store/grand-theft-auto-iv/BRQ2SCZCTXF2
 * https://www.xbox.com/es-ar/games/store/lego-los-increbles/BZP3R43F8DNH
 * https://www.xbox.com/es-ar/games/store/tom-clancys-rainbow-six-extraction/9P53VF7859PW
 * https://www.xbox.com/es-ar/games/store/psychonauts/C5HHPG1TXDNG
 * https://www.xbox.com/es-AR/games/store/the-elder-scrolls-v-skyrim-anniversary-edition/9PBN02CTMRTH/0010
 */
function handleXboxGameButton() {
  const priceElements = [...document.querySelector("[data-focus-container='0']").querySelectorAll("span")]
    .filter((e) => e.className.includes("Price-module__boldText"))
    .filter((e) => e.innerText.includes("$") && e.innerText === e.innerHTML && e.innerText.length < 20);
  if (priceElements.length > 0) {
    for (const element of priceElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-regular", "impuestito-xbox");
    }
  }

  const priceDiscountBrandElements = [...document.querySelector("[data-focus-container='0']").querySelectorAll("span")]
    .filter((e) => e.className.includes("Price-module__brandOriginalPrice") || e.className.includes("Price-module__originalPrice"))
    .filter((e) => e.innerText.includes("$") && e.innerText === e.innerHTML && e.innerText.length < 20);
  if (priceDiscountBrandElements.length > 0) {
    for (const element of priceDiscountBrandElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-discount", "impuestito-xbox");
    }
  }

  const priceElementsSave = [...document.querySelector("[data-focus-container='0']").querySelectorAll("span")].filter((e) => e.innerText.includes("$") && e.innerText.includes("Ahorra") && e.innerText === e.innerHTML);
  if (priceElementsSave.length > 0) {
    for (const element of priceElementsSave) {
      if (element.className.includes("impuestito")) return;
      element.innerHTML = element.innerHTML.replace(/(Ahorra)(.*)(\s?con\s?)/gi, '$1<span class="impuestito price-gamepass price-xbox price-regular">$2</span> $3');
    }
  }

  const targetElements = document.querySelectorAll(".impuestito");

  for (const element of targetElements) {
    if (targetElements.length > 0) {
      if (!element.className.includes("impuestito-done")) {
        scrapper({
          priceElement: element,
          eventElement: element,
          currency: "ARS",
          showEmoji: false,
          isDiscount: element.classList.contains("price-discount"),
        });
        element.classList.add("impuestito-done");
      }
    }
  }
}

/**
 * Tested on:
 * https://www.xbox.com/es-AR/games/halo-infinite
 * https://www.xbox.com/es-ar/games/forza-horizon-4
 * https://www.xbox.com/es-ar/games/assassins-creed-valhalla
 * https://www.xbox.com/es-ar/games/fortnite
 */
function handleXboxGamesFeatured() {
  const priceElements = [...document.querySelector("#PageContent").querySelectorAll(".leftCol h4")].filter((e) => e.innerText.includes("$") && e.innerText.length < 20);
  if (priceElements.length > 0) {
    for (const element of priceElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-regular", "price-featured");
    }
  }

  const priceElementsGP = [...document.querySelector("#PageContent").querySelectorAll("p")].filter((e) => e.innerText.includes("$"));
  if (priceElementsGP.length > 0) {
    for (const element of priceElementsGP) {
      if (element.className.includes("impuestito")) return;
      element.innerHTML = element.innerHTML.replace(/(.*)(\s?con Xbox Game Pass)/gi, '<span class="price-regular price-featured-gp">$1</span> $2');
      element.classList.add("impuestito");
    }
  }

  const priceElementsComplementsGP = [...document.querySelector("#PageContent").querySelectorAll(".rightCol h4")].filter((e) => e.innerText.includes("$"));
  if (priceElementsComplementsGP.length > 0) {
    for (const element of priceElementsComplementsGP) {
      if (element.className.includes("impuestito")) return;
      element.innerHTML = element.innerHTML.replace(/(.*)(\scon.*)/gi, '<span class="price-regular price-featured-gp">$1</span> $2');
      element.classList.add("impuestito");
    }
  }

  const targetElements = document.querySelectorAll(".impuestito .price-regular");
  if (targetElements.length > 0) {
    for (const element of targetElements) {
      if (!element.className.includes("impuestito-done")) {
        scrapper({
          priceElement: element,
          eventElement: element,
          currency: "ARS",
          showEmoji: element.classList.contains("price-discount") || element.firstChild.classList.contains("price-discount"),
        });
        element.classList.add("impuestito-done");
      }
    }
  }
}

/**
 * Tested on:
 * https://www.xbox.com/es-AR/xbox-game-pass
 * https://www.xbox.com/es-AR/xbox-game-pass/pc-game-pass
 */
function handleXboxGamePass() {
  const pricingCardsPriceElements = [...document.querySelectorAll("li[data-panel-option] .price p")].filter((e) => e.innerText.includes("$"));
  if (pricingCardsPriceElements.length > 0) {
    for (const element of pricingCardsPriceElements) {
      if (element.className.includes("impuestito")) return;
      element.innerHTML = element.innerHTML.replace(/(\$\d)(\D)(\d+)(.+)(\/mes)/gi, '<span class="price-regular">$1$3$4</span> $5');
      element.classList.add("impuestito");
    }
  }

  const strongPriceElements = [...document.querySelector("#PageContent").querySelectorAll("strong")].filter((e) => e.innerText.includes("$"));
  if (strongPriceElements.length > 0) {
    for (const element of strongPriceElements) {
      if (element.className.includes("impuestito")) return;
      element.innerHTML = element.innerHTML.replace(/(\$\d)(\D)(\d+)(.+)(\/mes)/gi, '<span class="price-regular">$1$3$4</span> $5');
      element.classList.add("impuestito");
    }
  }

  const targetElements = document.querySelectorAll(".impuestito .price-regular");

  for (const element of targetElements) {
    if (targetElements.length > 0) {
      if (!element.className.includes("impuestito-done")) {
        console.log(element);
        scrapper({
          priceElement: element,
          eventElement: element,
          currency: "ARS",
          showEmoji: false,
          isDiscount: element.firstChild.classList.contains("price-discount"),
        });
        element.classList.add("impuestito-done");
      }
    }
  }
}

// Init
handleXboxMutations();
