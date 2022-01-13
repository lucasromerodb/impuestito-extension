/*
 * Append calculated price badge to each game card and popup
 * then append a badge to each game card
 *
 * Tested on:
 * https://www.epicgames.com/store/en-US/
*/
function handleEpicHero() {

  const gameCards = document.querySelectorAll('div[data-component="CarouselContentDesktop"] div[data-component="CarouselPrice"]');

  if (gameCards.length > 0) {
    for (const card of gameCards) {

      if (card.querySelector('.priceWithTaxesBadge')) {
        return;
      } else {
        const priceLabel = card.querySelector('span[data-component="Price"]')

        if (priceLabel) {
          const price = getPriceWithTaxes(card, 'span[data-component="Price"]', tax, 'US');
          drawBadge(price, card);
          card.classList.add('impuestito');
        }
      }
    }
  }
}

function handleEpicSwiperSlider() {

  const gameCards = document.querySelectorAll('div[data-component="DiscoverContainerDesktop"] .swiper-wrapper .swiper-slide');

  if (gameCards.length > 0) {
    for (const card of gameCards) {

      if (card.querySelector('.priceWithTaxesBadge')) {
        return;
      } else {
        const priceLayout = card.querySelector('div[data-component="PriceLayout"] > span');

        if (priceLayout) {
          const price = getPriceWithTaxes(priceLayout.children[priceLayout.children.length - 1], 'span[data-component="Text"]', tax, 'US');
          drawBadge(price, card);
          card.classList.add('impuestito');
        }
      }
    }
  }
}

function handleEpicVerticalList() {
  const gameCards = document.querySelectorAll('div[data-component="DiscoverContainerDesktop"] div[data-component="TopListCardItemLayout"]');

  if (gameCards.length > 0) {
    for (const card of gameCards) {

      if (card.querySelector('.priceWithTaxesBadge')) {
        return;
      } else {
        const priceLayout = card.querySelector('div[data-component="PriceLayout"] > span');

        if (priceLayout) {
          const price = getPriceWithTaxes(priceLayout.children[priceLayout.children.length - 1], 'span[data-component="Text"]', tax, 'US');
          const rightCol = card.querySelector('div[data-testid="price"][data-component="TopListCardItemContentWithBadging"]');
          drawBadge(price, rightCol);
          card.classList.add('impuestito');
        }
      }
    }
  }
}

function handleEpicGroupBreaker() {

  const gameCards = document.querySelectorAll('div[data-component="GroupedBreakerLayout"] div[data-component="BreakerOfferLinkVariant"]');

  if (gameCards.length > 0) {
    for (const card of gameCards) {

      if (card.querySelector('.priceWithTaxesBadge')) {
        return;
      } else {
        const priceLayout = card.querySelector('div[data-component="PriceLayout"] > span');

        if (priceLayout) {
          const price = getPriceWithTaxes(priceLayout.children[priceLayout.children.length - 1], 'span[data-component="Text"]', tax, 'US');
          drawBadge(price, card);
          card.classList.add('impuestito');
        }
      }
    }
  }
}

/*
 * Append calculated price badge to each game card and popup
 * then append a badge to each game card
 *
 * Tested on:
 * https://www.epicgames.com/store/en-US/browse
*/
function handleEpicBrowse() {

  const gameCards = document.querySelectorAll('section[data-component="BrowseGrid"] ul > li');

  if (gameCards.length > 0) {
    for (const card of gameCards) {

      if (card.querySelector('.priceWithTaxesBadge')) {
        return;
      } else {
        const priceLayout = card.querySelector('div[data-component="PriceLayout"] > span');

        if (priceLayout) {
          const price = getPriceWithTaxes(priceLayout.children[priceLayout.children.length - 1], 'span[data-component="Text"]', tax, 'US');
          drawBadge(price, card);
          card.classList.add('impuestito');
        }
      }
    }
  }
}


