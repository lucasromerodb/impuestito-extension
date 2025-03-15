const devices = {
  "xbox-one": {
    name: "Xbox One",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="1em" height="1em" class="device-icon"><path d="M2048 512v896H0V512h2048zm-128 128H128v256h768v128H128v256h1792V640zm-320 384q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19z"></path></svg>',
  },
  "xbox-series": {
    name: "Xbox Series X|S",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="1em" height="1em" class="device-icon"><path d="M256 320q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45zm1792 1523q0 57-19 103t-69 78q-15 10-34 17t-38 7q-35 0-64-25t-57-57-53-64-55-42q-9-4-21-4t-24-1h-236q-23 0-44 14t-41 36-40 46-41 47-44 35-48 15q-20 0-37-6t-34-17q-48-32-68-78t-21-102v-24q0-12 2-24 1-23 9-58t21-76 29-83 34-82 33-70 32-51q0-36 31-56 13-9 37-16t50-13 52-9 42-3q16 0 27 2t20 6 20 10 23 13h164q15-7 24-13t17-10 20-6 29-2q18 0 43 3t50 8 49 13 39 17q14 10 21 24t10 32q12 12 27 39t30 63 31 75 28 78 22 68 13 50q9 47 9 93zm-128 2q0-35-8-73-5-24-16-61t-25-76-29-75-26-59l-8-16q-4-8-9-15-7-8-12-12t-9-8-9-10-8-18q-21-7-42-9t-45-5q-14 6-22 11t-18 11-19 8-28 3h-166q-17 0-27-3t-20-7-18-11-22-12q-23 0-44 4t-44 10q-2 20-14 27t-23 21q-5 7-8 14t-8 16q-15 31-33 76t-34 93-27 94-11 80q0 20 4 39t21 32q28-25 48-49t38-45 36-38 41-29 55-19 77-7h192q46 0 78 7t55 19 40 30 34 38 38 44 50 49q17-11 21-30t4-39zM896 1553V128H128v1792h128v-896h128v896h455q12 68 52 128H0V0h1024v1270q-10 14-14 28t-11 28l-8 14q-4 7-9 14-28 47-48 97t-38 102zm608-82q14 0 23 9t9 23q0 14-9 23t-23 9q-14 0-23-9t-9-23q0-14 9-23t23-9z"></path></svg>',
  },
  "xbox-windows": {
    name: "PC",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="1em" height="1em" class="device-icon"><path d="M2048 1536h-640v128h256v128h-640v-128h256v-128H896v256H0V128h896v512h1152v896zm-128-128V768H768v640h1152zM768 1664v-128H256v-128h384v-128H256v-128h384V640h128V256H128v1408h640zM640 384v128H256V384h384z"></path></svg>',
  },
  "xbox-cloud": {
    name: "Cloud",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="1em" height="1em" class="device-icon"><path d="M1661 896q80 0 150 30t123 81 83 122 31 151q0 80-30 149t-82 122-123 83-149 30H512q-106 0-199-40t-163-109-110-163-40-200q0-106 40-199t109-163 163-110 200-40q46 0 93 9 37-62 90-111t117-83 133-53 143-18q111 0 209 39t175 107 125 163 64 203zm3 640q53 0 99-20t82-55 55-81 20-100q0-53-20-99t-55-82-81-55-100-20h-128v-64q0-93-35-174t-96-143-142-96-175-35q-70 0-135 21t-119 59-97 91-67 120q-75-35-158-35-80 0-149 30t-122 82-83 123-30 149q0 80 30 149t82 122 122 83 150 30h1152z"></path></svg>',
  },
};

const headerText = {
  available: "This game is available on Game Pass and playable on the following platforms",
  leaving: "This game is leaving Game Pass soon. Give it a last try!",
  coming: "This game is coming to Game Pass soon. Can't wait?",
};

