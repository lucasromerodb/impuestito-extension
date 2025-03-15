function toggleMenu(visibility = true) {
  const menuElement = document.querySelector(".gp-menu");
  visibility ? menuElement.classList.add("visible") : menuElement.classList.remove("visible");
}

function selectCountry(region) {
  console.log(region);
  if (!region) return;

  chrome.storage.local.get(["markets"], (data) => {
    const market = data.markets.find((m) => region === m.region);

    chrome.storage.sync.set({ market: market });
    window.location.reload();
  });
}

function drawMenu(markets) {
  const options = markets.map((m) => `<option value="${m.region}">${m.name}</option>`);

  const newElement = `
    <div class="gp-menu">
      <div class="gp-menu_box">
        <select>
          <option>Select your country</option>
          ${options.join("\n")}
        </select>
      </div>
    </div>
  `;

  const targetElement = document.getElementsByTagName("body")[0];
  targetElement.insertAdjacentHTML("afterbegin", newElement);
}
