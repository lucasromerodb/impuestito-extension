const devMode = false;

const impuestitoDollarMock = {
  data: {
    compra: "103,46",
    venta: "109,46",
    fecha: "17/01/2022 - 17:49",
    variacion: "0,23%",
    "class-variacion": "up",
  },
};

const impuestitoTaxesMock = {
  pais: 0.3,
  ganancias: 1,
  bienespersonales: 0.25,
  qatar: 0.05,
};

let impuestitoDollar = undefined;
let impuestitoTaxes = undefined;

const hostname = window.location.hostname;
const pathname = window.location.pathname;

// Get Taxes and USD exchange rate
if (devMode) {
  console.warn("--- RUNNING IN DEV MODE ---");
  impuestitoDollar = impuestitoDollarMock;
  impuestitoTaxes = impuestitoTaxesMock;
} else {
  chrome.runtime.sendMessage("GET_DOLLAR_OFFICIAL", (response) => {
    impuestitoDollar = response;
  });
  chrome.runtime.sendMessage("GET_TAXES", (response) => {
    impuestitoTaxes = response;
  });
}

// Assign the correct method to handle the mutations based on website and region
function handleMutationsInit() {
  setTimeout(() => {
    if (impuestitoTaxes && impuestitoDollar) {
      handlePlaystationMutations();
      handleEpicMutations();
      handleXBDealsMutations();
      handlePSDealsMutations();
      handleXboxMutations();
      handleNintendoARMutations();
    } else {
      console.warn("🔴 Missing dollar or taxes value.");
      console.warn("🔴 MISSING_DATA", { dollar: impuestitoDollar, taxes: impuestitoTaxes });
      return;
    }
  }, 1000);
}

// Watch HTML mutations
const observer = new MutationObserver(handleMutationsInit);
const observerOptions = { subtree: true, attributes: true };

observer.observe(document, observerOptions);
