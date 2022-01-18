/**
 * Epic Games Web Store
 */
function handleEpicMutations() {

  if (someURL(['epicgames'], hostname)) {

    if (!dollar) return;

    if (someURL(['store'], pathname)) {
      if (!pathname.includes('browse') && !pathname.includes('/p/')) {
        handleEpicHero();
        handleEpicSwiperSlider();
        handleEpicVerticalList();
        handleEpicGroupBreaker();
      }
    }

    if (someURL(['browse'], pathname)) {
      handleEpicBrowse();
    }

    if (someURL(['/p/'], pathname)) {
      handleEpicGamePage();
      handleEpicGamePageRelated();
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

/**
 * TODO:
 * This file deserves a refactor to
 * optimize code quality methods
 * There are a lot of code smells
 * Avoid repeating code
 */

/*
 * Tested on:
 * https://www.epicgames.com/store/en-US/
*/
function handleEpicHero() {

  const games = document.querySelectorAll('[data-component="CarouselContentDesktop"] [data-component="CarouselPrice"]');

  if (games && games.length > 0) {
    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (game.className.includes('impuestito')) return;

      // Price
      gameScrapper({
        priceElement: game.querySelector('span[data-component="Price"]'),
        eventElement: game.querySelector('span[data-component="Price"]'),
        currency: 'US',
        showEmoji: true,
      });

      game.classList.add('impuestito', 'epic--hero');
    }
  }
}

/*
 * Tested on:
 * https://www.epicgames.com/store/en-US/
*/
function handleEpicSwiperSlider() {

  const games = document.querySelectorAll('.swiper-container .swiper-slide [data-component="PriceLayout"]');

  if (games && games.length > 0) {
    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (game.className.includes('impuestito')) return;

      // Price
      gameScrapper({
        priceElement: game.lastElementChild.lastElementChild.lastElementChild,
        eventElement: game.lastElementChild.lastElementChild.lastElementChild,
        currency: 'US',
        showEmoji: true,
      });

      // Discount Price
      gameScrapper({
        priceElement: game.querySelector('[data-component="PDPDiscountedFromPrice"]'),
        eventElement: game.lastElementChild.lastElementChild.lastElementChild,
        currency: 'US',
        showEmoji: false,
      });

      game.classList.add('impuestito', 'epic--hero');
    }
  }
}

/*
 * Tested on:
 * https://www.epicgames.com/store/en-US/
*/
function handleEpicVerticalList() {
  const games = document.querySelectorAll('[data-component="DiscoverContainerDesktop"] [data-component="TopListCardItemLayout"] [data-component="PriceLayout"]');

  if (games && games.length > 0) {
    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (game.className.includes('impuestito')) return;

      // Price
      gameScrapper({
        priceElement: game.lastElementChild.lastElementChild.lastElementChild,
        eventElement: game.lastElementChild.lastElementChild.lastElementChild,
        currency: 'US',
        showEmoji: true,
      });

      // Discount Price
      gameScrapper({
        priceElement: game.querySelector('[data-component="PDPDiscountedFromPrice"]'),
        eventElement: game.lastElementChild.lastElementChild.lastElementChild,
        currency: 'US',
        showEmoji: false,
      });

      game.classList.add('impuestito', 'epic--vertical-list');
    }
  }
}

/*
 * Tested on:
 * https://www.epicgames.com/store/en-US/
*/
function handleEpicGroupBreaker() {

  const games = document.querySelectorAll('[data-component="GroupedBreakerLayout"] [data-component="BreakerOfferLinkVariant"] [data-component="PriceLayout"]');

  if (games && games.length > 0) {
    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (game.className.includes('impuestito')) return;

      // Price
      gameScrapper({
        priceElement: game.lastElementChild.lastElementChild.lastElementChild,
        eventElement: game.lastElementChild.lastElementChild.lastElementChild,
        currency: 'US',
        showEmoji: true,
      });

      // TODO: TEST
      // PENDING CASE: Regular Price discount
      // Could be a breaking bug

      game.classList.add('impuestito', 'epic--group-breaker');
    }
  }
}

/*
 * Tested on:
 * https://www.epicgames.com/store/en-US/browse
*/
function handleEpicBrowse() {

  const games = document.querySelectorAll('section[data-component="BrowseGrid"] ul > li [data-component="PriceLayout"]');

  if (games.length > 0) {
    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (game.className.includes('impuestito')) return;

      gameScrapper({
        priceElement: game.lastElementChild.lastElementChild.lastElementChild,
        eventElement: game.lastElementChild.lastElementChild.lastElementChild,
        currency: 'US',
        showEmoji: true,
      });

      // Discount Price
      gameScrapper({
        priceElement: game.querySelector('[data-component="PDPDiscountedFromPrice"]'),
        eventElement: game.lastElementChild.lastElementChild.lastElementChild,
        currency: 'US',
        showEmoji: false,
      });

      game.classList.add('impuestito', 'epic--browse');
    }
  }
}

/*
 * Tested on:
 * https://www.epicgames.com/store/en-US/p/god-of-war
 * https://www.epicgames.com/store/en-US/p/away-the-survival-series
 * https://www.epicgames.com/store/en-US/p/neko-ghost-jump
 * https://www.epicgames.com/store/en-US/p/league-of-legends
*/
function handleEpicGamePage() {
  const games = document.querySelectorAll('[data-component="PDPSidebarLayout"] [data-component="CatalogOfferSidebarPrice"] [data-component="PriceLayout"]');

  if (games && games.length > 0) {
    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (game.className.includes('impuestito')) return;

      // Price
      gameScrapper({
        priceElement: game.lastElementChild.lastElementChild.lastElementChild,
        eventElement: game.lastElementChild.lastElementChild.lastElementChild,
        currency: 'US',
        showEmoji: true,
      });

      // Regular Price
      gameScrapper({
        priceElement: game.querySelector('[data-component="PDPDiscountedFromPrice"]'),
        eventElement: game.lastElementChild.lastElementChild.lastElementChild,
        currency: 'US',
        showEmoji: false,
      });

      game.classList.add('impuestito', 'epic--game-page');
    }
  }
};


/**
 * Tested on:
 * https://www.epicgames.com/store/en-US/p/control
 */
function handleEpicGamePageRelated() {
  const games = document.querySelectorAll('[data-component="PDPRelatedOfferCardLayout"] [data-component="PriceLayout"]');

  if (games && games.length > 0) {
    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (game.className.includes('impuestito')) return;

      // Price
      gameScrapper({
        priceElement: game.lastElementChild.lastElementChild.lastElementChild,
        eventElement: game.lastElementChild.lastElementChild.lastElementChild,
        currency: 'US',
        showEmoji: true,
      });

      // Regular Price
      gameScrapper({
        priceElement: game.querySelector('[data-component="PDPDiscountedFromPrice"]'),
        eventElement: game.lastElementChild.lastElementChild.lastElementChild,
        currency: 'US',
        showEmoji: false,
      });

      game.classList.add('impuestito', 'epic--game-page-related');
    }
  }
};


