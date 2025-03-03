/**
 * Microsoft Xbox Web Store
 */
function handleXboxMutations() {
  if (someURL(["xbox.com"], hostname)) {
    writePlayground("Xbox Store");

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
 */
function XboxScrapper() {
  console.log('🔃 Runnig:', arguments.callee.name);

  const targets = [
    "span",
    "p"
  ].join(", ")

  const priceElements = [...document.querySelectorAll(targets)]
    .filter((e) => e.innerText.includes("$"))
    // .filter((e) => e.className.includes("Price-module") || e.innerText.includes("Ahorra"))
    .filter((e) => !alreadyScanned(e))
    .map((e) => {
      e.classList.add("impuestito", "impuestito-xbox", "price-regular");
      return e;
    });

  const targetElements = priceElements.filter((e) => !alreadyProcessed(e));
  if (targetElements.length > 0) {
    for (const element of targetElements) {
        scrapper({
          priceElement: element,
          eventElement: element,
          currency: "ARS",
          showEmoji: true,
          isDiscount: element.classList.contains("price-discount"),
        });
        element.classList.add("impuestito-done");
    }
  }
}

// Init
handleXboxMutations();
