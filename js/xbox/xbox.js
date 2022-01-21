/**
 * Microsoft Xbox Web Store
 */
function handleXboxMutations() {

  if (someURL(['xbox.com'], hostname)) {

    if (someURL(['games/all-games'], pathname)) {
      handleXboxAllGames();
    }

    if (someURL(['games/store/'], pathname)) {
      handleXboxGameButton();
      handleXboxGameRelated();
    }

    if (someURL(['games/'], pathname)) {
      handleXboxGamesFeatured();
      handleXboxGamesFeaturedComplements();
    }
    if (someURL(['xbox-game-pass'], pathname)) {
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

  handleMutations(
    '.gameDiv',
    'xbox--all-games',
    (game) => {

      // Price
      scrapper({
        priceElement: game.querySelector('.gameDivLink .c-price [itemprop=price]'),
        eventElement: game.querySelector('.gameDivLink .c-price'),
        currency: 'ARS',
        showEmoji: true,
      });

      // Regular Price
      scrapper({
        priceElement: game.querySelector('.gameDivLink .c-price s span'),
        eventElement: game.querySelector('.gameDivLink .c-price'),
        currency: 'ARS',
        showEmoji: false,
      });

      // Popup Price
      scrapper({
        priceElement: game.querySelector('.popprice .c-price [itemprop=price]'),
        eventElement: game.querySelector('.popprice .c-price'),
        currency: 'ARS',
        showEmoji: true,
      });

      // Popup Regular Price
      scrapper({
        priceElement: game.querySelector('.popprice .c-price s span'),
        eventElement: game.querySelector('.popprice .c-price'),
        currency: 'ARS',
        showEmoji: false,
      });
    }
  );
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

  handleMutations(
    '.ItemsSlider-module__wrapper___3wfFw li',
    'xbox--game-related',
    (game) => {

      // Price
      scrapper({
        priceElement: game.querySelector('.ProductCard-module__priceGroup___3Z7wp .ProductCard-module__price___Ocr3o'),
        eventElement: game.querySelector('.ProductCard-module__priceGroup___3Z7wp .ProductCard-module__price___Ocr3o'),
        currency: 'ARS',
        showEmoji: true,
      });
    }
  );
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

  handleMutations(
    '.ProductActionsPanel-module__desktopProductActionsPanel___1MnpC button',
    'xbox--game-button',
    (game) => {

      // Price
      scrapper({
        priceElement: game.querySelector('button .AcquisitionButtons-module__listedPrice___3lkBo'),
        eventElement: game.querySelector('button .AcquisitionButtons-module__listedPrice___3lkBo'),
        currency: 'ARS',
        showEmoji: true,
      });

      // Regular Price
      scrapper({
        priceElement: game.querySelector('button .Price-module__brandOriginalPrice___3LOP5'),
        eventElement: game.querySelector('button .AcquisitionButtons-module__listedPrice___3lkBo'),
        currency: 'ARS',
        showEmoji: false,
      });

      // Regular Price Without XGP (second button)
      scrapper({
        priceElement: game.querySelector('button .Price-module__originalPrice___1zgYT'),
        eventElement: game.querySelector('button .AcquisitionButtons-module__listedPrice___3lkBo'),
        currency: 'ARS',
        showEmoji: false,
      });
    }
  );
}

/**
 * Tested on:
 * https://www.xbox.com/es-AR/games/halo-infinite
 */
function handleXboxGamesFeatured() {

  handleMutations(
    '#standard',
    'xbox--games-featured',
    (game) => {

      // Price Complements
      scrapper({
        priceElement: game.querySelector('.priceareaStandard').lastElementChild.lastElementChild,
        eventElement: game.querySelector('.priceareaStandard').lastElementChild.lastElementChild,
        currency: 'ARS',
        showEmoji: true,
      });
    }
  );
}

/**
 * Tested on:
 * https://www.xbox.com/es-ar/games/fortnite
 */
function handleXboxGamesFeaturedComplements() {

  handleMutations(
    '.c-carousel section.m-product-placement-item.context-software',
    'xbox--games-featured-complements',
    (game) => {

      // Price Complements
      scrapper({
        priceElement: game.querySelector('.pricing').lastElementChild.lastElementChild,
        eventElement: game.querySelector('.pricing').lastElementChild.lastElementChild,
        currency: 'ARS',
        showEmoji: true,
      });
    }
  );
}