const API_URL_REGEX = /^(?:\/)?(https?:\/\/[^\/]+)(?:\/)?$/;
const IMPUESTITO_API_URL = chrome.runtime.getManifest().web_accessible_resources[0].resources[0].replace(API_URL_REGEX, '$1');
const GAMEPASS_API_URL = chrome.runtime.getManifest().web_accessible_resources[0].resources[1].replace(API_URL_REGEX, '$1');

if (chrome.sidePanel) {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
}

// COUNTRY LOCALES: https://saimana.com/list-of-country-locale-code/
// Xbox supported markets regions
const markets = [
  { name: "Albania", lang: "sq", region: "al", tax: 1 },
  { name: "Algeria", lang: "ar", region: "dz", tax: 1 },
  { name: "Argentina", lang: "es", region: "ar", tax: 2.55 },
  { name: "Australia", lang: "en", region: "au", tax: 1 },
  { name: "Austria", lang: "de", region: "at", tax: 1 },
  { name: "Bahrain", lang: "ar", region: "bh", tax: 1 },
  { name: "Belgium", lang: "nl", region: "be", tax: 1 },
  { name: "Bolivia", lang: "es", region: "bo", tax: 1 },
  { name: "Bosnia and Herzegovina", lang: "bs", region: "ba", tax: 1 },
  { name: "Brazil", lang: "pt", region: "br", tax: 1 },
  { name: "Bulgaria", lang: "bg", region: "bg", tax: 1 },
  { name: "Canada", lang: "en", region: "ca", tax: 1 },
  { name: "Chile", lang: "es", region: "cl", tax: 1 },
  // { name: "China", lang: "zh", region: "cn", tax: 1 },
  { name: "Colombia", lang: "es", region: "co", tax: 1 },
  { name: "Costa Rica", lang: "es", region: "cr", tax: 1 },
  { name: "Croatia", lang: "hr", region: "hr", tax: 1 },
  { name: "Cyprus", lang: "el", region: "cy", tax: 1 },
  { name: "Czechia", lang: "cs", region: "cz", tax: 1 },
  { name: "Denmark", lang: "da", region: "dk", tax: 1 },
  { name: "Ecuador", lang: "es", region: "ec", tax: 1 },
  { name: "Egypt", lang: "ar", region: "eg", tax: 1 },
  { name: "El Salvador", lang: "es", region: "sv", tax: 1 },
  { name: "Estonia", lang: "et", region: "ee", tax: 1 },
  { name: "Finland", lang: "fi", region: "fi", tax: 1 },
  { name: "France", lang: "fr", region: "fr", tax: 1 },
  { name: "Georgia", lang: "ka", region: "ge", tax: 1 },
  { name: "Germany", lang: "de", region: "de", tax: 1 },
  { name: "Greece", lang: "el", region: "gr", tax: 1 },
  { name: "Guatemala", lang: "es", region: "gt", tax: 1 },
  { name: "Honduras", lang: "es", region: "hn", tax: 1 },
  { name: "Hong Kong SAR", lang: "zh", region: "hk", tax: 1 },
  { name: "Hungary", lang: "hu", region: "hu", tax: 1 },
  { name: "Iceland", lang: "is", region: "is", tax: 1 },
  { name: "India", lang: "hi", region: "in", tax: 1 },
  { name: "Indonesia ", lang: "id", region: "id", tax: 1 },
  { name: "Ireland", lang: "en", region: "ie", tax: 1 },
  { name: "Israel", lang: "he", region: "il", tax: 1 },
  { name: "Italy", lang: "it", region: "it", tax: 1 },
  { name: "Japan", lang: "ja", region: "jp", tax: 1 },
  { name: "Korea", lang: "ko", region: "kr", tax: 1 },
  { name: "Kuwait", lang: "ar", region: "kw", tax: 1 },
  { name: "Latvia", lang: "lv", region: "lv", tax: 1 },
  { name: "Libya", lang: "ar", region: "ly", tax: 1 },
  { name: "Liechtenstein", lang: "de", region: "li", tax: 1 },
  { name: "Lithuania", lang: "lt", region: "lt", tax: 1 },
  { name: "Luxembourg", lang: "fr", region: "lu", tax: 1 },
  { name: "Malaysia ", lang: "ms", region: "my", tax: 1 },
  { name: "Malta", lang: "mt", region: "mt", tax: 1 },
  { name: "Mexico", lang: "es", region: "mx", tax: 1 },
  { name: "Moldova", lang: "ro", region: "md", tax: 1 },
  { name: "Montenegro", lang: "sr", region: "me", tax: 1 },
  { name: "Morocco", lang: "ar", region: "ma", tax: 1 },
  { name: "Netherlands", lang: "nl", region: "nl", tax: 1 },
  { name: "New Zealand", lang: "en", region: "nz", tax: 1 },
  { name: "Nicaragua", lang: "es", region: "ni", tax: 1 },
  { name: "Norway", lang: "no", region: "no", tax: 1 },
  { name: "Oman", lang: "ar", region: "om", tax: 1 },
  { name: "Panama", lang: "es", region: "pa", tax: 1 },
  { name: "Paraguay", lang: "es", region: "py", tax: 1 },
  { name: "Peru", lang: "es", region: "pe", tax: 1 },
  { name: "Philippines ", lang: "fil", region: "ph", tax: 1 },
  { name: "Poland", lang: "pl", region: "pl", tax: 1 },
  { name: "Portugal", lang: "pt", region: "pt", tax: 1 },
  { name: "Qatar", lang: "ar", region: "qa", tax: 1 },
  { name: "Republic of North Macedonia", lang: "mk", region: "mk", tax: 1 },
  { name: "Romania", lang: "ro", region: "ro", tax: 1 },
  { name: "Russia", lang: "ru", region: "ru", tax: 1 },
  { name: "Saudi Arabia", lang: "ar", region: "sa", tax: 1 },
  { name: "Serbia", lang: "sr", region: "rs", tax: 1 },
  { name: "Singapore", lang: "en", region: "sg", tax: 1 },
  { name: "Slovakia", lang: "sk", region: "sk", tax: 1 },
  { name: "Slovenia", lang: "sl", region: "si", tax: 1 },
  { name: "South Africa", lang: "en", region: "za", tax: 1 },
  { name: "Spain", lang: "es", region: "es", tax: 1 },
  { name: "Sweden", lang: "sv", region: "se", tax: 1 },
  { name: "Switzerland", lang: "de", region: "ch", tax: 1 },
  { name: "Taiwan", lang: "zh", region: "tw", tax: 1 },
  { name: "Thailand ", lang: "th", region: "th", tax: 1 },
  { name: "Tunisia", lang: "ar", region: "tn", tax: 1 },
  { name: "Turkey", lang: "tr", region: "tr", tax: 1 },
  { name: "Ukraine", lang: "uk", region: "ua", tax: 1 },
  { name: "United Arab Emirates", lang: "ar", region: "ae", tax: 1 },
  { name: "United Kingdom", lang: "en", region: "gb", tax: 1 },
  { name: "United States", lang: "en", region: "us", tax: 1 },
  { name: "Uruguay", lang: "es", region: "uy", tax: 1 },
  { name: "Vietnam", lang: "vi", region: "vn", tax: 1 },
];

