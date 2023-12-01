/**
 * XB Deals Web Store
 */
function handlePSDealsMutations() {
  if (someURL(["psdeals.net"], hostname) && someURL(["/ar-store"], pathname)) {
    if (someURL(["/game/"], pathname)) {
      handlePSDealsGamePage();
      handlePSDealsGamePageStats();
    } else {
      handlePSDealsGrid();
    }
  }
}

/**
 * @param  {object} game
 */
function psdealsScrapper(game) {
  // Regular Price
  scrapper({
    priceElement: game.querySelector(".game-collection-item-regular-price"),
    eventElement: game.querySelector(".game-collection-item-regular-price"),
    currency: "US",
    showEmoji: true,
  });

  // Bonus Price
  scrapper({
    priceElement: game.querySelector(".game-collection-item-bonus-price"),
    eventElement: game.querySelector(".game-collection-item-bonus-price"),
    currency: "US",
    showEmoji: true,
  });

  // Price
  scrapper({
    priceElement: game.querySelector(".game-collection-item-discount-price"),
    eventElement: game.querySelector(".game-collection-item-discount-price"),
    currency: "US",
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
function handlePSDealsGrid() {
  handleMutations(".game-collection-item-details-price", "xbdeals--grid", (game) => {
    psdealsScrapper(game);
  });
}

/*
 * Tested on:
 * https://xbdeals.net/ar-store/game/872909/forza-horizon-5-1993-jaguar-xj220s
 */
function handlePSDealsGamePage() {
  handleMutations(".game-buy-button-right p[itemprop=offers]", "xbdeals--game-page", (game) => {
    psdealsScrapper(game);
  });
}

/*
 * Tested on:
 * https://xbdeals.net/ar-store/game/872909/forza-horizon-5-1993-jaguar-xj220s
 */
function handlePSDealsGamePageStats() {
  handleMutations(".game-stats.game-stats-price-history .game-stats-col-number-big", "xbdeals--game-page-stats", (game) => {
    // Price
    scrapper({
      priceElement: game,
      eventElement: game,
      currency: "US",
      showEmoji: true,
    });
  });
}
