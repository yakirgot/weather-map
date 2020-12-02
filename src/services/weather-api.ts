import { WeatherResponse } from "../models/weather-response";
import { WeatherNotFoundResponse } from "../models/weather-not-found-response";
import { CoordinatesWeatherRequestData } from "../models/coordinates-weather-request-data";
import { CityCountryWeatherRequestData } from "../models/city-country-weather-request-data";

export class WeatherApi {
  private readonly baseUrl = "http://api.openweathermap.org/data/2.5/weather";
  private readonly appId = "df2f0ccf23547ccff8b15b21af49ae31";

  async getWeatherByCityAndCountry(
    data: CityCountryWeatherRequestData
  ): Promise<WeatherResponse> {
    const { city, country } = data;
    const url = new URL(this.baseUrl);
    url.searchParams.append("q", `${city},${country}`);

    const request = this.getWeatherRequest(url);

    return request;
  }

  async getWeatherByLatitudeAndLongitude(
    data: CoordinatesWeatherRequestData
  ): Promise<WeatherResponse> {
    const { longitude, latitude } = data;
    const url = new URL(this.baseUrl);
    url.searchParams.append("lon", `${longitude}`);
    url.searchParams.append("lat", `${latitude}`);

    const request = this.getWeatherRequest(url);

    return request;
  }

  private async getWeatherRequest(url: URL): Promise<WeatherResponse> {
    try {
      url.searchParams.append("appid", this.appId);

      const request = await fetch(url.toString());
      const json:
        | WeatherResponse
        | WeatherNotFoundResponse = await request.json();

      if (json.cod === 200) {
        return json as WeatherResponse;
      } else {
        return Promise.reject((json as WeatherNotFoundResponse).message);
      }
    } catch (e) {
      return Promise.reject(e.message);
    }
  }
}
