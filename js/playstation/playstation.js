/*
 * Calculate final price with taxesAppend calculated price badge to each game card and popup
 * then append a badge to each game card
 *
 * Tested on:
 * https://store.playstation.com/es-ar/category/024029c7-f61b-4bef-a4d7-06270ed12b56
*/
function handlePlaystationCategory() {

  const gameCards = document.querySelectorAll('.psw-product-tile__details');

  if (gameCards.length > 0) {
    for (const card of gameCards) {
      if (card.className.includes('impuestito') === false) {

        const price = getPriceWithTaxes(card, '.psw-m-r-3', tax, 'US');
        drawBadge(price, card);
        card.classList.add('impuestito');

      }
    }
  }
}


