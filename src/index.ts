import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles.css";
import { WeatherForm } from "./weather-form/weather-form";
import { WeatherDetails } from "./weather-details/weather-details";
import { CityCountryWeatherRequestData } from "./models/city-country-weather-request-data";

function initWeatherMap(): void {
  new WeatherForm();
  const weatherDetails = new WeatherDetails();

  document.addEventListener(
    "weatherFormSubmit",
    (event: CustomEvent<CityCountryWeatherRequestData>) =>
      weatherDetails.updateWeatherDetails(event)
  );
}

initWeatherMap();
