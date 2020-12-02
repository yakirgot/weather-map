import { WeatherDetailsModel } from "./weather-details.model";
import { CityCountryWeatherRequestData } from "../models/city-country-weather-request-data";
import { WeatherResponse } from "../models/weather-response";
import { WeatherApi } from "../services/weather-api";

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

  updateWeatherDetails(
    event: CustomEvent<CityCountryWeatherRequestData>
  ): void {
    void this.weatherApi
      .getWeatherByCityAndCountry(event.detail)
      .then((weatherResponse: WeatherResponse) => {
        const headerText = weatherResponse.weather[0].main;
        const headerImageUrl = weatherResponse.weather[0].icon;
        const description = weatherResponse.weather[0].description;
        const temperatureInCelsius = Math.round(weatherResponse.main.temp);

        const model = new WeatherDetailsModel();
        model.headerText = `${headerText} at ${weatherResponse.name}`;
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
      });
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

    if (temperatureInCelsius) {
      const temperatureElement: HTMLSpanElement | null = element.querySelector(
        "#weather-details-temperature"
      );
      if (temperatureElement) {
        temperatureElement.textContent = `${temperatureInCelsius}℃`;
      }
    }
  }
}
