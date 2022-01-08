chrome.runtime.onMessage.addListener((msg, sender, response) => {

  if (msg === 'GET_DOLLAR_OFFICIAL') {
    const url = 'https://mercados.ambito.com/dolar/oficial/variacion';
    fetch(url)
      .then(res => res.json())
      .then(res => response({ status: 'SUCCESS', data: res, message: 'Cotización del dólar' }))
      .catch(err => response({ status: 'ERROR', data: {}, message: err }));
  }

  return true;
});