const GamePassLogo =
  '<svg width="167" height="28" viewBox="0 0 167 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="game-pass-logo"><path d="M14.4058 11.239H14.4548C18.746 14.4231 26.1391 22.3116 23.8893 24.5356C21.2636 26.769 17.8939 28 14.4058 28C10.9177 28 7.54801 26.769 4.9223 24.5356C2.6725 22.3116 10.0472 14.3992 14.3568 11.239C14.3726 11.2336 14.3899 11.2336 14.4058 11.239ZM21.9092 2.0507C19.6493 0.709537 17.0532 0 14.4058 0C11.7584 0 9.16228 0.709537 6.90237 2.0507C6.89375 2.05956 6.88894 2.0713 6.88894 2.0835C6.88894 2.0957 6.89375 2.10743 6.90237 2.11629C6.90638 2.12125 6.91151 2.12526 6.91735 2.12802C6.92319 2.13078 6.92959 2.13221 6.93608 2.13221C6.94258 2.13221 6.94898 2.13078 6.95482 2.12802C6.96066 2.12526 6.96579 2.12125 6.9698 2.11629C9.75907 1.52003 13.9951 3.90507 14.3997 4.11376H14.461C14.8104 3.87525 19.1016 1.55581 21.8663 2.14014C21.8754 2.14853 21.8875 2.1532 21.9 2.1532C21.9126 2.1532 21.9246 2.14853 21.9337 2.14014C21.9433 2.13499 21.9509 2.12688 21.9551 2.11708C21.9594 2.10729 21.9602 2.09639 21.9574 2.08611C21.9546 2.07582 21.9483 2.06675 21.9396 2.06034C21.9308 2.05392 21.9202 2.05053 21.9092 2.0507ZM4.32153 4.01836L4.2541 4.06606C1.77529 6.46247 0.27576 9.65304 0.0344471 13.0443C-0.206866 16.4356 0.826463 19.7967 2.94223 22.5024C2.94223 22.5024 2.9974 22.5382 3.02192 22.5024C3.04644 22.4666 3.02192 22.4606 3.02192 22.4308C1.91847 19.1335 7.53378 11.1019 10.4334 7.76882C10.4386 7.75536 10.4386 7.74054 10.4334 7.72708C10.439 7.71165 10.439 7.69482 10.4334 7.67938C6.05639 3.44595 4.56061 3.87525 4.32153 4.01836ZM18.3598 7.69727C18.3542 7.7127 18.3542 7.72954 18.3598 7.74497C18.3564 7.75869 18.3564 7.77299 18.3598 7.78671C21.2594 11.1436 26.8747 19.1514 25.7774 22.4487C25.7698 22.4603 25.7657 22.4737 25.7657 22.4875C25.7657 22.5012 25.7698 22.5147 25.7774 22.5262C25.788 22.534 25.8009 22.5382 25.8142 22.5382C25.8275 22.5382 25.8404 22.534 25.851 22.5262C27.9789 19.8216 29.0207 16.4554 28.7815 13.0577C28.5423 9.65993 27.0384 6.46335 24.5514 4.06606C24.5338 4.04698 24.5131 4.03086 24.4901 4.01836C24.2448 3.87525 22.7797 3.44595 18.3598 7.69727ZM61.4558 5.80117H58.4642L51.7209 22.6455H54.4673L56.1409 18.2809H63.8159L65.4895 22.6455H68.1991L61.4558 5.80117ZM56.95 16.0389L59.9416 8.32334L62.9393 16.0389H56.95ZM50.2987 13.7731V22.6455H47.8098V20.4393C47.2031 21.2588 46.3962 21.9186 45.462 22.3593C44.4389 22.8122 43.3245 23.0363 42.2007 23.0152C41.0491 23.0371 39.9048 22.8344 38.8352 22.4189C37.8358 22.0025 36.947 21.3704 36.2359 20.5705C35.4814 19.7606 34.9055 18.8089 34.544 17.774C34.1481 16.6213 33.9553 15.4117 33.9739 14.1965C33.9602 12.9811 34.155 11.772 34.5501 10.6189C34.9169 9.58431 35.4992 8.63436 36.2604 7.82845C36.9973 7.04742 37.9042 6.43629 38.9148 6.03967C40.006 5.62483 41.1703 5.42225 42.3417 5.44341C44.2387 5.37582 46.1021 5.94417 47.6198 7.05331C48.9909 8.13384 49.882 9.68596 50.1087 11.3881V11.4179H47.393C47.1862 10.3479 46.5708 9.39357 45.6704 8.74669C44.7125 8.07356 43.5536 7.72574 42.3723 7.7569C41.5937 7.73103 40.8194 7.87877 40.1085 8.18882C39.3977 8.49886 38.7692 8.96299 38.2712 9.54567C37.174 10.8986 36.6245 12.5955 36.7264 14.3157C36.6268 16.0357 37.1761 17.7319 38.2712 19.0858C38.782 19.6661 39.4198 20.128 40.1379 20.4375C40.856 20.747 41.6362 20.8964 42.4214 20.8746C43.8355 20.8704 45.1932 20.3341 46.2099 19.378C46.7083 18.9529 47.1094 18.4307 47.3872 17.8452C47.6649 17.2598 47.8131 16.624 47.8221 15.9793H42.734V13.7731H50.2987ZM92.6526 8.11465V12.9921H101.235V15.1445H92.6526V20.332H102.381V22.6455H90.0105V5.80117H102.381V8.11465H92.6526ZM87.3622 5.80117V22.6455H84.812V9.27736C84.4871 10.2135 84.0458 11.3762 83.5063 12.7416L79.5952 22.6455H77.3944L73.4404 12.7595C72.9745 11.567 72.5393 10.3745 72.1592 9.34295V22.6455H69.609V5.80117H73.2381L76.7875 14.745C77.4986 16.5338 78.0872 18.1258 78.5347 19.4138C79.0619 17.8873 79.6565 16.2357 80.3063 14.5065L83.7331 5.78924L87.3622 5.80117ZM120.741 7.23219C119.526 6.22148 117.955 5.70853 116.358 5.80117H109.002V22.6455H111.65V16.4384H116.377C117.973 16.5311 119.544 16.0181 120.76 15.0074C121.285 14.504 121.695 13.8987 121.963 13.2309C122.231 12.5631 122.352 11.8479 122.317 11.1317C122.351 10.4105 122.228 9.69045 121.957 9.01852C121.685 8.34658 121.271 7.73789 120.741 7.23219ZM111.632 8.04906H116.309C117.202 7.99204 118.082 8.27664 118.761 8.84209C119.053 9.14513 119.278 9.50295 119.422 9.89361C119.567 10.2843 119.628 10.6995 119.601 11.1138C119.637 11.533 119.581 11.9547 119.438 12.3514C119.294 12.7481 119.065 13.1107 118.767 13.4154C118.085 13.9754 117.206 14.2555 116.315 14.1965H111.638L111.632 8.04906ZM151.57 17.9708C151.598 18.6822 151.45 19.3897 151.138 20.034C150.827 20.6782 150.361 21.2404 149.78 21.6736C148.591 22.568 146.93 23.0211 144.833 23.0211C142.553 23.0211 140.757 22.5083 139.494 21.5066C138.844 20.9612 138.332 20.2783 137.996 19.5103C137.661 18.7423 137.51 17.9097 137.557 17.0764H140.199C140.175 17.6039 140.272 18.1299 140.484 18.6159C140.697 19.1018 141.018 19.5354 141.425 19.8848C142.437 20.5789 143.665 20.9117 144.901 20.8269C145.932 20.8867 146.957 20.637 147.837 20.1114C148.172 19.8775 148.441 19.5653 148.618 19.2037C148.796 18.842 148.878 18.4426 148.855 18.0424C148.87 17.7153 148.801 17.3898 148.655 17.0951C148.508 16.8005 148.288 16.5461 148.015 16.3549C147.071 15.8134 146.032 15.4493 144.95 15.2817L143.472 14.9776C141.997 14.7631 140.606 14.175 139.439 13.2723C138.981 12.856 138.622 12.3472 138.388 11.7817C138.154 11.2161 138.05 10.6076 138.084 9.99883C138.065 9.35498 138.206 8.71622 138.494 8.13623C138.782 7.55624 139.209 7.05196 139.739 6.66574C141.048 5.77965 142.622 5.34132 144.214 5.41956C146.47 5.41956 148.193 5.90253 149.333 6.84462C149.905 7.32967 150.361 7.93187 150.666 8.60809C150.971 9.28432 151.119 10.0178 151.098 10.7561H148.505C148.506 10.3057 148.408 9.86035 148.219 9.44927C148.03 9.03819 147.754 8.67072 147.408 8.37104C146.764 7.87019 145.704 7.6138 144.263 7.6138C143.361 7.55391 142.461 7.76182 141.682 8.21005C141.396 8.4006 141.165 8.65866 141.009 8.96005C140.854 9.26145 140.78 9.59631 140.793 9.93324C140.772 10.2622 140.832 10.5913 140.97 10.8925C141.108 11.1936 141.319 11.4578 141.584 11.6624C142.477 12.222 143.482 12.59 144.533 12.7416L146.035 13.0457C148.003 13.4571 149.437 14.0534 150.326 14.8345C150.753 15.2396 151.085 15.7294 151.3 16.2707C151.515 16.8119 151.607 17.3918 151.57 17.9708ZM166.976 17.9708C167.003 18.6822 166.855 19.3897 166.544 20.034C166.232 20.6782 165.767 21.2404 165.186 21.6736C163.996 22.568 162.335 23.0211 160.233 23.0211C157.958 23.0211 156.162 22.5083 154.893 21.5066C153.624 20.5049 152.974 19.0083 152.956 17.0764H155.604C155.58 17.6039 155.678 18.1299 155.89 18.6159C156.102 19.1018 156.423 19.5354 156.83 19.8848C157.843 20.5789 159.07 20.9117 160.306 20.8269C161.335 20.8878 162.359 20.6379 163.236 20.1114C163.572 19.8782 163.842 19.5663 164.021 19.2046C164.2 18.8429 164.282 18.4432 164.26 18.0424C164.275 17.7153 164.207 17.3898 164.06 17.0951C163.913 16.8005 163.693 16.5461 163.42 16.3549C162.477 15.8134 161.437 15.4493 160.355 15.2817L158.878 14.9776C157.401 14.763 156.008 14.175 154.838 13.2723C154.378 12.8571 154.017 12.3488 153.781 11.7832C153.544 11.2176 153.439 10.6085 153.471 9.99883C153.452 9.35431 153.593 8.71488 153.882 8.13469C154.172 7.5545 154.6 7.05063 155.132 6.66574C156.44 5.77883 158.015 5.34041 159.607 5.41956C161.869 5.41956 163.592 5.90253 164.732 6.84462C165.305 7.32967 165.76 7.93187 166.065 8.60809C166.37 9.28432 166.518 10.0178 166.498 10.7561H163.892C163.89 10.3061 163.791 9.86158 163.602 9.45088C163.414 9.04018 163.138 8.67239 162.795 8.37104C162.151 7.87019 161.091 7.6138 159.644 7.6138C158.744 7.55475 157.846 7.76265 157.069 8.21005C156.783 8.4006 156.552 8.65866 156.396 8.96005C156.241 9.26145 156.166 9.59631 156.18 9.93324C156.159 10.2622 156.219 10.5913 156.357 10.8925C156.495 11.1936 156.706 11.4578 156.971 11.6624C157.864 12.222 158.869 12.59 159.92 12.7416L161.422 13.0457C163.39 13.4571 164.824 14.0534 165.713 14.8345C166.147 15.2364 166.486 15.7248 166.707 16.2662C166.928 16.8076 167.026 17.3891 166.994 17.9708H166.976ZM130.194 5.80117H127.203L120.459 22.6455H123.206L124.879 18.2809H132.567L134.24 22.6455H136.987L130.194 5.80117ZM125.719 16.0389L128.717 8.32334L131.708 16.0389H125.719Z" fill="white"/></svg>';

