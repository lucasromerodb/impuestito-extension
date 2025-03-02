/**
 * Retrieves data from Chrome's local storage.
 *
 * @async
 * @function getServerData
 * @returns {Promise<*>} A promise that resolves to the data from storage if it exists, or null if no data is found or an error occurs.
 * @throws Will log an error message to the console if there is an issue retrieving the data.
 */
async function getServerData() {
  try {
    const response = await chrome.storage.local.get(["data"]);
    if (response.data) {
      console.log('❇️ DATA from Storage');
      return response.data;
    } else {
      console.warn('⚠️ No data found in storage');
      return null;
    }
  } catch (error) {
    console.error('❌ Error retrieving data from storage', error);
    return null;
  }
}

/**
 * @param  {string | object} gamesSelector
 * @param  {string} className
 * @param  {Function} callback
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
 * @param  {string} originalPrice
 * @param  {string} currency
 * @param  {object} data
 * @returns {number}
 */
function getNewPrice(originalPrice, currency = "ARS", data) {
  if (!data.taxes.defaultTotal || !data.bancos) return;

  const exceptions = ["Free", "FREE", "Gratuito", "Gratis", "Gratis+", "No disponible", "Prueba del juego", "--", "", "NaN", "Incluido", "Anunciados", "Ver juego"];
  const priceTextNaN = exceptions.some((exception) => exception.toLowerCase() === originalPrice.toLowerCase());
  const priceWithTaxes = (p) => (p + p * data.taxes.defaultTotal).toFixed(2);

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
    const newPrice = priceNumber * sanitizePricePunctuation(data.bancos);
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
  const newEmoji = showEmoji ? "🍄 " : "";

  priceElement.textContent = `${newEmoji}${priceFormatter(newPrice)}`;
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
  const cleanedNumber = price
    .trim()
    .replace(/ARS|US/gi, "")
    .replace(/\$+/gi, "")
    .replace(/\s+/gi, "")
    .replace(/\+/gi, "");

  return cleanedNumber;
}

/**
 * Converts price string with various decimal/thousands separators to a number
 * @param {string} price - Price string with decimal/thousands separators (e.g. "1.234,55", "1,234.55", "1234.55")
 * @returns {number} Price as a number (e.g. 1234.55)
 */
function sanitizePricePunctuation(price) {
  if (Boolean(price) === false) throw new Error('Price is required');
  if (typeof price === 'string') {
    if (price.trim() === '') throw new Error('Price is empty');
    if (price.match(/[a-zA-Z]/gi)) throw new Error('Price contains letters');
    if (price.match(/^\d+\.\d+\.\d+$/gi)) throw new Error('Price contains multiple decimal points');
    if (price.match(/^\d+\,\d+\,\d+$/gi)) throw new Error('Price contains multiple commas');

    const formatedPrice = price
    .trim()
    .replace(/(\d+)?[\.|\,]?(.+)[\,|\.](\d{1,2})/gi, "$1$2.$3");

    if (isNaN(+formatedPrice)) throw new Error('Price is not a number after formatting');

    console.log("\n💵 sanitizePricePunctuation", price, typeof price, +formatedPrice)
    return +formatedPrice;

  } else if (typeof price === 'number') {
    return price;
  } else {
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
