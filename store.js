function handleStoreMutations(mutations) {
  console.log({ mutations });
  const items = document.querySelectorAll('.Price-module__boldText___34T2w Price-module__moreText___1FNlT AcquisitionButtons-module__listedPrice___3lkBo Price-module__brandPrice___3TIaM');
  console.log({ items })
  if (mutations) {


    // if (items.length > 0) {
    //   for (const item of items) {

    //     if (item.querySelector('.xboxito') === null) {

    //       // Calc price
    //       const originalPriceText = item.querySelector('span[itemprop=price]').textContent;
    //       const originalPriceFormatted = +originalPriceText.replace(/[$\s+]?[.]?/gi, '').replace(',', '.');
    //       const priceWithTaxes = (originalPriceFormatted + originalPriceFormatted * (tax.ganancias + tax.pais)).toFixed(2)

    //       // Badge creation
    //       const priceWithTaxesElement = document.createElement('p');
    //       priceWithTaxesElement.innerText = ' ' + priceFormatter(priceWithTaxes);
    //       priceWithTaxesElement.classList.add('priceWithTaxes', 'xboxito');

    //       item.appendChild(priceWithTaxesElement);
    //       item.querySelector('.popprice').appendChild(priceWithTaxesElement.cloneNode(true));
    //     }
    //   }
    // }
  }
}

if (window.location.href.includes('games/store')) {
  const wrapper = document.querySelector('.ProductActionsPanel-module__desktopProductActionsPanel___1MnpC');
  const observer = new MutationObserver(handleStoreMutations);
  const observerOptions = { childList: true };

  observer.observe(wrapper, observerOptions);
}