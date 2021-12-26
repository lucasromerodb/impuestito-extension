
const tax = {
  ganancias: 0.35,
  pais: 0.30,
}

function priceFormatter(price) {
  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });

  return formatter.format(price);
}

function handleMutations(mutations) {
  console.log({ mutations })
  if (mutations && mutations[0].addedNodes) {
    mutations[0].addedNodes.forEach((item) => {
      if (item.className.includes('gameDiv')) {

        const originalPriceText = item.querySelector('span[itemprop=price]').textContent;
        const originalPriceFormatted = +originalPriceText.replace(/[$\s+]?[.]?/gi, '').replace(',', '.');
        const priceWithTaxes = (originalPriceFormatted + originalPriceFormatted * (tax.ganancias + tax.pais)).toFixed(2)

        const priceWithTaxesElement = document.createElement('p');
        priceWithTaxesElement.innerText = ' ' + priceFormatter(priceWithTaxes);
        priceWithTaxesElement.classList.add('priceWithTaxes');

        const priceAreaElement = item.querySelector('div[class=c-price]');
        priceAreaElement.appendChild(priceWithTaxesElement);

      }
    })
  }
}

const wrapper = document.querySelector('.gameDivsWrapper');
const observer = new MutationObserver(handleMutations);
const observerOptions = { childList: true, subtree: true };

observer.observe(wrapper, observerOptions);


