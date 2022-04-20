

/**
 * Battle.net Web Store
 */


/**
 * Tested on:
 * https://us.shop.battle.net/es-mx/product/diablo_ii_resurrected?p=74831
 * https://us.shop.battle.net/es-mx/product/diablo-ii
 */

// handleBattleNetProductArg
// us.shop.battle.net/es-mx/
//       handleBattleNetGamePageArg();


 function handleBattleNetMutations() {
  if (someURL(['us.shop.battle.net'], hostname)) {
    handleBattleNetProductArg();
  }
}


/**
 * Tested on:
 * https://us.shop.battle.net/es-mx/product/diablo-ii
 */
 function handleBattleNetProductArg() {

  handleMutations(
    '.price-container',
    'epic--hero',
    (game) => {


      // https://stackoverflow.com/questions/62897456/access-a-shadow-root-element-using-document-queryselector
      var appRoot = document.querySelector('meka-price-label').shadowRoot
      var appRootPrice = appRoot.querySelector('.meka-price-label--details__standard-price')

      console.log("DEMO4",game,"price",appRootPrice)
      // Price
      scrapper({
        priceElement: appRootPrice,
        eventElement: appRootPrice,
        currency: 'ARS',
        showEmoji: true,
      });
    }
  );
}


/**
 * Tested on:
 * https://us.shop.battle.net/es-mx
 */
 function handleBattleNetAllGamesArg() {

  // browsing-card-group__layout -> list of cards
  // browsing-card-group__layout--card browsing-card ng-star-inserted -> one card
  handleMutations(
    '.browsing-card-group__layout--card browsing-card ng-star-inserted',
    'epic--hero',
    (game) => {

      var insidecard1 = document.querySelector('meka-browsing-card').shadowRoot
      var insidecard2 = insidecard1.querySelector('meka-price-label').shadowRoot
      var appRootPrice = insidecard2.querySelector('.meka-price-label--details__standard-price')

      // Price
      scrapper({
        priceElement: appRootPrice,
        eventElement: appRootPrice,
        currency: 'ARS',
        showEmoji: true,
      });
    }
  );
}