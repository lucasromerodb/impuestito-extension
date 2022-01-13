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
  if (hostname.includes('playstation')) {

    if (pathname.includes('category')) {
      dollar && handlePlaystationCategory();
    }
  }

  // Xbox
  if (hostname.includes('xbox')) {

    if (pathname.includes('games/all-games')) {
      handleXboxAllGames();
    }
  }

  // Nintendo
  if (hostname.includes('nintendo')) {

    if (hostname.includes('.com.ar')) {
      handleNintendoAllGamesArg();
    }
  }

  // Epic
  if (hostname.includes('epicgames')) {
    if (pathname.includes('store') && !pathname.includes('browse') && !pathname.includes('/p/')) {
      if (dollar) {
        handleEpicSwiperSlider();
        handleEpicVerticalList();
        handleEpicHero();
        handleEpicGroupBreaker();
      }
    }

    if (pathname.includes('browse')) {
      dollar && handleEpicBrowse();
    }

    if (pathname.includes('/p/')) {
      dollar && handleEpicGamePage();
      dollar && handleEpicGamePageRelated();
    }
  }
}