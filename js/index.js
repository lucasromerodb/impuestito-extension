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
const href = window.location.href;

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

// Watch HTML mutations
function observeInit(targetElement, handleScrapperInit) {
  setTimeout(() => {
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    const observer = new MutationObserver(() => {
      if (impuestitoTaxes && impuestitoDollar) {
        handleScrapperInit();
      } else {
        console.error("🔴 Missing dollar or taxes value.");
        console.error("🔴 MISSING_DATA", { dollar: impuestitoDollar, taxes: impuestitoTaxes });
        return;
      }
    });

    if (targetElement) {
      observer.observe(targetElement, { subtree: true, attributes: true, childList: true });
    } else {
      console.error("🔴 Missing targetElement to init observer");
    }
  }, 500);
}

// Force updates
// function writeDOM(text) {
//   const div = document.createElement("div");
//   div.classList.add("impuestito-playground");
//   document.querySelector("body").insertAdjacentElement("beforeend", div);

//   const span = document.createElement("span");
//   span.innerHTML = text;
//   document.querySelector(".impuestito-playground").insertAdjacentElement("afterbegin", span);

//   setTimeout(() => {
//     document.querySelector(".impuestito-playground").remove();
//   }, 1000);
// }

function writeDOM() {
  const random = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;
  document.querySelector("body").classList.add(random);
  setTimeout(() => {
    document.querySelector("body").classList.remove(random);
  }, 1000);
}

writeDOM();

setTimeout(() => {
  writeDOM();
}, 5000);
