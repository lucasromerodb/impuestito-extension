/**
 * Microsoft Xbox Web Store
 */
function handleXboxMutations() {
  // Xbox
  if (someURL(['xbox.com'], hostname)) {

    if (someURL(['games/all-games'], pathname)) {
      handleXboxAllGames();
    }
  }
}

/**
 * PAGES TO TEST
 *
 * Grid games (all games)
 *
 * https://www.xbox.com/es-ar/games/all-games
 *
 * Individual game page
 *
 * https://www.xbox.com/es-ar/games/store/dragon-ball-xenoverse-2/BX03760D0QGN
 * https://www.xbox.com/es-ar/games/store/grand-theft-auto-iv/BRQ2SCZCTXF2
 * https://www.xbox.com/es-ar/games/store/lego-los-increbles/BZP3R43F8DNH
 * https://www.xbox.com/es-ar/games/store/tom-clancys-rainbow-six-extraction/9P53VF7859PW
 * https://www.xbox.com/es-ar/games/store/psychonauts/C5HHPG1TXDNG
 *
 * Featured game
 *
 * https://www.xbox.com/es-ar/games/fortnite
 *
 * Game Pass featured page
 *
 * https://www.xbox.com/es-AR/xbox-game-pass?xr=shellnav
 * https://www.xbox.com/es-AR/xbox-game-pass?xr=shellnav#join
 *
 * Gold
 * https://www.xbox.com/es-AR/live/gold?xr=shellnav#dealswithgold
 * https://www.xbox.com/es-AR/live/gold/upgrade
 *
 * XB Deals
 * https://xbdeals.net/ar-store
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
        showEmoji: true,
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
        showEmoji: true,
      });
    }
  );
}



