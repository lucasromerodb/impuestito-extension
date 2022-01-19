/**
 * XB Deals Web Store
 */
function handleXBDealsMutations() {

  if (someURL(['xbdeals.net'], hostname) && someURL(['/ar-store'], pathname)) {

    if (someURL(['/game/'], pathname)) {
      handleXBDealsGamePage();
      handleXBDealsGamePageStats();
    } else {
      handleXBDealsGrid();
    }
  }
}


/**
 * @param  {object} game
 */
function xbdealsScrapper(game) {
  // Regular Price
  scrapper({
    priceElement: game.querySelector('.game-collection-item-regular-price'),
    eventElement: game.querySelector('.game-collection-item-regular-price'),
    currency: 'ARS',
    showEmoji: true,
  });

  // Bonus Price
  scrapper({
    priceElement: game.querySelector('.game-collection-item-bonus-price'),
    eventElement: game.querySelector('.game-collection-item-bonus-price'),
    currency: 'ARS',
    showEmoji: true,
  });

  // Price
  scrapper({
    priceElement: game.querySelector('.game-collection-item-discount-price'),
    eventElement: game.querySelector('.game-collection-item-discount-price'),
    currency: 'ARS',
    showEmoji: true,
  });
}

/**
 * HOW IT WORKS?
 *
 * Find a game item list
 * Then get the original price and their discount if exists
 * Then replace both with the new price
 * Then add a click event to switch between original and new prices
*/

/*
 * Tested on:
 * https://xbdeals.net/ar-store
 * https://xbdeals.net/ar-store/all-games
 * https://xbdeals.net/ar-store/discounts
 * https://xbdeals.net/ar-store/search?type=addons&search_query=forza
*/
function handleXBDealsGrid() {

  handleMutations(
    '.game-collection-item-details-price',
    'xbdeals--grid',
    (game) => { xbdealsScrapper(game) }
  );
}

/*
 * Tested on:
 * https://xbdeals.net/ar-store/game/872909/forza-horizon-5-1993-jaguar-xj220s
*/
function handleXBDealsGamePage() {
  handleMutations(
    '.game-buy-button-right p[itemprop=offers]',
    'xbdeals--game-page',
    (game) => { xbdealsScrapper(game) }
  );
}

/*
 * Tested on:
 * https://xbdeals.net/ar-store/game/872909/forza-horizon-5-1993-jaguar-xj220s
*/
function handleXBDealsGamePageStats() {
  handleMutations(
    '.game-stats.game-stats-price-history .game-stats-col-number-big',
    'xbdeals--game-page-stats',
    (game) => {

      // Price
      scrapper({
        priceElement: game,
        eventElement: game,
        currency: 'ARS',
        showEmoji: true,
      })
    }
  );
}

