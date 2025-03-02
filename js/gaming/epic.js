/**
 * Epic Games Web Store
 */
function handleEpicMutations() {
  if (someURL(["epicgames"], hostname)) {
    observeInit(document, epicScrapper);

    setTimeout(() => {
      writePlayground("Xbox Store");
    }, 1000);
  }
}

/**
 * Epic Scrapper
 */
function epicScrapper() {
  const finalPriceElements = [...document.querySelectorAll("main > div")[1].querySelectorAll("span")]
    .filter((e) => e.innerText.includes("$") && e.innerText === e.innerHTML && e.innerText.length < 15);

  if (finalPriceElements.length > 0) {
    for (const element of finalPriceElements) {
      if (element.nodeName === "#text" || element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-regular", "impuestito-epic");
    }
  }

  const basePriceElements = [...document.querySelectorAll("main > div")[1].querySelectorAll("span")].filter((e) => e.innerText.includes("$") && e.innerText !== e.innerHTML && e.innerText.length < 15).map((e) => e.lastChild);
  if (basePriceElements.length > 0) {
    for (const element of basePriceElements) {
      if (element.nodeName === "#text" || element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-discount", "impuestito-epic");
    }
  }

  const priceElementsTarget = document.querySelectorAll(".impuestito");
  if (priceElementsTarget.length > 0) {
    for (const element of priceElementsTarget) {
      if (!element.className.includes("impuestito-done")) {
        scrapper({
          priceElement: element,
          eventElement: element,
          currency: "US",
          showEmoji: false,
          isDiscount: element.classList.contains("price-discount"),
        });
      }
      element.classList.add("impuestito-done");
    }
  }
}

// Init
handleEpicMutations();
