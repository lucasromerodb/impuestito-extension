/**
 * Epic Games Web Store
 */
function handleNintendoARMutations() {
  if (someURL(["nintendo"], hostname)) {
    handleNintendoAllGamesArg();
  }
}

/**
 * HOW IT WORKS?
 *
 * Find a game item list
 * Then get the original price and their discount if exists
 * Then replace both with the new price
 * Then add a click event to switch between original and new prices
 */

/**
 * Tested on:
 * https://store.nintendo.com.ar/
 */
function handleNintendoAllGamesArg() {
  const priceElements = [...document.querySelectorAll("span")].filter((e) => e.className.includes("Pricestyles__MSRP"));
  for (const element of priceElements) {
    if (element.className.includes("impuestito")) return;
    element.innerHTML = element.innerHTML.replace(/(.*)(<\/span>)(.*)(<\/span>)?/gi, '$1$2<span class="price-regular">$3</span>$4');
    element.classList.add("impuestito");
  }

  const discountPriceElements = [...document.querySelectorAll("span")].filter((e) => e.className.includes("Pricestyles__SalePrice"));
  for (const element of discountPriceElements) {
    if (element.className.includes("impuestito")) return;
    element.innerHTML = element.innerHTML.replace(/(.*)(<\/span>)(.*)(<\/span>)?/gi, '$1$2<span class="price-discount">$3</span>$4');
    element.classList.add("impuestito");
  }

  const targetElements = document.querySelectorAll(".impuestito .price-regular, .impuestito .price-discount");
  for (const element of targetElements) {
    const iconVisibility = element.className.includes("price-regular");
    scrapper({
      priceElement: element,
      eventElement: element,
      currency: "ARS",
      showEmoji: iconVisibility,
    });
  }

  // handleMutations(".category-product-item", "epic--hero", (game) => {
  //   // Price
  //   scrapper({
  //     priceElement: game.querySelector(".price"),
  //     eventElement: game.querySelector(".price"),
  //     currency: "ARS",
  //     showEmoji: true,
  //   });
  // });
}

// [...document.querySelectorAll('span')].filter(e => e.className.includes('Pricestyles__SalePrice'))
// [...document.querySelectorAll('span')].filter(e => e.className.includes('Pricestyles__MSRP'))
