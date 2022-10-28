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
 * @param  {number} taxes
 * @param  {string} currency
 * @returns {number}
 */
function getNewPrice(originalPrice, taxes, currency = "ARS") {
  const exceptions = ["Free", "FREE", "Gratuito", "Gratis", "Gratis+", "No disponible", "--", "", "NaN", "Incluido"];
  const priceTextNaN = exceptions.some((exception) => exception.toLowerCase() === originalPrice.toLowerCase());
  const priceWithTaxes = (p) => (p + p * taxes).toFixed(2);

  if (priceTextNaN) {
    return 0;
  }

  const priceNumber = sanitizePricePunctuation(sanitizePriceSigns(originalPrice));
  if (priceNumber === 0) {
    return 0;
  }

  if (currency === "US") {
    const priceNumber = sanitizePricePunctuation(sanitizePriceSigns(originalPrice));
    const newPrice = priceNumber * sanitizePricePunctuation(dollar.data.venta);
    return priceWithTaxes(newPrice);
  }

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
  priceElement.setAttribute("title", `Impuestos incluidos (el precio sin impuestos es ${originalPrice})`);

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
 * @param  {boolean} showEmoji}
 */
function scrapper({ priceElement, eventElement, currency, showEmoji }) {
  if (priceElement) {
    const originalPrice = priceElement.textContent;
    const newPrice = getNewPrice(originalPrice, tax, currency);
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
 * @param  {string} price
 * @returns {string}
 */
function sanitizePriceSigns(price) {
  /**
   * Tested on:
   *
   * ARS$ 1,222.43
   * US$ 1,222.43
   * $ 1,222.43
   *  ARS$ 1,222.43
   * ARS$1,222.43
   * ARS$ 1,222.43+
   * US$ 1,222.43+
   * $ 1,222.43+
   *  ARS$ 1,222.43 +
   * ARS$1,222.43 +
   * * ARS$ 1,222.43 +
   * US$ 1,222.43 +
   * $ 1,222.43 +
   *  ARS$ 1,222.43 +
   * ARS$1,222.43 +
   */
  return price.replace(/^\s*[a-zA-z]*?\$\s?(\d?\d?\W?\d+\W?\d?\d?)\s?\+?/gi, "$1");
}

/**
 * @param  {string} price
 * @returns {number}
 */
function sanitizePricePunctuation(price) {
  /**
   * Tested on:
   *
   * 1.234,55
   * 1,234.55
   * 1234,55
   * 1234.55
   * 111,22
   * 111.22
   * 11,22
   * 11.22
   * 1,22
   * 1.22
   * 1,2
   * 1.2
   */

  return +price.replace(/(\d+)?[\.|\,]?(.+)[\,|\.](\d{1,2})/gi, "$1$2.$3");
}

/**
 * @param  {array} arr
 */
function someURL(arr, url = pathname) {
  return arr.some((w) => url.includes(w));
}
