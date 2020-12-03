import { WeatherDetailsModel } from "./weather-details.model";
import { CityCountryWeatherRequestData } from "../models/city-country-weather-request-data";
import { WeatherResponse } from "../models/weather-response";
import { WeatherApi } from "../services/weather-api";
import { CoordinatesWeatherRequestData } from "../models/coordinates-weather-request-data";

export class WeatherDetails {
  private readonly weatherApi: WeatherApi;
  private readonly weatherDetailsTemplate: HTMLTemplateElement | null;
  private readonly weatherDetailsContainer: HTMLDivElement | null;

  constructor() {
    this.weatherApi = new WeatherApi();
    this.weatherDetailsTemplate = document.querySelector(
      "#weather-details-template"
    );
    this.weatherDetailsContainer = document.querySelector(
      "#weather-details-container"
    );
  }

  private static populateDetailsElementWithDetails(
    weatherDetails: WeatherDetailsModel,
    element: Element
  ): void {
    const {
      headerText,
      headerImageUrl,
      description,
      temperatureInCelsius,
    } = weatherDetails;

    const headerTextElement: HTMLSpanElement | null = element.querySelector(
      "#weather-details-header-text"
    );
    if (headerTextElement) {
      headerTextElement.textContent = headerText;
    }

    const headerImageElement = element.querySelector(
      "#weather-details-header-image"
    );
    if (headerImageElement) {
      headerImageElement.setAttribute("src", headerImageUrl);
    }

    const descriptionElement: HTMLSpanElement | null = element.querySelector(
      "#weather-details-description"
    );
    if (descriptionElement) {
      descriptionElement.textContent = description;
    }

    if (temperatureInCelsius !== null) {
      const temperatureElement: HTMLSpanElement | null = element.querySelector(
        "#weather-details-temperature"
      );
      if (temperatureElement) {
        temperatureElement.textContent = `${temperatureInCelsius}℃`;
      }
    }
  }

  private static getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  updateWeatherDetailsByCityCountry(
    event: CustomEvent<CityCountryWeatherRequestData>
  ): void {
    this.weatherApi
      .getWeatherByCityAndCountry(event.detail)
      .then(this.handleWeatherResponse.bind(this))
      .catch(this.showError.bind(this));
  }

  updateWeatherDetailsByRandomLocation(): void {
    const data: CoordinatesWeatherRequestData = new CoordinatesWeatherRequestData(
      WeatherDetails.getRandomArbitrary(-90, 90),
      WeatherDetails.getRandomArbitrary(-180, 180)
    );

    this.weatherApi
      .getWeatherByLatitudeAndLongitude(data)
      .then(this.handleWeatherResponse.bind(this))
      .catch(this.showError.bind(this));
  }

  private showError(error: string): void {
    if (!this.weatherDetailsContainer) {
      return;
    }

    this.weatherDetailsContainer.textContent = "";

    const div = document.createElement("div");
    div.classList.add("alert", "alert-danger", "mt-3");
    div.setAttribute("role", "alert");
    div.textContent = error;

    this.weatherDetailsContainer.appendChild(div);
  }

  private handleWeatherResponse(weatherResponse: WeatherResponse): void {
    const headerText = weatherResponse.weather[0].main;
    const headerImageUrl = weatherResponse.weather[0].icon;
    const description = weatherResponse.weather[0].description;
    const temperatureInCelsius = Math.round(weatherResponse.main.temp);

    const model = new WeatherDetailsModel();
    model.headerText = `${headerText} at ${weatherResponse.name || "unknown"}`;
    if (headerImageUrl) {
      model.headerImageUrl = `http://openweathermap.org/img/wn/${headerImageUrl}@2x.png`;
    }
    model.description = description;
    model.temperatureInCelsius = temperatureInCelsius;

    if (!this.weatherDetailsTemplate || !this.weatherDetailsContainer) {
      return;
    }

    const firstElementChild: Element | null = this.weatherDetailsTemplate
      .content.firstElementChild;

    if (firstElementChild) {
      this.weatherDetailsContainer.innerHTML = "";
      WeatherDetails.populateDetailsElementWithDetails(
        model,
        firstElementChild
      );

      const clone: Node = firstElementChild.cloneNode(true);

      this.weatherDetailsContainer.appendChild(clone);
    }
  }
}
