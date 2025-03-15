/**
 * Microsoft Xbox Web Store
 */
function handleXboxMutations() {
  if (someURL(["xbox.com"], hostname)) {
    initMenu("Xbox Store");

    if (someURL(["/es-AR", "/es-ar"], pathname)) {
      observeInit(document.body, XboxScrapper);
    }
  }
}

/**
 * Tested on:
 * https://www.xbox.com/es-ar/games/all-games [DEPRECATED]
 * https://www.xbox.com/es-AR/games/browse
 * https://www.xbox.com/es-AR/games/store/grand-theft-auto-v-xbox-series-xs/9NXMBTB02ZSF/0010
 * https://www.xbox.com/es-ar/games/store/dragon-ball-xenoverse-2/BX03760D0QGN
 * https://www.xbox.com/es-ar/games/store/grand-theft-auto-iv/BRQ2SCZCTXF2
 * https://www.xbox.com/es-ar/games/store/lego-los-increbles/BZP3R43F8DNH
 * https://www.xbox.com/es-ar/games/store/tom-clancys-rainbow-six-extraction/9P53VF7859PW
 * https://www.xbox.com/es-ar/games/store/psychonauts/C5HHPG1TXDNG
 * https://www.xbox.com/es-AR/games/store/the-elder-scrolls-v-skyrim-anniversary-edition/9PBN02CTMRTH/0010
 * https://www.xbox.com/es-ar/games/store/dragon-ball-xenoverse-2/BX03760D0QGN
 * https://www.xbox.com/es-ar/games/store/grand-theft-auto-iv/BRQ2SCZCTXF2
 * https://www.xbox.com/es-ar/games/store/lego-los-increbles/BZP3R43F8DNH
 * https://www.xbox.com/es-ar/games/store/tom-clancys-rainbow-six-extraction/9P53VF7859PW
 * https://www.xbox.com/es-ar/games/store/psychonauts/C5HHPG1TXDNG
 * https://www.xbox.com/es-AR/games/halo-infinite
 * https://www.xbox.com/es-ar/games/forza-horizon-4
 * https://www.xbox.com/es-ar/games/assassins-creed-valhalla
 * https://www.xbox.com/es-ar/games/fortnite
 * https://www.xbox.com/es-AR/xbox-game-pass
 * https://www.xbox.com/es-AR/xbox-game-pass/pc-game-pass
 *
 * TODO:
 * https://www.xbox.com/es-AR/promotions/sales/sales-and-specials
 */
function XboxScrapper() {
  console.log('🔃 Runnig:', arguments.callee.name);

  const priceElements = [...document.querySelectorAll("span")]
    .filter((e) => !alreadyScanned(e))
    .filter((e) => e.className.includes("Price-module"))
    .filter((e) => e.innerText.includes("$"))
    .map((e) => {
      e.classList.add("impuestito", "impuestito-xbox");
      return e;
    });

  const priceElements2 = [...document.querySelectorAll("p")]
    .filter((e) => !alreadyScanned(e))
    .filter((e) => e.innerText.includes("$"))
    .map((e) => {
      e.classList.add("impuestito", "impuestito-xbox");
      return e;
    });

  const targetElements = [...priceElements, ...priceElements2].filter((e) => !alreadyProcessed(e));
  if (targetElements.length > 0) {
    for (const element of targetElements) {
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

// Init
handleXboxMutations();