/*
 * Find a game item list
 * Then get the original price and their discount if exists
 * Then replace both with the new price
 * Then add a click event to switch between original and new prices
 *
 * Tested on:
 * https://store.playstation.com/es-ar/category/024029c7-f61b-4bef-a4d7-06270ed12b56
*/
function handlePlaystationGrid() {

  const games = document.querySelectorAll('.psw-product-tile__details');

  if (games && games.length > 0) {
    for (const game of games) {
      if (game.className.includes('impuestito') === false) {

        const priceElement = game.lastElementChild.querySelector('.psw-m-r-3');
        if (priceElement) {
          const originalPrice = priceElement.textContent;
          const newPrice = getNewPrice(originalPrice, tax, 'US');
          newPrice && replacePrice(priceElement, priceElement, originalPrice, newPrice);
        }

        const priceElementDiscount = game.lastElementChild.querySelector('.psw-c-t-2');
        if (priceElementDiscount) {
          const originalPriceDiscount = priceElementDiscount.textContent;
          const newPriceDiscount = getNewPrice(originalPriceDiscount, tax, 'US');
          newPriceDiscount && replacePrice(priceElementDiscount, priceElement, originalPriceDiscount, newPriceDiscount, false);
        }

        game.classList.add('impuestito', 'playstation--grid');
      }
    }
  }
}

/*
 * Find a game item list
 * Then get the original price and their discount if exists
 * Then replace both with the new price
 * Then add a click event to switch between original and new prices
 *
 * Tested on:
 * https://store.playstation.com/es-ar/pages/latest
 * https://store.playstation.com/es-ar/pages/collections
 * https://store.playstation.com/es-ar/pages/deals
 * https://store.playstation.com/es-ar/pages/ps5
 * https://store.playstation.com/es-ar/pages/subscriptions
*/
function handlePlaystationSlider() {

  const games = document.querySelectorAll('.psw-strand-scroller .psw-product-tile__details');

  if (games && games.length > 0) {
    for (const game of games) {
      if (game.className.includes('impuestito') === false) {

        const priceElement = game.lastElementChild.querySelector('.psw-m-r-3');
        if (priceElement) {
          const originalPrice = priceElement.textContent;
          const newPrice = getNewPrice(originalPrice, tax, 'US');
          newPrice && replacePrice(priceElement, priceElement, originalPrice, newPrice);
        }

        const priceElementDiscount = game.lastElementChild.querySelector('.psw-c-t-2');
        if (priceElementDiscount) {
          const originalPriceDiscount = priceElementDiscount.textContent;
          const newPriceDiscount = getNewPrice(originalPriceDiscount, tax, 'US');
          newPriceDiscount && replacePrice(priceElementDiscount, priceElement, originalPriceDiscount, newPriceDiscount, false);
        }

        game.classList.add('impuestito', 'playstation--slider');
      }
    }
  }
}

/*
 * Find a game item list
 * Then get the original price and their discount if exists
 * Then replace both with the new price
 * Then add a click event to switch between original and new prices
 *
 * Tested on:
 * https://www.playstation.com/es-ar/ps-plus
 * https://www.playstation.com/es-ar/ps-plus/this-month-on-ps-plus/
*/
function handlePlaystationPlus() {

  const games = document.querySelectorAll('.cmp-experiencefragment--ps-plus-skus .box .automatedPricingCta .psw-label');

  if (games && games.length > 0) {
    for (const game of games) {
      if (game.className.includes('impuestito') === false) {

        const priceElement = game.lastElementChild.querySelector('.psw-t-title-m');
        if (priceElement) {
          const originalPrice = priceElement.textContent;
          const newPrice = getNewPrice(originalPrice, tax, 'US');
          newPrice && replacePrice(priceElement, priceElement, originalPrice, newPrice);
        }

        game.classList.add('impuestito');
      }
    }
  }
}

/*
 * Find a game item list
 * Then get the original price and their discount if exists
 * Then replace both with the new price
 * Then add a click event to switch between original and new prices
 *
 * Tested on:
 * https://store.playstation.com/es-ar/product/UP1004-CUSA03041_00-RDR2ULTMEDTNBUND
 * https://store.playstation.com/es-ar/product/UP2047-CUSA01164_00-PLAGUEOFFROGSPAC
*/
function handlePlaystationProduct() {

  const games = document.querySelectorAll('.pdp-cta');

  if (games && games.length > 0) {
    for (const game of games) {
      if (game.className.includes('impuestito') === false) {

        for (let offerNum = 0; offerNum < 2; offerNum++) {

          const priceElement = game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#finalPrice"]`);
          if (priceElement) {
            const originalPrice = priceElement.textContent;
            const newPrice = getNewPrice(originalPrice, tax, 'US');
            newPrice && replacePrice(priceElement, priceElement, originalPrice, newPrice);
          }

          const priceElementDiscount = game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#originalPrice"]`);
          if (priceElementDiscount) {
            const originalPriceDiscount = priceElementDiscount.textContent;
            const newPriceDiscount = getNewPrice(originalPriceDiscount, tax, 'US');
            newPriceDiscount && replacePrice(priceElementDiscount, priceElement, originalPriceDiscount, newPriceDiscount, false);
          }
        }

        game.classList.add('impuestito');
      }
    }
  }
}

/*
 * Find a game item list
 * Then get the original price and their discount if exists
 * Then replace both with the new price
 * Then add a click event to switch between original and new prices
 *
 * Tested on:
 * https://store.playstation.com/es-ar/product/UP1004-CUSA03041_00-RDR2ULTMEDTNBUND
*/
function handlePlaystationProductEditions() {

  const games = document.querySelectorAll('.pdp-upsells article');

  if (games && games.length > 0) {
    for (const [i, game] of games.entries()) {
      if (game.className.includes('impuestito') === false) {

        const priceElement = game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#finalPrice"]`);
        if (priceElement) {
          const originalPrice = priceElement.textContent;
          const newPrice = getNewPrice(originalPrice, tax, 'US');
          newPrice && replacePrice(priceElement, priceElement, originalPrice, newPrice);
        }

        const priceElementDiscount = game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#originalPrice"]`);
        if (priceElementDiscount) {
          const originalPriceDiscount = priceElementDiscount.textContent;
          const newPriceDiscount = getNewPrice(originalPriceDiscount, tax, 'US');
          newPriceDiscount && replacePrice(priceElementDiscount, priceElement, originalPriceDiscount, newPriceDiscount, false);
        }

        game.classList.add('impuestito');
      }
    }
  }
}

/*
 * Find a game item list
 * Then get the original price and their discount if exists
 * Then replace both with the new price
 * Then add a click event to switch between original and new prices
 *
 * Tested on:
 * https://store.playstation.com/es-ar/product/UP1004-CUSA03041_00-RDR2ULTMEDTNBUND
*/
function handlePlaystationProductComplements() {

  const games = document.querySelectorAll('.pdp-add-ons [data-qa="add-ons"] li');

  if (games && games.length > 0) {
    for (const [i, game] of games.entries()) {
      if (game.className.includes('impuestito') === false) {

        const priceElement = game.lastElementChild.querySelector(`[data-qa="add-ons-grid#${i}#price#display-price"]`);
        if (priceElement) {
          const originalPrice = priceElement.textContent;
          const newPrice = getNewPrice(originalPrice, tax, 'US');
          newPrice && replacePrice(priceElement, priceElement, originalPrice, newPrice);
        }

        game.classList.add('impuestito');
      }
    }
  }
}

