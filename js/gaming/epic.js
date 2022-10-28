/**
 * Epic Games Web Store
 */
function handleEpicMutations() {
  if (someURL(["epicgames"], hostname)) {
    if (!dollar) {
      console.log("Missing dollar value.");
      return;
    }

    epicScrapper();
  }
}

/**
 * Epic Scrapper
 */
function epicScrapper() {
  const discountPriceElements = [...document.querySelectorAll("main > div")[1].querySelectorAll("span")].filter((e) => e.innerText.includes("$") && e.innerText !== e.innerHTML && e.innerText.length < 15).map((e) => e.lastChild);
  if (discountPriceElements.length > 0) {
    for (const element of discountPriceElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-discount");
    }
  }

  const priceElements = [...document.querySelectorAll("main > div")[1].querySelectorAll("span")].filter((e) => e.innerText.includes("$") && e.innerText === e.innerHTML && e.innerText.length < 15);
  if (priceElements.length > 0) {
    for (const element of priceElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "price-regular");
    }
  }

  const targetElements = document.querySelectorAll(".impuestito");
  if (targetElements.length > 0) {
    for (const element of targetElements) {
      const iconVisibility = element.className.includes("price-regular");

      if (!element.className.includes("impuestito-done")) {
        scrapper({
          priceElement: element,
          eventElement: element,
          currency: "US",
          showEmoji: iconVisibility,
        });
      }
      element.classList.add("impuestito-done");
    }
  }
}
