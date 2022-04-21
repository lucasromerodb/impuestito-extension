/**
 * @param  {string} gamesSelector
 * @param  {string} className
 * @param  {Function} callback
 */
function handleMutations(gamesSelector, className, callback) {
  const games = document.querySelectorAll(gamesSelector);
  console.log("DEMO3",gamesSelector,games.length,games, className, callback)

  if (games && games.length > 0) {
    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (game.className.includes('impuestito')) return;

      callback(game, i);

      game.classList.add('impuestito', className);
    }
  }
}

/**
 * @param  {string} originalPrice
 * @param  {object} taxes
 * @param  {string} currency
 * @returns {number}
 */
function getNewPrice(originalPrice, taxes, currency = 'ARS') {
  const exceptions = ['Free', 'FREE', 'Gratuito', 'Gratis', 'Gratis+', 'No disponible', '--','Juégalo gratis','Más información'];
  const priceTextNaN = exceptions.some(exception => exception.toLowerCase() === originalPrice.toLowerCase());
  const priceWithTaxes = (p) => (p + p * (taxes.ganancias + taxes.pais)).toFixed(2)
  console.log("DEMO5",originalPrice, taxes, currency,priceTextNaN,priceWithTaxes)

  if (priceTextNaN) {
    return 0;
  }
  const priceNumber = sanitizePricePunctuation(sanitizePriceSigns(originalPrice));
  console.log("DEMO",originalPrice,sanitizePriceSigns(originalPrice),priceNumber)
  if (priceNumber === 0) {
    return 0;
  }

  if (currency === 'US') {
    const newPrice = priceNumber * sanitizePricePunctuation(dollar.data.venta);
    return priceWithTaxes(newPrice);
  }

  return priceWithTaxes(priceNumber);
}

/**
 * TODO: DEPRECATE THIS FUNCTION
 *
 * @param  {object} containerDOMElement
 * @param  {string} priceDOMElement
 * @param  {object} taxes
 * @param  {string} currency
 * @returns {number}
 */
function getPriceWithTaxes(containerDOMElement, priceDOMElement, taxes, currency = 'ARS') {
  const priceText = containerDOMElement.querySelector(priceDOMElement).textContent;
  const priceIsFree = priceText.includes('Free') || priceText.includes('FREE') || priceText.includes('Gratuito');
  const priceWithTaxes = (p) => (p + p * (taxes.ganancias + taxes.pais)).toFixed(2)

  if (priceIsFree) {
    return 0;
  }

  const price = sanitizePricePunctuation(sanitizePriceSigns(priceText));

  if (price === 0) {
    return 0;
  }

  if (currency === 'US') {
    const priceARS = price * sanitizePricePunctuation(dollar.data.venta);
    return priceWithTaxes(priceARS);
  }

  return priceWithTaxes(price);
}

/**
 * @param  {object} priceElement
 * @param  {object} eventElement
 * @param  {string} originalPrice
 * @param  {number} newPrice
 * @param  {boolean} showEmoji
 */
function replacePrice(priceElement, eventElement = priceElement, originalPrice, newPrice, showEmoji = true) {
  const originalEmoji = showEmoji ? '⚠️ ' : '';
  const newEmoji = showEmoji ? '🥲 ' : '';

  priceElement.textContent = `${newEmoji}${priceFormatter(newPrice)}`;
  priceElement.classList.add('priceWithTaxes');

  eventElement.addEventListener('mouseenter', (e) => {
    e.preventDefault();
    priceElement.setAttribute('title', 'Precio original');
    priceElement.textContent = `${originalEmoji}${originalPrice}`;
  });

  eventElement.addEventListener('mouseleave', (e) => {
    e.preventDefault();
    priceElement.setAttribute('title', 'Precio (AR$) con impuestos incluidos');
    priceElement.textContent = `${newEmoji}${priceFormatter(newPrice)}`;
  });
}

/**
 * @param  {object} {priceElement
 * @param  {object} eventElement
 * @param  {string} currency
 * @param  {boolean} showEmoji}
 */
function scrapper({ priceElement, eventElement, currency, showEmoji }) {
  if (priceElement) {
    
  console.log("DEMO2",priceElement, eventElement, currency, showEmoji)
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
  const badge = document.createElement('p');
  badge.innerText = price === 0 ? ' Gratis' : `AR${priceFormatter(price)}`;
  badge.setAttribute('title', 'Este es el precio real que vas a pagar (incluye impuestos)');
  badge.classList.add('priceWithTaxesBadge');

  targetDOMElement.appendChild(badge);
}

/**
 * @param  {number} price
 * @param  {string} format
 * @param  {string} currency
 * @returns {string}
 */
function priceFormatter(price, format = 'es-AR', currency = 'ARS') {
  const formatter = new Intl.NumberFormat(format, {
    style: 'currency',
    currency: currency
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
   * ARS790.00            ->  ^\s*[a-zA-z]*?\$?\s?(\d+\W?\d+\W?\d+)\s?\+?
   * Desde ARS790.00      ->  ^\s*[a-zA-z\s]*?\$?\s?(\d+\W?\d+\W?\d+)\s?\+?
   * Desde ARS566.67/mes  ->  ^\s*[a-zA-z\s]*?\$?\s?(\d+\W?\d+\W?\d+)\s?\+?[/a-zA-z\s]*
   */
  return price.replace(/^\s*[a-zA-z\s]*?\$?\s?(\d+\W?\d+\W?\d+)\s?\+?[/a-zA-z\s]*/gi, '$1');
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

  return +price.replace(/(\d?)[\.|\,]?(.+)[\,|\.](\d{1,2})/gi, '$1$2.$3');
}

/**
 * @param  {array} arr
 */
function someURL(arr, url = pathname) {
  return arr.some(w => url.includes(w));
}