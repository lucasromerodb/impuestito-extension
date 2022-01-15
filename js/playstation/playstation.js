/*
 * Append calculated price badge to each game
 * then append a badge to each game
 *
 * Tested on:
 * https://store.playstation.com/es-ar/category/024029c7-f61b-4bef-a4d7-06270ed12b56
*/
function handlePlaystationCategory() {

  const games = document.querySelectorAll('.psw-product-tile__details');

  if (games.length > 0) {
    for (const game of games) {
      if (game.className.includes('impuestito') === false) {

        const priceElement = game.lastElementChild.querySelector('.psw-m-r-3');
        if (priceElement) {
          const originalPrice = priceElement.textContent;
          const newPrice = getNewPrice(priceElement, tax, 'US');
          newPrice && replacePrice(priceElement, priceElement, originalPrice, newPrice);
        }

        const priceElementDiscount = game.lastElementChild.querySelector('.psw-c-t-2');
        if (priceElementDiscount) {
          const originalPriceDiscount = priceElementDiscount.textContent;
          const newPriceDiscount = getNewPrice(priceElementDiscount, tax, 'US');
          newPriceDiscount && replacePrice(priceElementDiscount, priceElement, originalPriceDiscount, newPriceDiscount, false);
        }

        game.classList.add('impuestito', 'playstation');
      }
    }
  }
}


