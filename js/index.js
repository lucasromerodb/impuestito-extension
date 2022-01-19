const devMode = false;

const dollarMock = {
  data: {
    "compra": "103,46",
    "venta": "109,46",
    "fecha": "17/01/2022 - 17:49",
    "variacion": "0,23%",
    "class-variacion": "up"
  }
}

const tax = {
  ganancias: 0.35,
  pais: 0.30,
}

let dollar;

const hostname = window.location.hostname;
const pathname = window.location.pathname;

// Get USD exchange rate
if (window.location.hostname.includes('playstation') || window.location.hostname.includes('epicgames')) {
  if (devMode) {
    console.warn('--- RUNNING IN DEV MODE ---');
    dollar = dollarMock;
  } else {
    chrome.runtime.sendMessage('GET_DOLLAR_OFFICIAL', (response) => {
      dollar = response;
    })
  }
}

// Watch HTML mutations
const observer = new MutationObserver(handleMutationsInit);
const observerOptions = { subtree: true, attributes: true };

observer.observe(document, observerOptions);

// Assign the correct method to handle the mutations based on website and region
function handleMutationsInit() {

  setTimeout(() => {
    handlePlaystationMutations();
    handleEpicMutations();
    handleXBDealsMutations();


    // Xbox
    if (hostname.includes('xbox')) {

      if (pathname.includes('games/all-games')) {
        handleXboxAllGames();
      }
    }

  }, 1000);

  // Nintendo
  if (hostname.includes('nintendo')) {

    if (hostname.includes('.com.ar')) {
      handleNintendoAllGamesArg();
    }
  }


}