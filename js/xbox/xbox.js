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
 */

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