async function requestTaxes() {
  console.log("Requesting taxes...⏳");
  try {
    const response = await fetch(`${IMPUESTITO_API_URL}/impuestito`, {});
    const data = await response.json();
    chrome.storage.local.set({ impuestito: data });
    console.log("Requesting taxes done ✅");
  } catch (error) {
    console.log("Error ❌");
    console.error("Error fetching taxes:", error);
  }
}

async function requestGamePass() {
  console.log("Requesting gamepass...⏳");
  try {
    // This Game Pass API is Open Source and you can host on your own! https://github.com/lucasromerodb/xbox-store-api
    const response = await fetch(`${GAMEPASS_API_URL}/api/gamepass/extension`, {});
    const data = await response.json();
    chrome.storage.local.set({ gamepass: data });
    console.log("Requesting gamepass done ✅");
  } catch (error) {
    console.log("Error ❌");
    console.error("Error fetching gamepass:", error);
  }
}

async function requestMarket() {
  console.log("Requesting markets...⏳");
  chrome.storage.sync.set({ market: { name: "Argentina", lang: "es", region: "ar", tax: 1 }});
  chrome.storage.local.set({ markets: markets });
  console.log("Requesting market done ✅");
}


chrome.runtime.onInstalled.addListener(async () => {
  chrome.storage.sync.set({ updates: "IMPUESTITO_HAS_UPDATES" });

  // create alarm after extension is installed / upgraded
  // https://levelup.gitconnected.com/how-to-use-background-script-to-fetch-data-in-chrome-extension-ef9d7f69625d
  // https://www.section.io/engineering-education/how-to-build-a-chrome-extension-using-javascript/
  chrome.alarms.create("requestTaxes", { periodInMinutes: 60 }); // Ej: minutes = hours * 60
  chrome.alarms.create("requestGamePass", { periodInMinutes: 60 }); // Ej: minutes = hours * 60
  await requestTaxes();
  await requestGamePass();
  await requestMarket();
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  console.log("⏰ Alarm:", alarm);
  await requestTaxes();
  await requestGamePass();
  await requestMarket();
});


