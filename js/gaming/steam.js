function handleSteamMutations() {
  if (someURL(["steampowered"], hostname)) {
    if (someURL(["app"], pathname)) {
      console.log("🟢 impuestito is working...");
      const element = document.querySelector(".leftcol.game_description_column");
      element && observeInit(element, steamScrapper);
    }
  }
}

function steamScrapper() {
  const targetArea = document.querySelector(".leftcol.game_description_column");
  const isAvailableOnGamePassExtension = document.querySelector(".available-on-game-pass-playground");

  if (targetArea && !isAvailableOnGamePassExtension && !document.querySelector(".impuestito-available-on-game-pass")) {
    const banner = document.createElement("div");
    banner.classList.add("impuestito-available-on-game-pass");
    banner.innerHTML =
      '<p>Usá la extensión <strong>Available on Game Pass</strong> para saber si este juego está disponible en Game Pass</p><a target="_blank" href="https://chromewebstore.google.com/detail/available-on-game-pass/ogkbpenenponleoakeomjjddhjbgdadc"><span>Obtener Extensión</span></a>';

    targetArea.insertAdjacentElement("afterbegin", banner);
  }
}

handleSteamMutations();
