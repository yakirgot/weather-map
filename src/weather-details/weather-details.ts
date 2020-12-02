import { WeatherDetailsModel } from "./weather-details.model";

export class WeatherDetails {
  private readonly weatherDetailsTemplate: HTMLTemplateElement | null;
  private readonly weatherDetailsContainer: HTMLDivElement | null;

  constructor() {
    this.weatherDetailsTemplate = document.querySelector(
      "#weather-details-template"
    );
    this.weatherDetailsContainer = document.querySelector(
      "#weather-details-container"
    );
  }

  updateWeatherDetails(weatherDetails: WeatherDetailsModel): void {
    if (!this.weatherDetailsTemplate || !this.weatherDetailsContainer) {
      return;
    }

    const firstElementChild: Element | null = this.weatherDetailsTemplate
      .content.firstElementChild;

    if (firstElementChild) {
      this.populateDetailsElementWithDetails(weatherDetails, firstElementChild);

      const clone: Node = firstElementChild.cloneNode(true);

      this.weatherDetailsContainer.appendChild(clone);
    }
  }

  private populateDetailsElementWithDetails(
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
