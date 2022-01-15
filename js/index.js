// Get USD exchange rate
if (window.location.hostname.includes('playstation') || window.location.hostname.includes('epicgames')) {
  chrome.runtime.sendMessage('GET_DOLLAR_OFFICIAL', (response) => {
    dollar = response;
  })
}

const tax = {
  ganancias: 0.35,
  pais: 0.30,
}

let dollar;

// Watch HTML mutations
const observer = new MutationObserver(handleMutationsInit);
const observerOptions = { subtree: true, attributes: true };

observer.observe(document, observerOptions);

// Assign the correct method to handle the mutations based on website and region
function handleMutationsInit() {
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;

  // PlayStation
  if (hostname.includes('playstation') && dollar) {

    if (pathname.includes('/category') || pathname.includes('/search')) {
      handlePlaystationGrid();
    }

    if (pathname.includes('/pages')) {
      handlePlaystationSlider();
    }

    if (pathname.includes('/ps-plus')) {
      handlePlaystationPlus();
    }

    if (pathname.includes('/product') || pathname.includes('/concept')) {
      handlePlaystationProduct();
      handlePlaystationProductEditions();
      handlePlaystationProductComplements();
    }
  }

  // Xbox
  if (hostname.includes('xbox')) {

    if (pathname.includes('games/all-games')) {
      handleXboxAllGames();
    }
  }

  // XB Deals
  if (hostname.includes("xbdeals.net")) {

    if (pathname.includes('/ar-store')) {

      if (pathname.includes("/game/")) {
        handleXbDealsGamePage();
      } else {
        handleXbDealsFeatured();
        handleXbDealsDiscounts();
      }
    }
  }

  // Nintendo
  if (hostname.includes('nintendo')) {

    if (hostname.includes('.com.ar')) {
      handleNintendoAllGamesArg();
    }
  }

  // Epic
  if (hostname.includes('epicgames') && dollar) {
    if (pathname.includes('store') && !pathname.includes('browse') && !pathname.includes('/p/')) {

      handleEpicSwiperSlider();
      handleEpicVerticalList();
      handleEpicHero();
      handleEpicGroupBreaker();

    }

    if (pathname.includes('browse')) {
      handleEpicBrowse();
    }

    if (pathname.includes('/p/')) {
      handleEpicGamePage();
      handleEpicGamePageRelated();
    }
  }
}