import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles.css";
import { WeatherForm } from "./weather-form/weather-form";

new WeatherForm();

document.addEventListener("weatherFormSubmit", console.log);
