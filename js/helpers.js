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

  const exceptions = ["Free", "FREE", "Gratuito", "Gratis", "Gratis+", "No disponible", "Prueba del juego", "--", "", "NaN", "Incluido", "Anunciados"];
  const priceTextNaN = exceptions.some((exception) => exception.toLowerCase() === originalPrice.toLowerCase());
  const priceWithTaxes = (p) => (p + p * data.taxes.defaultTotal).toFixed(2);

  if (priceTextNaN) {
    console.log("👁️ 1 getNewPrice: priceTextNaN", priceTextNaN);
    return 0;
  }

  const priceNumber = sanitizePricePunctuation(sanitizePriceSigns(originalPrice));
  console.log("👁️ 2 priceNumber", priceNumber);

  if (priceNumber === 0) {
    console.log("👁️ 3 getNewPrice: priceNumber is 0");
    return 0;
  }

  if (currency === "US") {
    const newPrice = priceNumber * sanitizePricePunctuation(data.bancos);
    console.log("👁️ 4 getNewPrice: newPrice", newPrice);
    return priceWithTaxes(newPrice);
  }

  console.log("👁️ 5 getNewPrice: priceWithTaxes", priceWithTaxes(priceNumber));
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
function scrapper({ priceElement, eventElement, currency, showEmoji, isDiscount = false, data = {} }) {
  if (priceElement) {
    isDiscount ? priceElement.classList.add("price-discount") : priceElement.classList.add("price-regular");
    const originalPrice = priceElement.textContent;
    console.log("✨ scrapper: originalPrice", { originalPrice });
    const newPrice = getNewPrice(originalPrice, currency, data);
    console.log("✨ scrapper: newPrice", { newPrice });
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
  if (!price.trim()) return NaN;
  if (price.match(/[a-zA-Z]/gi)) return NaN;
  if (price.match(/^\d+\.\d+\.\d+$/gi)) return NaN;
  if (price.match(/^\d+\,\d+\,\d+$/gi)) return NaN;

  const cleanedPrice = price
    .trim()
    .replace(/(\d+)?[\.|\,]?(.+)[\,|\.](\d{1,2})/gi, "$1$2.$3");

  return isNaN(+cleanedPrice) ? NaN : +cleanedPrice;
}

/**
 * @param  {array} arr
 */
function someURL(arr, url = pathname) {
  return arr.some((w) => url.includes(w));
}
