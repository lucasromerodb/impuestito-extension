chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg === "GET_DOLLAR_OFFICIAL") {
    const url = "https://mercados.ambito.com/dolar/oficial/variacion";
    fetch(url)
      .then((res) => res.json())
      .then((res) => response({ status: "SUCCESS", data: res, message: "Cotización del dólar" }))
      .catch((err) => response({ status: "ERROR", data: {}, message: err }));
  }

  if (msg == "GET_TAXES") {
    const url = "https://impuestito-api-production.up.railway.app/api/taxes";
    fetch(url)
      .then((res) => res.json())
      .then((res) => response({ status: "SUCCESS", data: res, message: "Impuestos Argentina" }))
      .catch((err) => response({ status: "ERROR", data: {}, message: err }));
  }

  return true;
});
