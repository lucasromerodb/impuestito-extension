/**
 * Epic Games Web Store
 */
function handleNintendoARMutations() {
  if (someURL(['nintendo.com.ar'], hostname)) {
    handleNintendoAllGamesArg();
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
 * https://store.nintendo.com.ar/
 */
function handleNintendoAllGamesArg() {

  handleMutations(
    '.category-product-item',
    'epic--hero',
    (game) => {

      // Price
      scrapper({
        priceElement: game.querySelector('.price'),
        eventElement: game.querySelector('.price'),
        currency: 'ARS',
        showEmoji: true,
      });
    }
  );
}