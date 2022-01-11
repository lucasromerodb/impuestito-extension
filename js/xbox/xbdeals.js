
/**
 * Calculates the final prices with getPriceWithTaxes based on the prices found on the 
 * https://xbdeals.net/ website.
 * Then appends a badge to each game card.
 *
 * Tested on:
 * https://xbdeals.net/ar-store/
 */
function handleXbDeals() {
    handleXbDealsFeatured();
    handleXbDealsDiscounts();
    handleXbDealsGamePage();
}

/**
 * Calculates the final prices with getPriceWithTaxes based on the prices found on the 
 * home page of https://xbdeals.net/ website.
 * Then appends a badge to each game card.
 */
function handleXbDealsFeatured() {
    const gameCards = document.querySelectorAll('.game-collection-item-details-price');
    
    for (var i = 0; i < gameCards.length; i++) {
        const card = gameCards[i];

        if (card.className.includes('impuestito') === false) {
            const regularPriceCard = card.querySelector('.game-collection-item-regular-price');
            const bonusPriceCard = card.querySelector('.game-collection-item-bonus-price');
            const discountPriceCard = card.querySelector('.game-collection-item-discount-price');
    
            var price;
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

/**
 * Calculates the final prices with getPriceWithTaxes based on the prices found on the 
 * list of https://xbdeals.net/ website.
 * Then appends a badge to each game card.
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

/**
 * Calculates the final price with getPriceWithTaxes based on the price found on 
 * a game's page inside https://xbdeals.net/ website.
 * Then appends a badge to the game card.
 */
function handleXbDealsGamePage() {
    const card = document.querySelector('.game-buy-button-right p[itemprop=offers]');
    if (card && card.className.includes('impuestito') === false) {
        const regularPriceCard = card.querySelector('.game-collection-item-regular-price');
        const bonusPriceCard = card.querySelector('.game-collection-item-bonus-price');
        const discountPriceCard = card.querySelector('.game-collection-item-discount-price');

        var price;
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
            priceContainer.classList.add('col-xs-12');
            priceContainer.style.textAlign = "right";
            drawBadge(price, priceContainer);
            buyButtonContainer.appendChild(priceContainer);
            card.classList.add('impuestito');
        }

    }
}