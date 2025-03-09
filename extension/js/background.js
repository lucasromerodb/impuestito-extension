async function requestData() {
  console.log("Working...⏳");
  try {
    const response = await fetch("https://impuestito-api-production.up.railway.app/impuestito", {});
    const data = await response.json();
    chrome.storage.sync.set({ data: { ...data } });
    console.log("Done ✅");
  } catch (error) {
    console.log("Error ❌");
    console.error("Error fetching data:", error);
  }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ updates: "hasUpdates" });

  // create alarm after extension is installed / upgraded
  // https://levelup.gitconnected.com/how-to-use-background-script-to-fetch-data-in-chrome-extension-ef9d7f69625d
  // https://www.section.io/engineering-education/how-to-build-a-chrome-extension-using-javascript/
  chrome.alarms.create("requestData", { periodInMinutes: 1440 }); // Ej: minutes = hours * 60
  requestData();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("⏰ Alarm:", alarm);
  requestData();
});