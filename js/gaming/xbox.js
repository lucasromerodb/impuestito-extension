/**
 * Microsoft Xbox Web Store
 */
function handleXboxMutations() {
  if (someURL(["xbox.com"], hostname)) {
    if (someURL(["games/all-games"], pathname)) {
      handleXboxAllGames();
    }

    if (someURL(["games/store/"], pathname)) {
      handleXboxGameButton();
      handleXboxGameRelated();
    }

    if (someURL(["games/"], pathname)) {
      handleXboxGamesFeatured();
    }

    if (someURL(["game-pass"], pathname)) {
      handleXboxGamePass();
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
  const priceElements = [...document.querySelectorAll('.c-price [itemprop="price"]')];
  if (priceElements.length > 0) {
    for (const element of priceElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-regular");
    }
  }

  const discountPriceElements = [...document.querySelectorAll(".c-price s")];
  if (discountPriceElements.length > 0) {
    for (const element of discountPriceElements) {
      if (element.className.includes("impuestito")) return;
      element.innerHTML = element.innerHTML.replace(/(<.*\/span>)(.*)?/gi, '$1<span class="price-discount">$2</span>');
      element.classList.add("impuestito");
    }
  }

  const targetElements = document.querySelectorAll(".impuestito.price-regular, .impuestito .price-discount");
  if (targetElements.length > 0) {
    for (const element of targetElements) {
      const iconVisibility = element.className.includes("price-regular");

      if (!element.className.includes("impuestito-done")) {
        scrapper({
          priceElement: element,
          eventElement: element,
          currency: "ARS",
          showEmoji: iconVisibility,
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
  const priceElements = [...document.querySelector("#PageContent").querySelectorAll("p")].filter((e) => e.innerText.includes("$") && e.innerText === e.innerHTML && e.innerText.length < 20);
  if (priceElements.length > 0) {
    for (const element of priceElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-related");
    }
  }

  const targetElements = document.querySelectorAll(".impuestito.price-related");
  if (targetElements.length > 0) {
    for (const element of targetElements) {
      if (!element.className.includes("impuestito-done")) {
        scrapper({
          priceElement: element,
          eventElement: element,
          currency: "ARS",
          showEmoji: true,
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
  const priceElements = [...document.querySelector("#PageContent").querySelectorAll("span")].filter((e) => e.innerText.includes("$") && e.innerText === e.innerHTML && e.innerText.length < 20);
  if (priceElements.length > 0) {
    for (const element of priceElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-regular");
    }
  }

  const priceElementsSave = [...document.querySelector("#PageContent").querySelectorAll("span")].filter((e) => e.innerText.includes("$") && e.innerText.includes("Ahorra") && e.innerText === e.innerHTML);
  if (priceElementsSave.length > 0) {
    for (const element of priceElementsSave) {
      if (element.className.includes("impuestito")) return;
      element.innerHTML = element.innerHTML.replace(/(Ahorra)(.*)(\s?con\s?)/gi, '$1<span class="price-gp">$2</span> $3');
      element.classList.add("impuestito");
    }
  }

  const targetElements = document.querySelectorAll(".impuestito.price-regular, .impuestito .price-gp");

  for (const element of targetElements) {
    if (targetElements.length > 0) {
      if (!element.className.includes("impuestito-done")) {
        console.log(element);
        scrapper({
          priceElement: element,
          eventElement: element,
          currency: "ARS",
          showEmoji: true,
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
  const priceElements = [...document.querySelector("#PageContent").querySelectorAll("h4")].filter((e) => e.innerText.includes("$") && e.innerText.length < 20);

  if (priceElements.length > 0) {
    for (const element of priceElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-featured");
    }
  }

  const priceElementsGP = [...document.querySelector("#PageContent").querySelectorAll("p")].filter((e) => e.innerText.includes("$"));
  if (priceElementsGP.length > 0) {
    for (const element of priceElementsGP) {
      if (element.className.includes("impuestito")) return;
      element.innerHTML = element.innerHTML.replace(/(.*)(\s?con Xbox Game Pass)/gi, '<span class="price-featured-gp">$1</span> $2');
      element.classList.add("impuestito");
    }
  }

  const targetElements = document.querySelectorAll(".impuestito.price-featured, .impuestito .price-featured-gp");

  if (targetElements.length > 0) {
    for (const element of targetElements) {
      if (!element.className.includes("impuestito-done")) {
        scrapper({
          priceElement: element,
          eventElement: element,
          currency: "ARS",
          showEmoji: true,
        });
        element.classList.add("impuestito-done");
      }
    }
  }
}

function handleXboxGamePass() {
  const strongPriceElements = [...document.querySelector("#PageContent").querySelectorAll("strong")].filter((e) => e.innerText.includes("$"));
  if (strongPriceElements.length > 0) {
    for (const element of strongPriceElements) {
      if (element.className.includes("impuestito")) return;
      element.innerHTML = element.innerHTML.replace(/(.*)(\$.*\d)(\.)/gi, '$1<span class="price-strong">$2</span> $3');
      element.classList.add("impuestito");
    }
  }

  const monthPriceElements = [...document.querySelector("#PageContent").querySelectorAll(".price p")].filter((e) => e.innerText.includes("$"));
  if (monthPriceElements.length > 0) {
    for (const element of monthPriceElements) {
      if (element.className.includes("impuestito")) return;
      element.innerHTML = element.innerHTML.replace(/(\$\d+)/gi, '<span class="price-month">$1</span>');
      // element.innerHTML = element.innerHTML.replace(/(.*\d)(.*)/gi, '<span class="price-month">$1</span> $2');
      element.classList.add("impuestito");
    }
  }

  const joinPriceElements = [...document.querySelector("#PageContent").querySelectorAll("span")].filter((e) => e.innerText.includes("$") && e.innerText.includes("ÚNETE") && e.innerText === e.innerHTML);
  if (joinPriceElements.length > 0) {
    for (const element of joinPriceElements) {
      if (element.className.includes("impuestito")) return;
      element.innerHTML = element.innerHTML.replace(/(.*)(\$.*)/gi, '$1<span class="price-join">$2</span>');
      element.classList.add("impuestito");
    }
  }

  const targetElements = document.querySelectorAll(".impuestito .price-join, .impuestito .price-month, .impuestito .price-strong");

  for (const element of targetElements) {
    if (targetElements.length > 0) {
      if (!element.className.includes("impuestito-done")) {
        console.log(element);
        scrapper({
          priceElement: element,
          eventElement: element,
          currency: "ARS",
          showEmoji: true,
        });
        element.classList.add("impuestito-done");
      }
    }
  }
}
