/**
 * Calculate final price with taxesAppend calculated price badge to each game card and popup
 * then append a badge to each game card and popup preview
 *
 * Tested on:
 * https://www.xbox.com/es-ar/games/all-games
 */
function handleXboxAllGames() {
  const gameCards = document.querySelectorAll('.gameDiv');

  if (gameCards.length > 0) {
    for (const card of gameCards) {
      if (card.className.includes('impuestito') === false) {
        const price = getPriceWithTaxes(card, 'span[itemprop=price]', tax, 'ARS');
        drawBadge(price, card);
        drawBadge(price, card.querySelector('.popprice'));
        card.classList.add('impuestito');
      }
    }
  }
}