async function drawPageUI(targetPosition, targetElement, config) {
  const { game, availability, updatedAt, options, hasSteamcito } = config;

  const badge = (device) => `<div class="page_game-pass--badge">${device.icon || ""}<span>${device.name || ""}</span></div>`;

  const one = game.platforms.one ? badge(devices["xbox-one"]) : "";
  const series = game.platforms.series ? badge(devices["xbox-series"]) : "";
  const pc = game.platforms.windows ? badge(devices["xbox-windows"]) : "";
  const cloud = game.platforms.cloud ? badge(devices["xbox-cloud"]) : "";
  const date = new Date(updatedAt);

  const content = {
    availability: `<div class="header">${headerText[availability]}</div>`,
    gamepass: `<div class="content">${GamePassLogo}${game.EAPlay ? '<span class="ultimate">ULTIMATE</span>' : ""}`,
    badges: `<div class="playable-badges">${one + series + pc + cloud}</div>`,
    updateInfo: `Updated at: ${date}`,
    author: `<a href="https://twitter.com/lukekix_gg" target="_blank">Developed by Lukekix</a>`,
    chromeLinkGamePass: `<a href="https://chrome.google.com/webstore/detail/available-on-game-pass/ogkbpenenponleoakeomjjddhjbgdadc" target="_blank" class="extension">Available on Game Pass v${chrome.runtime.getManifest().version} »</a>`,
  };

  const changeRegionButton = `<button class="region-change">(change)</button>`;

  const banner = `
  <div class="game-pass--ui page_game-pass--banner-wrapper">
    <div class="page_game-pass--banner">
      ${content.availability}
      ${content.gamepass}
      ${content.badges}
      <div class="footer">
        <div class="gp-ms-store--button" title="Calculado por impuestito.org">
          <span class="store">Cargando precio con impuestos incluidos desde Microsoft Store...</span>
        </div>
      </div>
    </div>

  </div>
  `;

  targetElement.insertAdjacentHTML(targetPosition, banner);

  // SHOW MENU
  const changeRegionButtonElement = document.querySelector(".page_game-pass--banner .region-change");
  changeRegionButtonElement && changeRegionButtonElement.addEventListener("click", () => toggleMenu(true));

  // MICROSOFT STORE BUTTON
  // This Game Pass API is Open Source and you can host on your own! https://github.com/lucasromerodb/xbox-store-api
  const responseXboxStore = await fetch(`${chrome.runtime.getManifest().web_accessible_resources[0].resources[1]}/api/gamepass/search/price/${game.id}/${options.market.region}`, {});
  const dataXboxStore = await responseXboxStore.json();
  console.log("DATA: ", dataXboxStore);
  const price = dataXboxStore.price && { MSRP: dataXboxStore.price.MSRP, SalePrice: dataXboxStore.price.SalePrice };

  const provinceTax = options.userConfig.selectedProvince ? options.province[options.userConfig.selectedProvince].tax : options.province[options.province["AR-C"]].tax;
  const priceWithTaxes = (p) => (p + p * (options.taxes.iva + options.taxes.ganancias + provinceTax)).toFixed(2);

  if (price && hasSteamcito && options.market.region === "ar") {

    const priceMSRP = dataXboxStore.price.MSRP ? sanitizePricePunctuation(sanitizePriceSigns(dataXboxStore.price.MSRP)) : null;
    const priceSalePrice = dataXboxStore.price.SalePrice ? sanitizePricePunctuation(sanitizePriceSigns(dataXboxStore.price.SalePrice)) : null;

    price.MSRP = priceMSRP ? priceFormatter(priceWithTaxes(priceMSRP)) : null;
    price.SalePrice = priceSalePrice ? priceFormatter(priceWithTaxes(priceSalePrice)) : null;
  }

  console.log("PRICE: ", price, "MARKET: ", options.market);

  const storeLink =
    price && (price.SalePrice || price.MSRP)
      ? `<a href="https://www.xbox.com/${options.market.lang}-${options.market.region}/games/store/game/${game.id}" target="_blank" class="store">
          ${price.SalePrice ? "En oferta" : "Comprar"} a ${logos.impuestito.icon} <strong>${
          price.SalePrice ? price.SalePrice : price.MSRP
        }</strong> en Microsoft Store — Precio final con impuestos incluidos</a>`
      : `<a href="https://www.xbox.com/${options.market.lang}-${options.market.region}/games/store/game/${game.id}" target="_blank" class="store">Comprar en Microsoft Store</a>`;

  const msStoreButtonContainerElement = document.querySelector(".gp-ms-store--button");
  msStoreButtonContainerElement.innerHTML = storeLink;
}

