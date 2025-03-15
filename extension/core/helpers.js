const logos = {
  impuestito: {
    name: "Impuestito",
    icon: `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="3.59476" cy="3.59476" r="2.90518" fill="#00BE5C"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.59472 7.63486C5.82603 7.63486 7.63486 5.82603 7.63486 3.59472C7.63486 3.03427 7.52075 2.50047 7.31448 2.0153L7.84933 1.48046C8.86282 0.466962 10.506 0.466964 11.5195 1.48046C12.533 2.49396 12.533 4.13716 11.5195 5.15065L5.15065 11.5195C4.13716 12.533 2.49396 12.533 1.48046 11.5195C0.466963 10.506 0.466963 8.86282 1.48046 7.84933L2.0153 7.31448C2.50048 7.52075 3.03427 7.63486 3.59472 7.63486Z" fill="#00BE5C"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.10034 11.174C7.63143 11.865 8.46631 12.3104 9.40522 12.3104C11.0097 12.3104 12.3104 11.0097 12.3104 9.40522C12.3104 8.46631 11.865 7.63143 11.174 7.10034L7.10034 11.174Z" fill="#00BE5C"/>
          </svg>`,
  }
}
/**
 * Retrieves data from Chrome's local storage.
 *
 * @async
 * @function getServerData
 * @returns {Promise<*>} A promise that resolves to the data from storage if it exists, or null if no data is found or an error occurs.
 * @throws Will log an error message to the console if there is an issue retrieving the data.
 */
async function getServerData() {
  // sync: is used to store or get data across devices
  // local: is used to store or get data like localstorage
  const responseSync = await chrome.storage.sync.get(["userConfig","market"]);
  const responseLocal = await chrome.storage.local.get(["impuestito", "gamepass"]);

  if (responseSync.userConfig && responseLocal.impuestito && responseLocal.gamepass && responseSync.market) {
    // console.log('❇️ DATA from Storage', response);

    // TODO: refactor the server response
    // NOTE: this is a temporary solution to normalize data from the server
    return {
      dollar: responseLocal.impuestito.dollar,
      taxes: responseLocal.impuestito.taxes,
      province: responseLocal.impuestito.province,
      market: responseSync.market, // name, lang, region, tax
      gamepass: responseLocal.gamepass, // gamepass games
      userConfig: responseSync.userConfig,
    };
  } else {
    console.warn('🐞 No data found in storage, trying again...');
    getServerData();
    return null;
  }
}

/**
 * @param  {string | object} gamesSelector
 * @param  {string} className
 * @param  {function} callback
 */
function handleMutations(gamesSelector, className, callback) {
  const games = document.querySelectorAll(gamesSelector);

  if (games && games.length > 0) {
    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (game.className.includes("impuestito")) return;

      callback(game, i);

      game.classList.add("impuestito", className);
    }
  }
}

/**
 * Checks if the given element has already been scanned by looking for the "impuestito" class name.
 *
 * @param {Element} e - The DOM element to check.
 * @returns {boolean} - Returns true if the element's class name includes "impuestito", otherwise false.
 */
const alreadyScanned = (e) => e.className.includes("impuestito")

/**
 * Checks if the given element has already been processed.
 *
 * This function determines if the provided element has a class name
 * that includes "impuestito-done", indicating that it has already
 * been processed.
 *
 * @param {HTMLElement} e - The element to check.
 * @returns {boolean} - Returns true if the element has been processed, otherwise false.
 */
const alreadyProcessed = (e) => e.className.includes("impuestito-done")

/**
 * @param  {string} originalPrice
 * @param  {string} currency
 * @param  {object} data
 * @returns {number}
 */
function getNewPrice(originalPrice, currency = "ARS", data) {
  if (!data.taxes.ganancias || !data.userConfig.selectedProvince) return;

  const exceptions = ["Free", "FREE", "Gratuito", "Gratis", "Gratis+", "No disponible", "Prueba del juego", "--", "", "NaN", "Incluido", "Anunciados", "Ver juego", "Coming Soon", "Available", "Under"];
  const priceTextNaN = exceptions.some((exception) => exception.toLowerCase() === originalPrice.toLowerCase());
  const provinceTax = data.userConfig.selectedProvince ? data.province[data.userConfig.selectedProvince].tax : data.province[data.province["AR-C"]].tax;
  const priceWithTaxes = (p) => (p + p * (data.taxes.iva + data.taxes.ganancias + provinceTax)).toFixed(2);

  if (priceTextNaN) {
    // console.log("👁️ 1 getNewPrice: priceTextNaN", priceTextNaN);
    return 0;
  }

  const priceNumber = sanitizePricePunctuation(sanitizePriceSigns(originalPrice));
  // console.log("👁️ 2 priceNumber", priceNumber);

  if (priceNumber === 0) {
    // console.log("👁️ 3 getNewPrice: priceNumber is 0");
    return 0;
  }

  if (currency === "US") {
    const newPrice = priceNumber * sanitizePricePunctuation(data.dollar.bancos);
    // console.log("👁️ 4 getNewPrice: newPrice", newPrice);
    return priceWithTaxes(newPrice);
  }

  // console.log("👁️ 5 getNewPrice: priceWithTaxes", priceWithTaxes(priceNumber));
  return priceWithTaxes(priceNumber);
}

/**
 * @param  {object} priceElement
 * @param  {object} eventElement
 * @param  {string} originalPrice
 * @param  {number} newPrice
 * @param  {boolean} showEmoji
 */
