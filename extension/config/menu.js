/**
 * Creates a new div element with the class "impuestito-menu" and appends it to the body of the document.
 * This function is used to dynamically add a playground area to the webpage for the "impuestito-extension".
 */
async function initMenu(text) {
  // sync: is used to store or get data across devices
  // local: is used to store or get data like localstorage
  const responseSync = await chrome.storage.sync.get(['userConfig','market'])
  const responseLocal = await chrome.storage.local.get(['impuestito'])

  // If no response, try to get data again
  if(!responseSync || !responseLocal) {
    console.log('📎 Intentando obtener datos nuevamente')
    initMenu()
  };



  // Initialize user config if not set
  if (!responseSync.userConfig) {
    console.log("🙋‍♂️ Initializing user config");
    chrome.storage.sync.set({
      userConfig: {
        selectedProvince: 'AR-C',
        selectedPaymentMethod: 'tarjeta',
      }
    })
  }

  // Create elements
  const trigger = document.createElement("div");
  const menu = document.createElement("div");
  const overlay = document.createElement("svg");

  // Add classes and event listeners
  overlay.classList.add("impuestito-menu__overlay", "hidden");
  overlay.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
  });

  // Add classes and event listeners
  trigger.classList.add("impuestito-menu__trigger");
  trigger.addEventListener("click", () => {
    // Toggle menu
    menu.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInside = menu.contains(event.target) || trigger.contains(event.target);
    if (!isClickInside) {
      menu.classList.add("hidden");
      overlay.classList.add("hidden");
    }
  });

  // Close menu when pressing escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      menu.classList.add("hidden");
      overlay.classList.add("hidden");
    }
  });

  // Add SVG icon (impuestito logo)
  trigger.innerHTML = `
  <svg width="2344" height="512" viewBox="0 0 2344 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="87.5027" cy="168.503" r="87.4973" fill="#00BE5C"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M87.5 290.18C154.702 290.18 209.18 235.702 209.18 168.5C209.18 151.621 205.743 135.544 199.531 120.932L215.639 104.824C246.163 74.2994 295.652 74.2995 326.176 104.824C356.7 135.348 356.701 184.837 326.176 215.361L134.361 407.176C103.837 437.701 54.3476 437.701 23.8235 407.176C-6.7006 376.652 -6.70061 327.163 23.8235 296.639L39.9318 280.531C54.544 286.743 70.6206 290.18 87.5 290.18Z" fill="#00BE5C"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M193.08 396.768C209.075 417.58 234.22 430.995 262.497 430.995C310.821 430.995 349.995 391.821 349.995 343.497C349.995 315.22 336.58 290.075 315.768 274.08L193.08 396.768Z" fill="#00BE5C"/>
    <path d="M527.2 383.5V202.96H581.94V383.5H527.2ZM554.74 167.26C544.313 167.26 536.153 164.88 530.26 160.12C524.593 155.133 521.76 148.107 521.76 139.04C521.76 130.653 524.707 123.853 530.6 118.64C536.493 113.427 544.54 110.82 554.74 110.82C564.713 110.82 572.533 113.313 578.2 118.3C584.093 123.06 587.04 129.973 587.04 139.04C587.04 147.427 584.093 154.227 578.2 159.44C572.533 164.653 564.713 167.26 554.74 167.26ZM633.038 383.5V202.96H685.058L686.758 235.6L679.278 236.28C681.772 230.387 685.172 225.173 689.478 220.64C693.785 216.107 698.545 212.367 703.758 209.42C709.198 206.247 714.865 203.867 720.758 202.28C726.652 200.467 732.545 199.56 738.438 199.56C747.505 199.56 755.552 200.92 762.578 203.64C769.832 206.36 776.065 210.78 781.278 216.9C786.718 223.02 791.025 231.18 794.198 241.38L786.038 240.02L788.418 235.26C791.592 229.82 795.445 224.947 799.978 220.64C804.738 216.107 809.952 212.253 815.618 209.08C821.285 205.907 827.065 203.527 832.958 201.94C839.078 200.353 844.972 199.56 850.638 199.56C864.918 199.56 876.818 202.393 886.338 208.06C895.858 213.727 902.998 222.113 907.758 233.22C912.518 244.1 914.898 257.587 914.898 273.68V383.5H860.158V277.76C860.158 267.107 857.892 259.173 853.358 253.96C849.052 248.52 842.478 245.8 833.638 245.8C828.878 245.8 824.458 246.593 820.378 248.18C816.525 249.54 813.125 251.693 810.178 254.64C807.458 257.36 805.305 260.533 803.718 264.16C802.132 267.787 801.338 271.867 801.338 276.4V383.5H746.598V277.42C746.598 267.22 744.218 259.4 739.458 253.96C734.925 248.52 728.465 245.8 720.078 245.8C715.545 245.8 711.238 246.593 707.158 248.18C703.305 249.54 699.905 251.693 696.958 254.64C694.238 257.36 692.085 260.533 690.498 264.16C688.912 267.787 688.118 271.867 688.118 276.4V383.5H633.038ZM960.429 458.3V202.96H1012.45L1014.83 242.74L1004.29 239.68C1005.65 232.427 1009.39 225.853 1015.51 219.96C1021.86 213.84 1029.68 208.967 1038.97 205.34C1048.26 201.487 1058.12 199.56 1068.55 199.56C1083.96 199.56 1097.68 203.527 1109.69 211.46C1121.7 219.393 1131.11 230.5 1137.91 244.78C1144.94 258.833 1148.45 275.04 1148.45 293.4C1148.45 311.307 1144.94 327.287 1137.91 341.34C1131.11 355.393 1121.59 366.5 1109.35 374.66C1097.34 382.593 1083.62 386.56 1068.21 386.56C1057.78 386.56 1047.92 384.633 1038.63 380.78C1029.34 376.7 1021.52 371.487 1015.17 365.14C1008.82 358.793 1004.74 351.88 1002.93 344.4L1015.51 339.3V458.3H960.429ZM1054.95 340.32C1063.11 340.32 1070.14 338.393 1076.03 334.54C1082.15 330.687 1086.8 325.247 1089.97 318.22C1093.37 310.967 1095.07 302.693 1095.07 293.4C1095.07 283.88 1093.37 275.607 1089.97 268.58C1086.8 261.327 1082.15 255.773 1076.03 251.92C1070.14 247.84 1063.11 245.8 1054.95 245.8C1046.56 245.8 1039.31 247.84 1033.19 251.92C1027.07 255.773 1022.31 261.213 1018.91 268.24C1015.51 275.267 1013.81 283.653 1013.81 293.4C1013.81 302.693 1015.51 310.967 1018.91 318.22C1022.31 325.247 1027.07 330.687 1033.19 334.54C1039.31 338.393 1046.56 340.32 1054.95 340.32ZM1245.76 386.9C1232.61 386.9 1221.28 384.067 1211.76 378.4C1202.24 372.507 1194.87 364.233 1189.66 353.58C1184.67 342.7 1182.18 329.667 1182.18 314.48V202.96H1236.92V306.32C1236.92 317.427 1239.52 326.153 1244.74 332.5C1250.18 338.62 1257.66 341.68 1267.18 341.68C1271.94 341.68 1276.24 341 1280.1 339.64C1283.95 338.053 1287.24 335.9 1289.96 333.18C1292.9 330.233 1295.17 326.833 1296.76 322.98C1298.34 319.127 1299.14 314.933 1299.14 310.4V202.96H1353.88V383.5H1302.54L1300.5 346.44L1310.36 342.36C1307.86 350.747 1303.33 358.34 1296.76 365.14C1290.41 371.94 1282.82 377.267 1273.98 381.12C1265.14 384.973 1255.73 386.9 1245.76 386.9ZM1488.71 386.9C1468.77 386.9 1451.31 382.933 1436.35 375C1421.62 367.067 1410.17 356.187 1402.01 342.36C1394.08 328.307 1390.11 312.327 1390.11 294.42C1390.11 280.367 1392.38 267.56 1396.91 256C1401.45 244.213 1407.79 234.127 1415.95 225.74C1424.34 217.353 1434.09 210.893 1445.19 206.36C1456.53 201.6 1468.88 199.22 1482.25 199.22C1494.95 199.22 1506.51 201.487 1516.93 206.02C1527.36 210.553 1536.43 216.9 1544.13 225.06C1551.84 233.22 1557.73 242.853 1561.81 253.96C1565.89 265.067 1567.82 277.193 1567.59 290.34L1567.25 305.3H1423.77L1415.61 274.36H1522.71L1516.93 280.48V273.68C1516.48 268.013 1514.67 263.14 1511.49 259.06C1508.55 254.753 1504.58 251.353 1499.59 248.86C1494.83 246.367 1489.39 245.12 1483.27 245.12C1474.21 245.12 1466.5 246.933 1460.15 250.56C1454.03 253.96 1449.39 258.947 1446.21 265.52C1443.04 272.093 1441.45 280.253 1441.45 290C1441.45 299.747 1443.49 308.36 1447.57 315.84C1451.88 323.32 1458 329.1 1465.93 333.18C1474.09 337.26 1483.73 339.3 1494.83 339.3C1502.31 339.3 1509.11 338.167 1515.23 335.9C1521.35 333.633 1527.93 329.78 1534.95 324.34L1560.45 360.38C1553.43 366.273 1545.95 371.26 1538.01 375.34C1530.08 379.193 1521.92 382.027 1513.53 383.84C1505.37 385.88 1497.1 386.9 1488.71 386.9ZM1663.11 386.9C1645.88 386.9 1630.47 384.18 1616.87 378.74C1603.27 373.073 1592.39 365.367 1584.23 355.62L1617.55 327.06C1624.57 334.087 1632.51 339.3 1641.35 342.7C1650.19 345.873 1658.57 347.46 1666.51 347.46C1669.45 347.46 1672.06 347.12 1674.33 346.44C1676.59 345.76 1678.52 344.853 1680.11 343.72C1681.92 342.36 1683.28 340.887 1684.19 339.3C1685.09 337.487 1685.55 335.447 1685.55 333.18C1685.55 328.647 1683.62 325.247 1679.77 322.98C1677.95 321.847 1674.67 320.487 1669.91 318.9C1665.15 317.087 1659.03 315.273 1651.55 313.46C1640.89 310.74 1631.6 307.453 1623.67 303.6C1615.96 299.747 1609.61 295.327 1604.63 290.34C1600.09 285.807 1596.58 280.593 1594.09 274.7C1591.82 268.807 1590.69 262.233 1590.69 254.98C1590.69 243.873 1593.97 234.127 1600.55 225.74C1607.35 217.353 1616.19 210.893 1627.07 206.36C1637.95 201.6 1649.73 199.22 1662.43 199.22C1672.4 199.22 1681.81 200.353 1690.65 202.62C1699.71 204.887 1708.1 208.06 1715.81 212.14C1723.74 216.22 1730.77 221.093 1736.89 226.76L1707.99 259.06C1704.13 255.207 1699.6 251.807 1694.39 248.86C1689.17 245.687 1683.96 243.193 1678.75 241.38C1673.53 239.34 1668.66 238.32 1664.13 238.32C1660.73 238.32 1657.67 238.66 1654.95 239.34C1652.45 239.793 1650.3 240.7 1648.49 242.06C1646.9 243.193 1645.65 244.667 1644.75 246.48C1643.84 248.067 1643.39 249.88 1643.39 251.92C1643.39 254.413 1643.95 256.68 1645.09 258.72C1646.45 260.533 1648.26 262.233 1650.53 263.82C1652.57 264.953 1656.08 266.427 1661.07 268.24C1666.28 270.053 1673.08 272.093 1681.47 274.36C1692.12 277.307 1701.19 280.707 1708.67 284.56C1716.37 288.187 1722.49 292.493 1727.03 297.48C1730.88 301.333 1733.6 305.867 1735.19 311.08C1737 316.067 1737.91 321.507 1737.91 327.4C1737.91 338.96 1734.62 349.273 1728.05 358.34C1721.7 367.18 1712.86 374.207 1701.53 379.42C1690.42 384.407 1677.61 386.9 1663.11 386.9ZM1785.55 383.5V157.4H1840.29V383.5H1785.55ZM1753.59 250.9V202.96H1874.97V250.9H1753.59ZM1909.45 383.5V202.96H1964.19V383.5H1909.45ZM1936.99 167.26C1926.56 167.26 1918.4 164.88 1912.51 160.12C1906.84 155.133 1904.01 148.107 1904.01 139.04C1904.01 130.653 1906.95 123.853 1912.85 118.64C1918.74 113.427 1926.79 110.82 1936.99 110.82C1946.96 110.82 1954.78 113.313 1960.45 118.3C1966.34 123.06 1969.29 129.973 1969.29 139.04C1969.29 147.427 1966.34 154.227 1960.45 159.44C1954.78 164.653 1946.96 167.26 1936.99 167.26ZM2030.58 383.5V157.4H2085.32V383.5H2030.58ZM1998.62 250.9V202.96H2120V250.9H1998.62ZM2234.43 386.9C2215.84 386.9 2199.18 382.933 2184.45 375C2169.71 366.84 2158.15 355.733 2149.77 341.68C2141.38 327.4 2137.19 311.307 2137.19 293.4C2137.19 275.04 2141.38 258.833 2149.77 244.78C2158.15 230.5 2169.71 219.393 2184.45 211.46C2199.18 203.3 2215.84 199.22 2234.43 199.22C2253.24 199.22 2269.9 203.3 2284.41 211.46C2299.14 219.393 2310.7 230.5 2319.09 244.78C2327.47 258.833 2331.67 275.04 2331.67 293.4C2331.67 311.307 2327.47 327.4 2319.09 341.68C2310.7 355.733 2299.14 366.84 2284.41 375C2269.9 382.933 2253.24 386.9 2234.43 386.9ZM2234.43 339.98C2242.59 339.98 2249.73 337.94 2255.85 333.86C2262.19 329.78 2267.18 324.227 2270.81 317.2C2274.43 310.173 2276.13 302.24 2275.91 293.4C2276.13 284.107 2274.43 275.947 2270.81 268.92C2267.18 261.667 2262.19 256.113 2255.85 252.26C2249.73 248.18 2242.59 246.14 2234.43 246.14C2226.49 246.14 2219.35 248.18 2213 252.26C2206.66 256.34 2201.67 261.893 2198.05 268.92C2194.42 275.947 2192.61 284.107 2192.61 293.4C2192.61 302.24 2194.42 310.173 2198.05 317.2C2201.67 324.227 2206.66 329.78 2213 333.86C2219.35 337.94 2226.49 339.98 2234.43 339.98Z" fill="#2F2F2F"/>
  </svg>
  `

  // Menu markup
  const menuHTML = `
    <div class="impuestito-menu__config__section impuestito-menu__config__section--left">

      <div class="impuestito-menu__config__title">Configuración</div>

      <div class="impuestito-menu__config__form-group">
        <label>Impuestos provinciales</label>
        <select id="impuestito-menu__config__select-province">
        </select>
      </div>

      <div class="impuestito-menu__config__form-group">
        <label>Método de pago</label>
        <select id="impuestito-menu__config__select-payment-method" disabled>
        </select>
      </div>

    </div>

    <div class="impuestito-menu__config__section impuestito-menu__config__section--right">
      ${
        isFirefox()
        ? `<a target="_blank" href="https://addons.mozilla.org/es-ES/firefox/addon/impuestito/">
            <img alt="Mozilla Add-on Version" src="https://img.shields.io/amo/v/impuestito">
          </a>`
        : `<a target="_blank" href="https://chromewebstore.google.com/detail/impuestito-precio-final-j/kodbfkngjgckpmipedoomkdhhihioaio">
            <img alt="Chrome Web Store Version" src="https://img.shields.io/chrome-web-store/v/kodbfkngjgckpmipedoomkdhhihioaio">
          </a>`
      }
      <a target="_blank" href="https://x.com/impuestito_org">
        <img alt="X (formerly Twitter) Follow" src="https://img.shields.io/twitter/follow/impuestito_org">
      </a>
      <div class="impuestito-menu__amazon-recommendation">
        <a target="_blank" href="https://amzn.to/3DgDekl">
          <img src="https://m.media-amazon.com/images/I/61xtwHIMHpL._SX522_.jpg">
        </a>
        <a target="_blank" href="https://amzn.to/3FentLc">
          <img src="https://m.media-amazon.com/images/I/61uQKdWCfAL._SX522_.jpg">
        </a>
        <a target="_blank" href="https://amzn.to/4iAdqOP">
          <img src="https://m.media-amazon.com/images/I/51iXILIT27L._SX522_.jpg">
        </a>
      </div>
      <a target="_blank" href="https://amzn.to/3XzcKRO">Más accesorios gaming</a>
      <a target="_blank" href="https://amzn.to/4kttBzg">Amazon Prime Gaming</a>
    </div>
    `

  menu.classList.add("impuestito-menu__config", "hidden");
  menu.innerHTML = menuHTML;

  // Insert elements into the DOM
  document.querySelector("body").insertAdjacentElement("beforeend", trigger);
  document.querySelector("body").insertAdjacentElement("beforeend", menu);
  document.querySelector("body").insertAdjacentElement("beforeend", overlay);

  // Log welcome message
  logWelcomeMessage({ store: text || "tu navegador" });

  // Set data-impuestito attribute
  document.querySelector('body').setAttribute('data-impuestito', Date.now());

  // Initialize select options
  if (responseLocal.impuestito) {
    const provinces = Object.fromEntries(
      Object.entries(responseLocal.impuestito.province).sort(([,a], [,b]) => a.name.localeCompare(b.name))
    )

    // Initialize select options
    const provinceSelect = menu.querySelector('#impuestito-menu__config__select-province');
    const paymentMethodSelect = menu.querySelector('#impuestito-menu__config__select-payment-method');

    Object.keys(provinces).map(key => {
      provinceSelect.appendChild(new Option(`${provinces[key].name} (${(provinces[key].tax*100).toFixed(1)}%)`, key));
    });

    handleProvinceChange(responseSync.userConfig.selectedProvince);

    paymentMethodSelect.appendChild(new Option('Tarjeta', 'tarjeta', true, true));
    paymentMethodSelect.appendChild(new Option('Dólar MEP', 'mep'));
    paymentMethodSelect.appendChild(new Option('Crypto', 'crypto'));
  }

  // Province change
  menu.querySelector('#impuestito-menu__config__select-province').addEventListener('change', (e) => {
    console.log("🗺️ Changing province", e.target.value);

    handleProvinceChange(e.target.value);

    chrome.storage.sync.set({
      userConfig: {
        ...responseSync.userConfig,
        selectedProvince: e.target.value,
      }
    });

    // Force window reload to apply province change
    window.location.reload();
  });
}

function handleProvinceChange(province) {
  const menu = document.querySelector('.impuestito-menu__config');
  const provinceSelect = menu.querySelector('#impuestito-menu__config__select-province');
  // Remove selected attribute from all options
  Array.from(provinceSelect.options).forEach(option => {
    option.selected = false;
    if (option.value === province) {
      option.selected = true;
    }
  });
}

function isFirefox() {
  return navigator.userAgent.toLowerCase().includes('firefox');
}

// <a target="_blank" href="https://cafecito.app/impuestito">Hacer una donación</a>
// <a target="_blank" href="https://impuestito.org/?utm_source=impuestito-extension&utm_medium=${window.location.hostname}">Ver más en el sitio web</a>