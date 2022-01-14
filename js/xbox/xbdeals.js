/*
 * Append calculated price badge to each game card
 * then append a badge to each game card
 *
 * Tested on:
 * https://xbdeals.net/ar-store
 * https://xbdeals.net/ar-store/all-games
 * https://xbdeals.net/ar-store/discounts
 * https://xbdeals.net/ar-store/search?type=addons&search_query=forza
*/
function handleXbDealsFeatured() {
  const gameCards = document.querySelectorAll('.game-collection-item-details-price');

  for (var i = 0; i < gameCards.length; i++) {
    const card = gameCards[i];

    if (card.className.includes('impuestito') === false) {
      const regularPriceCard = card.querySelector('.game-collection-item-regular-price');
      const bonusPriceCard = card.querySelector('.game-collection-item-bonus-price');
      const discountPriceCard = card.querySelector('.game-collection-item-discount-price');

      let price;
      if (discountPriceCard) {
        price = getPriceWithTaxes(card, '.game-collection-item-discount-price', tax, 'ARS');
      } else if (bonusPriceCard) {
        price = getPriceWithTaxes(card, '.game-collection-item-bonus-price', tax, 'ARS');
      } else if (regularPriceCard) {
        price = getPriceWithTaxes(card, '.game-collection-item-regular-price', tax, 'ARS');
      }

      if (price !== undefined) {
        drawBadge(price, card);
        card.classList.add('impuestito');
      }
    }

  }
}

/*
 * Append calculated price badge to each game card
 * then append a badge to each game card
 *
 * Tested on:
 * https://xbdeals.net/ar-store
 * https://xbdeals.net/ar-store/all-games
 * https://xbdeals.net/ar-store/discounts
 * https://xbdeals.net/ar-store/search?type=addons&search_query=forza
*/
function handleXbDealsDiscounts() {
  const gameCards = document.querySelectorAll('.game-collection-item-details p[itemprop=offers]');

  for (var i = 0; i < gameCards.length; i++) {
    const card = gameCards[i];
    if (card.className.includes('impuestito') === false) {

      const price = getPriceWithTaxes(card, 'span[itemprop=price]', tax, 'ARS');
      drawBadge(price, card);
      card.classList.add('impuestito');

    }
  }
}

/*
 * Append calculated price badge to each game card
 * then append a badge to each game card
 *
 * Tested on:
 * https://xbdeals.net/ar-store/game/872909/forza-horizon-5-1993-jaguar-xj220s
*/
function handleXbDealsGamePage() {
  const card = document.querySelector('.game-buy-button-right p[itemprop=offers]');

  if (card && card.className.includes('impuestito') === false) {
    const regularPriceCard = card.querySelector('.game-collection-item-regular-price');
    const bonusPriceCard = card.querySelector('.game-collection-item-bonus-price');
    const discountPriceCard = card.querySelector('.game-collection-item-discount-price');

    let price;
    if (discountPriceCard) {
      price = getPriceWithTaxes(card, '.game-collection-item-discount-price', tax, 'ARS');
    } else if (bonusPriceCard) {
      price = getPriceWithTaxes(card, '.game-collection-item-bonus-price', tax, 'ARS');
    } else if (regularPriceCard) {
      price = getPriceWithTaxes(card, '.game-collection-item-regular-price', tax, 'ARS');
    }

    if (price !== undefined) {
      const buyButtonContainer = document.querySelector('.game-buy-button-href').parentElement.parentElement;
      const priceContainer = document.createElement('div');

      priceContainer.classList.add('col-xs-12'); // TODO: avoid own website styles
      priceContainer.style.textAlign = "right";

      drawBadge(price, priceContainer);
      buyButtonContainer.appendChild(priceContainer);
      card.classList.add('impuestito');
    }

  }
}