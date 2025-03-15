// Changelog: https://lucasromerodb.notion.site/Available-on-Game-Pass-notes-0a1105a741c4454a99fb5d9927f6950d

// Assign the correct method to handle website mutations
async function handleMutationsInit() {
  // sync: is used to store or get data across devices
  // local: is used to store or get data like localstorage
  const responseSync = await chrome.storage.sync.get(["market", "userConfig"]);
  const responseLocal = await chrome.storage.local.get(["gamepass", "impuestito", "markets"]);

  if (responseLocal.gamepass && responseSync.market && responseSync.userConfig && responseLocal.impuestito && responseLocal.markets) {
    handlePageMutations(
      responseLocal.gamepass,
      {
        dollar: responseLocal.impuestito.dollar,
        taxes: responseLocal.impuestito.taxes,
        province: responseLocal.impuestito.province,
        market: responseSync.market, // name, lang, region, tax
        gamepass: responseLocal.gamepass, // gamepass games
        userConfig: responseSync.userConfig,
      }
    );
  }

  const menuElement = document.querySelector(".gp-menu");
  if (!menuElement) {
    responseLocal.markets && drawMenu(responseLocal.markets);

    const regionSelectElement = document.querySelector(".gp-menu select");
    regionSelectElement && regionSelectElement.addEventListener("change", (e) => {
      selectCountry(e.target.value);
    });
  }
}

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    toggleMenu(false);
  }
});

document.addEventListener("click", (e) => {
  const menuElement = document.querySelector(".gp-menu");
  let clickedElement = e.target; // clicked element

  if (menuElement && menuElement.classList.contains("visible")) {
    if (menuElement == clickedElement) {
      toggleMenu(false);
    }
  }
});

function writePlayground() {
  const div = document.createElement("div");
  div.classList.add("available-on-game-pass-playground");
  document.querySelector("body").insertAdjacentElement("beforeend", div);
}

if (someURL(["steampowered"], hostname)) {
  // initMenu("Epic Games Store");
  if (someURL(["app"], pathname)) {
    initMenu("Steam");
    writePlayground();
    handleMutationsInit();

    // Watch HTML mutations
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    const observer = new MutationObserver(handleMutationsInit);
    const observerOptions = { subtree: true, attributes: true };

    document.querySelector(".leftcol.game_description_column") && observer.observe(document.querySelector(".leftcol.game_description_column"), observerOptions); // STORE PAGE => https://store.steampowered.com/app/1294810/Redfall/
    document.querySelector("#wishlist_ctn") && observer.observe(document.querySelector("#wishlist_ctn"), observerOptions); // USER WISHLIST => https://store.steampowered.com/wishlist/id/USER/
    document.querySelector(".page_content .leftcol.large") && observer.observe(document.querySelector(".page_content .leftcol.large"), observerOptions); // SEARCH => https://store.steampowered.com/search/
  }
}
