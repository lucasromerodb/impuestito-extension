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
 * @param  {object} game
 */
function epicScrapper(game) {
  // Price
  scrapper({
    priceElement: game.lastElementChild.lastElementChild.lastElementChild,
    eventElement: game.lastElementChild.lastElementChild.lastElementChild,
    currency: 'US',
    showEmoji: true,
  });

  // Discount Price
  scrapper({
    priceElement: game.querySelector('[data-component="PDPDiscountedFromPrice"]'),
    eventElement: game.lastElementChild.lastElementChild.lastElementChild,
    currency: 'US',
    showEmoji: false,
  });
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
 * https://www.epicgames.com/store/en-US/
*/
function handleEpicHero() {

  handleMutations(
    '[data-component="CarouselContentDesktop"] [data-component="CarouselPrice"]',
    'epic--hero',
    (game) => {

      // Price
      scrapper({
        priceElement: game.querySelector('[data-component="Price"]'),
        eventElement: game.querySelector('[data-component="Price"]'),
        currency: 'US',
        showEmoji: true,
      });
    }
  );
}

/*
 * Tested on:
 * https://www.epicgames.com/store/en-US/
*/
function handleEpicSwiperSlider() {

  handleMutations(
    '.swiper-container .swiper-slide [data-component="PriceLayout"]',
    'epic--swiper-slider',
    (game) => { epicScrapper(game) }
  )
}

/*
 * Tested on:
 * https://www.epicgames.com/store/en-US/
*/
function handleEpicVerticalList() {

  handleMutations(
    '[data-component="DiscoverContainerDesktop"] [data-component="TopListCardItemLayout"] [data-component="PriceLayout"]',
    'epic--vertical-list',
    (game) => { epicScrapper(game) }
  );
}

/*
 * Tested on:
 * https://www.epicgames.com/store/en-US/
*/
function handleEpicGroupBreaker() {

  handleMutations(
    '[data-component="GroupedBreakerLayout"] [data-component="BreakerOfferLinkVariant"] [data-component="PriceLayout"]',
    'epic--group-breaker',
    (game) => {

      // Price
      scrapper({
        priceElement: game.lastElementChild.lastElementChild.lastElementChild,
        eventElement: game.lastElementChild.lastElementChild.lastElementChild,
        currency: 'US',
        showEmoji: true,
      });

      // TODO: TEST
      // PENDING CASE: Regular Price discount
      // Could be a breaking bug
    }
  )
}

/*
 * Tested on:
 * https://www.epicgames.com/store/en-US/browse
*/
function handleEpicBrowse() {

  handleMutations(
    'section[data-component="BrowseGrid"] ul > li [data-component="PriceLayout"]',
    'epic--browse',
    (game) => { epicScrapper(game) }
  );
}

/*
 * Tested on:
 * https://www.epicgames.com/store/en-US/p/god-of-war
 * https://www.epicgames.com/store/en-US/p/away-the-survival-series
 * https://www.epicgames.com/store/en-US/p/neko-ghost-jump
 * https://www.epicgames.com/store/en-US/p/league-of-legends
*/
function handleEpicGamePage() {

  handleMutations(
    '[data-component="PDPSidebarLayout"] [data-component="CatalogOfferSidebarPrice"] [data-component="PriceLayout"]',
    'epic--game-page',
    (game) => { epicScrapper(game) }
  );
};


/**
 * Tested on:
 * https://www.epicgames.com/store/en-US/p/control
 */
function handleEpicGamePageRelated() {

  handleMutations(
    '[data-component="PDPRelatedOfferCardLayout"] [data-component="PriceLayout"]',
    'epic--game-page-related',
    (game) => { epicScrapper(game) }
  );
};


