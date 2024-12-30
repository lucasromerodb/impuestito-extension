/**
 * XB Deals Web Store
 */
function handleDekuDealsMutations() {
  if (someURL(["dekudeals.com"], hostname)) {
    console.log("🟢 impuestito is working...");

    // This is here because DekuDeals have issues with some elements
    dekuDealsScrapper();
    dekuDealsRelatedScrapper();

    observeInit(document, dekuDealsScrapper);

    if (someURL(["items"], pathname)) {
      observeInit(document, dekuDealsRelatedScrapper);
    }
  }
}

function dekuDealsScrapper() {
  const elements = [];

  const priceElements = [...document.querySelectorAll("div.card-badge strong"), ...document.querySelectorAll("div.card-badge s")];
  if (priceElements.length > 0) {
    for (const element of priceElements) {
      if (element.className.includes("impuestito")) return;
      element.classList.add("impuestito", "impuestito-dekudeals");
      elements.push(element);
    }
  }

  const soloPriceElements = [...[...document.querySelectorAll("main .search-main .row > div > .position-relative")].filter((element) => !element.childNodes[3].classList.contains("card-badge"))];
  if (soloPriceElements.length > 0) {
    for (const element of soloPriceElements) {
      if (element.childNodes[2].nodeName.toLowerCase() === "span" && element.childNodes[2].className.includes("impuestito")) return;

      const span = document.createElement("span");
      span.append(element.childNodes[2]);
      element.childNodes[2].remove;
      element.childNodes[1].insertAdjacentElement("afterend", span);
      element.childNodes[2].classList.add("impuestito", "impuestito-dekudeals");
      elements.push(element.childNodes[2]);
    }
  }

  const priceElementsTarget = elements;
  if (priceElementsTarget.length > 0) {
    for (const element of priceElementsTarget) {
      if (!element.className.includes("impuestito-done")) {
        scrapper({
          priceElement: element,
          eventElement: element,
          currency: "ARS",
          showEmoji: false,
          isDiscount: element.classList.contains("text-muted"),
        });
      }
      element.classList.add("impuestito-done");
    }
  }
}

function dekuDealsRelatedScrapper() {
  const elements = [];

  const buttonPriceElements = [...document.querySelectorAll(".btn.btn-block.btn-primary")];
  if (buttonPriceElements.length > 0) {
    for (const element of buttonPriceElements) {
      if (element.childNodes[0].nodeName.toLowerCase() === "span" && element.childNodes[0].className.includes("impuestito")) return;
      element.style.cssText = "background: black;";
      const span = document.createElement("span");
      span.append(element.childNodes[0]);
      element.childNodes[0].remove;
      element.insertAdjacentElement("afterbegin", span);
      element.childNodes[0].classList.add("impuestito", "impuestito-dekudeals");
      elements.push(element.childNodes[0]);
    }
  }

  const soloPriceElements = [...[...document.querySelectorAll(".row.item-grid2 > div > .position-relative")].filter((element) => !element.childNodes[3].classList.contains("card-badge"))];
  if (soloPriceElements.length > 0) {
    for (const element of soloPriceElements) {
      if (element.childNodes[2].nodeName.toLowerCase() === "span" && element.childNodes[2].className.includes("impuestito")) return;

      const span = document.createElement("span");
      span.append(element.childNodes[2]);
      element.childNodes[2].remove;
      element.childNodes[1].insertAdjacentElement("afterend", span);
      element.childNodes[2].classList.add("impuestito", "impuestito-dekudeals");
      elements.push(element.childNodes[2]);
    }
  }

  const priceElementsTarget = elements;
  if (priceElementsTarget.length > 0) {
    for (const element of priceElementsTarget) {
      if (!element.className.includes("impuestito-done")) {
        scrapper({
          priceElement: element,
          eventElement: element,
          currency: "ARS",
          showEmoji: false,
          isDiscount: element.classList.contains("text-muted"),
        });
      }
      element.classList.add("impuestito-done");
    }
  }
}

// Init
handleDekuDealsMutations();
