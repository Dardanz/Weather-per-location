const API_KEY = "d07db510898144b39bb133838231904";

const domManip = (() => {
  const searchButton = document.querySelector(".search-button");
  const clearButton = document.querySelector(".reset-button");
  searchButton.addEventListener("click", fetchCurrentWeather);
  clearButton.addEventListener("click", clearSearch);

  async function fetchCurrentWeather() {
    try {
      const searchCity = document.getElementById("search-city").value;
      const searchState = document.getElementById("search-state").value;
      const searchCountry = document.getElementById("search-country").value;
      const response = await fetch("http://api.weatherapi.com/v1/current.json?key=" + API_KEY + "&q=" + searchCity + "," + searchState + "," + searchCountry + "&units=imperial");
      const data = await response.json();
      const currentData = data.current;

      const currentWeather = {
        mainWeather: currentData.condition.text,
        place: data.location.name + ", " + data.location.region + " " + data.location.country,
        temp: Math.round(currentData.temp_f),
        humidity: currentData.humidity + "%",
        wind: Math.round(currentData.wind_mph) + " MPH"
      };

      console.log(currentWeather);

      function displayWeather(weatherData) {
        const place = document.querySelector(".place");
        const temperature = document.querySelector(".temperature");
        const humidity = document.querySelector(".humidity");
        const wind = document.querySelector(".wind");

        place.textContent = weatherData.place;
        temperature.textContent = `${weatherData.temp}°F`;
        humidity.textContent = `Humidity: ${weatherData.humidity}`;
        wind.textContent = `Wind: ${weatherData.wind}`;
      }

      displayWeather(currentWeather);
    } catch (error) {
      console.log(error);
    }
  }

  function clearDOM() {
    const place = document.querySelector(".place");
    const temperature = document.querySelector(".temperature");
    const humidity = document.querySelector(".humidity");
    const wind = document.querySelector(".wind");
    const img = document.querySelector("img");
    
    place.textContent = "";
    temperature.textContent = "";
    humidity.textContent = "";
    wind.textContent = "";
    img.src = "";
    img.style.display = "none";
  }
  

  function clearSearch() {
    document.getElementById("search-city").value = "";
    document.getElementById("search-state").value = "";
    document.getElementById("search-country").value = "";
    clearDOM();
  }
  

  return {
    fetchCurrentWeather,
    clearSearch
  };
})();
