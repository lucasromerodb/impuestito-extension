const tax = {
  ganancias: 0.35,
  pais: 0.30,
}

let dollar = {};

// Watch HTML mutations
const observer = new MutationObserver(handleMutationsInit);
const observerOptions = { subtree: true, attributes: true };

observer.observe(document, observerOptions);

// Assign the correct method to handle the mutations based on website and region
function handleMutationsInit() {
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;

  if (hostname.includes('playstation')) {

    chrome.runtime.sendMessage('GET_DOLLAR_OFFICIAL', (response) => {
      dollar = response;
    })

    if (pathname.includes('category')) {
      handlePlaystationCategory();
    }
  }

  if (hostname.includes('xbox')) {

    if (pathname.includes('games/all-games')) {
      handleXboxAllGames();
    }
  }

  if (hostname.includes('nintendo')) {

    if (hostname.includes('.com.ar')) {
      handleNintendoAllGamesArg();
    }
  }
}