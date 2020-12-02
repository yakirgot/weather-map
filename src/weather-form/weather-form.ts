import { CityCountryWeatherRequestData } from "../models/city-country-weather-request-data";

export class WeatherForm {
  private weatherForm: HTMLFormElement | null;

  constructor() {
    this.weatherForm = null;

    this.initWeatherForm();
  }

  private initWeatherForm(): void {
    this.weatherForm = document.querySelector("#location-form");

    this.weatherForm?.addEventListener(
      "submit",
      this.handleWeatherFormSubmit.bind(this)
    );
  }

  private handleWeatherFormSubmit(event: Event): void {
    event.preventDefault();

    const city: string | undefined = this.getValueFromInput(
      "location-city-input"
    );
    const country: string | undefined = this.getValueFromInput(
      "location-country-input"
    );

    if (city && country) {
      const requestData = new CityCountryWeatherRequestData(city, country);
      const weatherFormSubmitEvent = new CustomEvent("weatherFormSubmit", {
        detail: requestData,
      });
      document.dispatchEvent(weatherFormSubmitEvent);
    }
  }

  private getValueFromInput(id: string): string | undefined {
    if (!this.weatherForm) {
      return;
    }

    const Input: HTMLInputElement | null = this.weatherForm.querySelector(
      `#${id}`
    );
    const value: string | undefined = Input?.value?.trim();

    return value;
  }
}
