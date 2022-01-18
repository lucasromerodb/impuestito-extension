/**
 * PlayStation Web Store
 */
function handlePlaystationMutations() {

  if (someURL(['playstation'], hostname)) {

    if (!dollar) return;

    if (someURL(['/category', '/search'], pathname)) {
      handlePlaystationGrid();
    }

    if (someURL(['/pages', '/view'], pathname)) {
      handlePlaystationSlider();
    }

    if (someURL(['/games'], pathname)) {
      handlePlaystationGames();
      handlePlaystationGamesEditions();
    }

    if (someURL(['/ps-plus'], pathname)) {
      handlePlaystationPlus();
    }

    if (someURL(['/product', '/concept'], pathname)) {
      handlePlaystationProduct();
      handlePlaystationProductEditions();
      handlePlaystationProductComplements();
    }
  }
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
 * https://store.playstation.com/es-ar/category/024029c7-f61b-4bef-a4d7-06270ed12b56
*/
function handlePlaystationGrid() {

  const games = document.querySelectorAll('.psw-product-tile__details');

  if (games && games.length > 0) {
    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (game.className.includes('impuestito')) return;

      // Price
      gameScrapper({
        priceElement: game.lastElementChild.querySelector('.psw-m-r-3'),
        eventElement: game.lastElementChild.querySelector('.psw-m-r-3'),
        currency: 'US',
        showEmoji: true,
      })

      // Regular Price
      gameScrapper({
        priceElement: game.lastElementChild.querySelector('.psw-c-t-2'),
        eventElement: game.lastElementChild.querySelector('.psw-m-r-3'),
        currency: 'US',
        showEmoji: false,
      })

      game.classList.add('impuestito', 'playstation--grid');
    }
  }
}

/*
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
    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (game.className.includes('impuestito')) return;

      // Price
      gameScrapper({
        priceElement: game.lastElementChild.querySelector('.psw-m-r-3'),
        eventElement: game.lastElementChild.querySelector('.psw-m-r-3'),
        currency: 'US',
        showEmoji: true,
      })

      // Regular Price
      gameScrapper({
        priceElement: game.lastElementChild.querySelector('.psw-c-t-2'),
        eventElement: game.lastElementChild.querySelector('.psw-m-r-3'),
        currency: 'US',
        showEmoji: false,
      })

      game.classList.add('impuestito', 'playstation--slider');
    }
  }
}

/*
 * Tested on:
 * https://www.playstation.com/es-ar/ps-plus
 * https://www.playstation.com/es-ar/ps-plus/this-month-on-ps-plus/
*/
function handlePlaystationPlus() {

  const games = document.querySelectorAll('.cmp-experiencefragment--ps-plus-skus .box .automatedPricingCta .psw-label');

  if (games && games.length > 0) {
    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (game.className.includes('impuestito')) return;

      // Price
      gameScrapper({
        priceElement: game.querySelector('.psw-t-title-m'),
        eventElement: game.querySelector('.psw-t-title-m'),
        currency: 'US',
        showEmoji: true,
      })

      game.classList.add('impuestito', 'playstation--plus');
    }
  }
}

/*
 * Tested on:
 * https://store.playstation.com/es-ar/product/UP1004-CUSA03041_00-RDR2ULTMEDTNBUND
 * https://store.playstation.com/es-ar/product/UP2047-CUSA01164_00-PLAGUEOFFROGSPAC
 * https://store.playstation.com/es-ar/concept/10000649
*/
function handlePlaystationProduct() {

  const games = document.querySelectorAll('.pdp-cta');

  if (games && games.length > 0) {
    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (game.className.includes('impuestito')) return;

      for (let offerNum = 0; offerNum < 2; offerNum++) {

        // Price
        gameScrapper({
          priceElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#finalPrice"]`),
          eventElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#finalPrice"]`),
          currency: 'US',
          showEmoji: true,
        })

        // Regular Price
        gameScrapper({
          priceElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#originalPrice"]`),
          eventElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#finalPrice"]`),
          currency: 'US',
          showEmoji: false,
        })
      }

      game.classList.add('impuestito', 'playstation--product');
    }
  }

}

/*
 * Tested on:
 * https://store.playstation.com/es-ar/product/UP1004-CUSA03041_00-RDR2ULTMEDTNBUND
*/
function handlePlaystationProductEditions() {

  const games = document.querySelectorAll('.pdp-upsells article');

  if (games && games.length > 0) {
    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (game.className.includes('impuestito')) return;

      // Price
      gameScrapper({
        priceElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#finalPrice"]`),
        eventElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#finalPrice"]`),
        currency: 'US',
        showEmoji: true,
      })

      // Regular Price
      gameScrapper({
        priceElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#originalPrice"]`),
        eventElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#finalPrice"]`),
        currency: 'US',
        showEmoji: false,
      })

      game.classList.add('impuestito', 'playstation--product-editions');
    }
  }
}


/*
 * Tested on:
 * https://store.playstation.com/es-ar/product/UP1004-CUSA03041_00-RDR2ULTMEDTNBUND
*/
function handlePlaystationProductComplements() {

  const games = document.querySelectorAll('.pdp-add-ons [data-qa="add-ons"] li');

  if (games && games.length > 0) {
    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (game.className.includes('impuestito')) return;

      gameScrapper({
        priceElement: game.lastElementChild.querySelector(`[data-qa="add-ons-grid#${i}#price#display-price"]`),
        eventElement: game.lastElementChild.querySelector(`[data-qa="add-ons-grid#${i}#price#display-price"]`),
        currency: 'US',
        showEmoji: true,
      })

      game.classList.add('impuestito', 'playstation--product-complements');
    }
  }
}

/*
 * Tested on:
 * https://www.playstation.com/es-ar/games/god-of-war/
 * https://www.playstation.com/es-ar/games/horizon-zero-dawn/
*/
function handlePlaystationGames() {

  const games = document.querySelectorAll('.game-hero__title-content');

  if (games && games.length > 0) {
    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (game.className.includes('impuestito')) return;

      for (let offerNum = 0; offerNum < 2; offerNum++) {
        // Price
        gameScrapper({
          priceElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#finalPrice"]`),
          eventElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#finalPrice"]`),
          currency: 'US',
          showEmoji: true,
        })

        // Regular Price
        gameScrapper({
          priceElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#originalPrice"]`),
          eventElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#finalPrice"]`),
          currency: 'US',
          showEmoji: false,
        })
      }


      game.classList.add('impuestito', 'playstation--games');
    }
  }
}

/*
 * Tested on:
 * https://www.playstation.com/es-ar/games/god-of-war/
 * https://www.playstation.com/es-ar/games/ea-sports-fifa-22/
*/
function handlePlaystationGamesEditions() {

  const games = document.querySelectorAll('[data-qa="mfeUpsell"] article');

  if (games && games.length > 0) {
    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (game.className.includes('impuestito')) return;

      // Price
      gameScrapper({
        priceElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#finalPrice"]`),
        eventElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#finalPrice"]`),
        currency: 'US',
        showEmoji: true,
      })

      // Regular Price
      gameScrapper({
        priceElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#originalPrice"]`),
        eventElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#finalPrice"]`),
        currency: 'US',
        showEmoji: false,
      })

      game.classList.add('impuestito', 'playstation--product-editions');
    }
  }
}

