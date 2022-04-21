/**
 * Battle.net Web Store
 */

// us.shop.battle.net/es-mx/

function handleBattleNetMutations() {

  if (someURL(['us.shop.battle.net'], hostname) && someURL(['/es-mx'], pathname)) {

    if (someURL(['/product/'], pathname)) {
      handleBattleNetMultiProductArg();
    } else {
      handleBattleNetAllGamesArg()
    }
  }
}






/**
 * Tested on:
 * https://us.shop.battle.net/es-mx/product/diablo_ii_resurrected?p=74831
 * https://us.shop.battle.net/es-mx/product/overwatch?p=37693
 */
function handleBattleNetMultiProductArg() {
  handleMutations("meka-price-label", "battlenet--hero", (game) => {
    // https://stackoverflow.com/questions/62897456/access-a-shadow-root-element-using-document-queryselector
    

    //console.log("DEMO11", game, "price");
    
    var appRoot = game.shadowRoot;
    var appRootPrice = appRoot.querySelector(
      ".meka-price-label--details__standard-price"
    );
    //console.log("DEMO111", "appRoot", appRoot, "appRootPrice", appRootPrice);
    

    // Price
    scrapper({
      priceElement: appRootPrice,
      eventElement: appRootPrice,
      currency: "ARS",
      showEmoji: true,
    });
  });
}

/**
 * Tested on:
 * https://us.shop.battle.net/es-mx
 */
function handleBattleNetAllGamesArg() {
  // browsing-card-group__layout -> list of cards
  // browsing-card-group__layout--card browsing-card ng-star-inserted -> one card
  handleMutations(
    ".browsing-card-group__layout--card.browsing-card.ng-star-inserted",
    "battlenet--hero",
    (game) => {

      var insidecard1 = game.querySelector("meka-browsing-card");
      var insidecard1Super2 = insidecard1.querySelector("meka-price-label").shadowRoot
      var insidecard1Super3 = insidecard1Super2.querySelector("span.meka-price-label--details__standard-price");
      // Price
      scrapper({
        priceElement: insidecard1Super3,
        eventElement: insidecard1Super3,
        currency: "ARS",
        showEmoji: true,
      });
      /*
      */
    }
  );
}






// replaced by handleBattleNetMultiProductArg() //
/**
 * Tested on:
 * https://us.shop.battle.net/es-mx/product/diablo-ii
 */
 function handleBattleNetProductArg() {
  handleMutations(".price-container", "epic--hero", (game) => {
    // https://stackoverflow.com/questions/62897456/access-a-shadow-root-element-using-document-queryselector
    var appRoot = document.querySelector("meka-price-label").shadowRoot;
    var appRootPrice = appRoot.querySelector(
      ".meka-price-label--details__standard-price"
    );

    //console.log("DEMO4", game, "price", appRootPrice);
    // Price
    scrapper({
      priceElement: appRootPrice,
      eventElement: appRootPrice,
      currency: "ARS",
      showEmoji: true,
    });
  });
}
