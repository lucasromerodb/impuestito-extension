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
      handleXboxGamesFeaturedComplements();
    }

    if (someURL(["xbox-game-pass"], pathname)) {
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
  for (const element of priceElements) {
    if (element.className.includes("impuestito")) return;
    element.classList.add("impuestito", "price-regular");
  }

  const discountPriceElements = [...document.querySelectorAll(".c-price s")];
  for (const element of discountPriceElements) {
    if (element.className.includes("impuestito")) return;
    element.innerHTML = element.innerHTML.replace(/(<.*\/span>)(.*)?/gi, '$1<span class="price-discount">$2</span>');
    element.classList.add("impuestito");
  }

  const targetElements = document.querySelectorAll(".impuestito.price-regular, .impuestito .price-discount");
  for (const element of targetElements) {
    const iconVisibility = element.className.includes("price-regular");

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

  // handleMutations(".gameDiv", "price-regular", (game) => {
  //   // Price
  //   scrapper({
  //     priceElement: game.querySelector(".gameDivLink .c-price [itemprop=price]"),
  //     eventElement: game.querySelector(".gameDivLink .c-price"),
  //     currency: "ARS",
  //     showEmoji: true,
  //   });

  //   // Regular Price
  //   scrapper({
  //     priceElement: game.querySelector(".gameDivLink .c-price s span"),
  //     eventElement: game.querySelector(".gameDivLink .c-price"),
  //     currency: "ARS",
  //     showEmoji: false,
  //   });

  //   // Popup Price
  //   scrapper({
  //     priceElement: game.querySelector(".popprice .c-price [itemprop=price]"),
  //     eventElement: game.querySelector(".popprice .c-price"),
  //     currency: "ARS",
  //     showEmoji: true,
  //   });

  //   // Popup Regular Price
  //   scrapper({
  //     priceElement: game.querySelector(".popprice .c-price s span"),
  //     eventElement: game.querySelector(".popprice .c-price"),
  //     currency: "ARS",
  //     showEmoji: false,
  //   });
  // });
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
  for (const element of priceElements) {
    if (element.className.includes("impuestito")) return;
    element.classList.add("impuestito");
  }

  const targetElements = document.querySelectorAll(".impuestito");

  for (const element of targetElements) {
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

/**
 * Tested on:
 * https://www.xbox.com/es-ar/games/store/dragon-ball-xenoverse-2/BX03760D0QGN
 * https://www.xbox.com/es-ar/games/store/grand-theft-auto-iv/BRQ2SCZCTXF2
 * https://www.xbox.com/es-ar/games/store/lego-los-increbles/BZP3R43F8DNH
 * https://www.xbox.com/es-ar/games/store/tom-clancys-rainbow-six-extraction/9P53VF7859PW
 * https://www.xbox.com/es-ar/games/store/psychonauts/C5HHPG1TXDNG
 */
function handleXboxGameButton() {
  const priceElements = [...document.querySelector("#PageContent").querySelectorAll("span")].filter((e) => e.innerText.includes("$") && e.innerText === e.innerHTML && e.innerText.length < 20);
  for (const element of priceElements) {
    if (element.className.includes("impuestito")) return;
    element.classList.add("impuestito");
  }

  const targetElements = document.querySelectorAll(".impuestito");

  for (const element of targetElements) {
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

/**
 * Tested on:
 * https://www.xbox.com/es-AR/games/halo-infinite
 * https://www.xbox.com/es-ar/games/forza-horizon-4
 * https://www.xbox.com/es-ar/games/assassins-creed-valhalla
 */
function handleXboxGamesFeatured() {
  const priceElements = [...document.querySelector("#PageContent").querySelectorAll("h4")].filter((e) => e.innerText.includes("$") && e.innerText.length < 20);
  for (const element of priceElements) {
    if (element.className.includes("impuestito")) return;
    element.classList.add("impuestito");
  }

  const targetElements = document.querySelectorAll(".impuestito");

  for (const element of targetElements) {
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

/**
 * Tested on:
 * https://www.xbox.com/es-ar/games/fortnite
 */
function handleXboxGamesFeaturedComplements() {
  handleMutations(".c-carousel section.m-product-placement-item.context-software", "xbox--games-featured-complements", (game) => {
    // Price Complements
    scrapper({
      priceElement: game.querySelector(".pricing").lastElementChild.lastElementChild,
      eventElement: game.querySelector(".pricing").lastElementChild.lastElementChild,
      currency: "ARS",
      showEmoji: false,
    });
  });
}
