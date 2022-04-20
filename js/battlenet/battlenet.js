

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
 * https://store.nintendo.com.ar/
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