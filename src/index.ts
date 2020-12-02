import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles.css";
import { WeatherForm } from "./weather-form/weather-form";
import { WeatherDetails } from "./weather-details/weather-details";
import { WeatherDetailsModel } from "./weather-details/weather-details.model";

new WeatherForm();

document.addEventListener("weatherFormSubmit", console.log);

const weatherDetails = new WeatherDetails();

const model = new WeatherDetailsModel();
model.headerText = "Clear in Berlin, Germany";
model.headerImageUrl = "http://openweathermap.org/img/wn/10d@2x.png";
model.description = "clear sky";
model.temperatureInCelsius = 2;

weatherDetails.updateWeatherDetails(model);