function replacePrice(priceElement, eventElement = priceElement, originalPrice, newPrice, showEmoji = true) {
  const originalEmoji = showEmoji ? "❌ " : "";
  // const newEmoji = showEmoji ? "❇️ " : "";
  const newEmoji = showEmoji ? logos.impuestito.icon : "";

  priceElement.innerHTML = `${newEmoji}${priceFormatter(newPrice)}`;
  priceElement.classList.add("priceWithTaxes");
  priceElement.setAttribute("title", `El valor original es ${originalPrice}`);

  // eventElement.addEventListener("mouseenter", (e) => {
  //   e.preventDefault();
  //   priceElement.setAttribute("title", "Precio original");
  //   priceElement.textContent = `${originalEmoji}${originalPrice}`;
  // });

  // eventElement.addEventListener("mouseleave", (e) => {
  //   e.preventDefault();
  //   priceElement.setAttribute("title", "Precio (AR$) con impuestos incluidos");
  //   priceElement.textContent = `${newEmoji}${priceFormatter(newPrice)}`;
  // });
}

/**
 * @param  {object} {priceElement
 * @param  {object} eventElement
 * @param  {string} currency
 * @param  {boolean} showEmoji
 * @param  {boolean} isDiscount}
 */
async function scrapper({ priceElement, eventElement, currency, showEmoji, isDiscount = false }) {
  const data = await getServerData();

  if (priceElement && data) {
    isDiscount ? priceElement.classList.add("price-discount") : priceElement.classList.add("price-regular");
    const originalPrice = priceElement.textContent;
    // console.log("✨ scrapper: originalPrice", { originalPrice });
    const newPrice = getNewPrice(originalPrice, currency, data);
    // console.log("✨ scrapper: newPrice", { newPrice });
    newPrice && replacePrice(priceElement, eventElement, originalPrice, newPrice, showEmoji);
  }
}

/**
 * @param  {number} price
 * @param  {object} targetDOMElement
 */
function drawBadge(price, targetDOMElement) {
  const badge = document.createElement("p");
  badge.innerText = price === 0 ? " Gratis" : `AR${priceFormatter(price)}`;
  badge.setAttribute("title", "Este es el precio real que vas a pagar (incluye impuestos)");
  badge.classList.add("priceWithTaxesBadge");

  targetDOMElement.appendChild(badge);
}

/**
 * @param  {number} price
 * @param  {string} format
 * @param  {string} currency
 * @returns {string}
 */
function priceFormatter(price, format = "es-AR", currency = "ARS") {
  const formatter = new Intl.NumberFormat(format, {
    style: "currency",
    currency: currency,
  });

  return formatter.format(price);
}


 /**
 * Removes currency symbols and extra spaces from a price string
 * @param {string} price - Price string with currency symbol (e.g. "US$ 1,222.43", "ARS$ 1,222.43")
 * @returns {string} Price string without currency symbol (e.g. "1,222.43")
 */
function sanitizePriceSigns(price) {
  // Remove leading and trailing whitespace from the price string
  const cleanedNumber = price
    .trim()
    // Remove occurrences of "ARS" or "US" (case insensitive)
    .replace(/ARS|MSRP|US|Ahorra|Under|under|con|Xbox|Game|Pass|:/gi, "")
    // Remove all dollar signs
    .replace(/\$+/gi, "")
    // Remove all whitespace characters
    .replace(/\s+/gi, "")
    // Remove all plus signs
    .replace(/\+/gi, "")
    // Remove occurrences of "/mes"
    .replace(/\s?\/mes/gi, "")
    .trim();

  return cleanedNumber;
}

/**
 * Converts price string with various decimal/thousands separators to a number
 * @param {string} price - Price string with decimal/thousands separators (e.g. "1.234,55", "1,234.55", "1234.55")
 * @returns {number} Price as a number (e.g. 1234.55)
 */
function sanitizePricePunctuation(price) {
  if (Boolean(price) === false) {
    console.warn('🐞 Price is required:', price, typeof price);
    throw new Error('Price is required')
  };
  if (typeof price === 'string') {
    if (price.trim() === '') {
      console.warn('🐞 Price is empty:', price, typeof price);
      throw new Error('Price is empty')
    };
    if (price.match(/[a-zA-Z]/gi)) {
      console.warn('🐞 Price contains letters:', price, typeof price);
      throw new Error('Price contains letters')
    };
    if (price.match(/^\d+\.\d+\.\d+$/gi)) {
      console.warn('🐞 Price contains multiple decimal points:', price, typeof price);
      throw new Error('Price contains multiple decimal points')
    };
    if (price.match(/^\d+\,\d+\,\d+$/gi)) {
      console.warn('🐞 Price contains multiple commas:', price, typeof price);
      throw new Error('Price contains multiple commas')
    };

    const formatedPrice = price
    .trim()
    .replace(/(\d+)?[\.|\,]?(.+)[\,|\.](\d{1,2})/gi, "$1$2.$3");

    if (isNaN(+formatedPrice)) {
      console.warn('🐞 Price is not a number after formatting:', price, typeof price);
      throw new Error('Price is not a number after formatting')
    };

    // console.log("\n💵 sanitizePricePunctuation", price, typeof price, +formatedPrice)
    return +formatedPrice;

  } else if (typeof price === 'number') {
    return price;
  } else {
    console.warn('🐞 Price is not a string or number:', price, typeof price);
    throw new Error('Price is not a string or number');
  }
}

/**
 * @param  {array} arr - Array of strings
 * @param  {string} url - URL string
 */
function someURL(arr, url) {
  if (!arr || arr.length === 0) return false;
  if (!url) return false;
  return arr.some((w) => url.includes(w));
}
