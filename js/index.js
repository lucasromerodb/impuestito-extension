let impuestitoData;

chrome.storage.local.get(["data"]).then((response) => {
  if (response.data) {
    impuestitoData = response.data;
  }
});

const hostname = window.location.hostname;
const pathname = window.location.pathname;
const href = window.location.href;


function writePlayground() {
  const div = document.createElement("div");
  div.classList.add("impuestito-playground");
  document.querySelector("body").insertAdjacentElement("beforeend", div);
}

writePlayground();

// Watch HTML mutations
async function observeInit(targetElement, handleScrapperInit) {
  if (!targetElement) {
    console.error("🔴 Missing targetElement to scrap");
    return;
  }

  if (!handleScrapperInit) {
    console.error("🔴 Missing handleScrapperInit function");
    return;
  }

  setTimeout(() => {
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    const observer = new MutationObserver(async () => {
      if (impuestitoData) {
        handleScrapperInit({ data: impuestitoData });
      }
    });

    observer.observe(targetElement, { subtree: true, attributes: true, childList: true });
  }, 1000);
}

function logWelcomeMessage({ store }) {
  console.log(`🟢 Estás usando impuestito v${chrome.runtime.getManifest().version} (funcionando en ${store}). Visitá https://impuestito.org para más cálculos e información de compras en el exterior y suscripciones.`);
}