function clearTitle(title) {
  return title
    .replace(/Standard Edition\b/gi, "")
    .replace(/Xbox Edition\b/gi, "")
    .replace(/Xbox One Edition\b/gi, "")
    .replace(/Xbox One & Xbox Series X\|S\b/gi, "")
    .replace(/Xbox One & Xbox Series X \| S\b/gi, "")
    .replace(/Xbox One\b|^Xbox Series X\|S\b/gi, "")
    .replace(/^Buy\b|^Pre-Purchase\b/gi, "")
    .replace(/:|-|®|™|'|’|\./gi, "")
    .replace(/\s+(?=\s)/gi, "")
    .trim()
    .toLowerCase();
}

function targetElementValidator({ games, element, insertPosition, targetElement, type, options }) {
  if (!element.classList.contains("game-pass")) {
    const gameTitle = type === "regular" ? element.querySelector("h1").innerText : element.innerText;

    // This is only for Argentina
    const hasSteamcito = document.querySelector(".menu-steamcito");

    const available = games.all.find((g) => clearTitle(g.title) === clearTitle(gameTitle));
    const leaving = games.leaving.find((g) => clearTitle(g.title) === clearTitle(gameTitle));
    const coming = games.coming.find((g) => clearTitle(g.title) === clearTitle(gameTitle));

    if (available || leaving || coming) {
      element.classList.add("game-pass");

      if (type === "regular") {
        element.querySelector(".game_area_purchase_game").classList.add("gp-game_area_purchase_game");
      }

      if (leaving) {
        element.classList.add("gp-leaving");
        type === "fallback" && document.querySelector(".game_description_column").classList.add("gp-fallback", "gp-leaving");
        const config = { game: leaving, availability: "leaving", updatedAt: games.updated_at, hasSteamcito, options };
        drawPageUI(insertPosition, targetElement, config);
      } else {
        if (available) {
          element.classList.add("gp-available");
          type === "fallback" && document.querySelector(".game_description_column").classList.add("gp-fallback", "gp-available");
          const config = { game: available, availability: "available", updatedAt: games.updated_at, hasSteamcito, options };
          drawPageUI(insertPosition, targetElement, config);
        }
      }

      if (coming) {
        element.classList.add("gp-coming");
        type === "fallback" && document.querySelector(".game_description_column").classList.add("gp-fallback", "gp-coming");
        const config = { game: coming, availability: "coming", updatedAt: games.updated_at, hasSteamcito, options };
        drawPageUI(insertPosition, targetElement, config);
      }
    }
  }
}

function handlePageMutations(games = {}, options = {}) {
  const banner = document.querySelector(".game-pass--ui");

  // Main targets (buying option titles)
  const elements = document.querySelectorAll(".game_area_purchase_game_wrapper");

  if (games.all && games.all.length > 0 && !banner) {
    if (elements.length > 0) {
      for (const element of elements) {
        const handleConfig = {
          games,
          element,
          insertPosition: "beforebegin",
          targetElement: element.querySelector(".game_area_purchase_game"),
          type: "regular",
          options,
        };

        targetElementValidator(handleConfig);
      }
    }
  }

  // Fallback target (main title)
  const appHubAppName = document.getElementById("appHubAppName");
  const gamePass = document.querySelector(".game-pass");

  if (games.all && games.all.length > 0 && !gamePass) {
    if (appHubAppName) {
      const handleConfig = {
        games,
        element: appHubAppName,
        insertPosition: "afterbegin",
        targetElement: document.querySelector(".leftcol.game_description_column"),
        type: "fallback",
        options,
      };
      targetElementValidator(handleConfig);
      document.querySelector(".page_content").classList.add("gp-fallback");
    }
  }
}

/**
 * TODO: ISSUES
 *
 * TODO: Update notifier!
 * TODO: How Long To Beat integration!
 * TODO: a way to report a missing game if it doesn't have a banner
 */
