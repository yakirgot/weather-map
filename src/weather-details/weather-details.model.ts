export class WeatherDetailsModel {
  headerText: string;
  headerImageUrl: string;
  description: string;
  temperatureInCelsius: number | null;

  constructor() {
    this.headerText = "";
    this.headerImageUrl = "";
    this.description = "";
    this.temperatureInCelsius = null;
  }
}
