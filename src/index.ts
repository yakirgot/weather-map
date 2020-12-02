import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles.css";

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

    if (!this.weatherForm) {
      return;
    }

    const cityInput: HTMLInputElement | null = this.weatherForm.querySelector(
      "#location-city-input"
    );
    const city: string | undefined = cityInput?.value?.trim();

    const countryInput: HTMLInputElement | null = this.weatherForm.querySelector(
      "#location-country-input"
    );
    const country: string | undefined = countryInput?.value?.trim();

    console.log({ city, country });
  }
}

new WeatherForm();
