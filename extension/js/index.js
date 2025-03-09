const hostname = window.location.hostname;
const pathname = window.location.pathname;
const href = window.location.href;

function logWelcomeMessage({ store }) {
  const logo = `
    11317     1111
  13333333   3333331
  333333333  3333333
  13333333   333333
    13331   333331
          133331
   33333333331   131
  1333333331   13333
  13333331   1333331
    3331     13333
  `
  console.log(`\n\n\n${logo}\n✅ Estás usando la extensión de impuestito v${chrome.runtime.getManifest().version} (funcionando en ${store}).\n❇️ Visitá https://impuestito.org para más cálculos e información de compras en el exterior y suscripciones.\n\n\n\n\n\n`);
}

/**
 * Debounce function to limit the rate at which a function can fire.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {Function} - The debounced function.
 */
function debounce(func, wait = 300) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Watch HTML mutations
function observeInit(targetElement, handleScrapperInit, options = { subtree: true, attributes: true, childList: true }) {
  if (!targetElement) {
    console.error("🔴 Missing targetElement to scrap");
    return;
  }

  if (!handleScrapperInit) {
    console.error("🔴 Missing handleScrapperInit function");
    return;
  }

  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  const observer = new MutationObserver(debounce((mutations) => {
    mutations.length && handleScrapperInit();
  }, 100)); // Adjust the debounce delay as needed

  observer.observe(targetElement, { subtree: options.subtree, attributes: options.attributes, childList: options.childList });
}

// "matches": [
//   "*://*.playstation.com/*",
//   "*://*.xbox.com/*",
//   "*://*.nintendo.com/*",
//   "*://*.epicgames.com/*",
//   "*://*.gog.com/*",
//   "*://*.ubisoft.com/*",
//   "*://*.ea.com/*",
//   "*://*.xbdeals.net/*",
//   "*://*.psdeals.net/*",
//   "*://*.ntdeals.net/*",
//   "*://*.dekudeals.com/*",
//   "*://*.steampowered.com/*",
//   "*://*.humblebundle.com/*",
//   "*://*.greenmangaming.com/*",
//   "*://*.battle.net/*",
//   "*://*.amazon.com/*"
//   "*://*.tiendamia.com/*"
//   "*://*.aliexpress.com/*"
// ],