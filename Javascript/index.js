document.addEventListener("DOMContentLoaded", function () {
  let selectedTimezone = null;
  let intervalId = null;

  function updateDefaultClocks() {
    // Los Angeles
    let losAngelesElement = document.querySelector("#los-angeles");
    let losAngelesDateElement = losAngelesElement.querySelector(".date");
    let losAngelesTimeElement = losAngelesElement.querySelector(".time");
    let losAngelesTime = moment().tz("America/Los_Angeles");
    losAngelesDateElement.innerHTML = losAngelesTime.format("MMMM Do YYYY");
    losAngelesTimeElement.innerHTML = losAngelesTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );

    // Paris
    let parisElement = document.querySelector("#paris");
    let parisDateElement = parisElement.querySelector(".date");
    let parisTimeElement = parisElement.querySelector(".time");
    let parisTime = moment().tz("Europe/Paris");
    parisDateElement.innerHTML = parisTime.format("MMMM Do YYYY");
    parisTimeElement.innerHTML = parisTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }

  function updateSelectedCityClock() {
    if (!selectedTimezone) return;
    let cityTime = moment().tz(selectedTimezone);
    let dateElement = document.querySelector(".city.selected .date");
    let timeElement = document.querySelector(".city.selected .time");
    if (dateElement && timeElement) {
      dateElement.innerHTML = cityTime.format("MMMM Do YYYY");
      timeElement.innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");
    }
  }

  function updateCity(event) {
    selectedTimezone = event.target.value;
    if (!selectedTimezone) return;

    // Stop the default clocks interval
    if (intervalId) clearInterval(intervalId);

    if (selectedTimezone === "current") {
      selectedTimezone = moment.tz.guess();
    }

    let cityTime = moment().tz(selectedTimezone);
    let citiesElement = document.querySelector("#cities");
    let cityName = selectedTimezone.split("/")[1].replace("_", " ");
    let newCityHTML = `
      <div class="city selected">
        <div>
          <h2>${cityName}</h2>
          <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
        </div>
        <div class="time">${cityTime.format(
          "h:mm:ss [<small>]A[</small>]"
        )}</div>
      </div>
    `;
    citiesElement.innerHTML = newCityHTML;

    // Start interval for selected city
    intervalId = setInterval(updateSelectedCityClock, 1000);
  }

  // On load, show LA and Paris clocks and update every second
  updateDefaultClocks();
  intervalId = setInterval(updateDefaultClocks, 1000);

  let citiesSelectElement = document.querySelector("#city");
  citiesSelectElement.addEventListener("change", updateCity);
});
