/**
 * Calculate final price with taxesAppend calculated price badge to each game card and popup
 * then append a badge to each game card
 *
 * Tested on:
 * https://store.nintendo.com.ar/
 */
function handleNintendoAllGamesArg() {

  const gameCards = document.querySelectorAll('.category-product-item');

  if (gameCards.length > 0) {
    for (const card of gameCards) {
      if (card.className.includes('impuestito') === false) {

        const price = getPriceWithTaxes(card, '.price', tax, 'ARS');
        drawBadge(price, card.querySelector('.category-product-item-info'));
        card.classList.add('impuestito');

      }
    }
  }
}