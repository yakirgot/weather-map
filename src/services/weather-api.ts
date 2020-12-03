import { WeatherResponse } from "../models/weather-response";
import { WeatherNotFoundResponse } from "../models/weather-not-found-response";
import { CoordinatesWeatherRequestData } from "../models/coordinates-weather-request-data";
import { CityCountryWeatherRequestData } from "../models/city-country-weather-request-data";
import { WeatherCache } from "./weather-cache";

export class WeatherApi {
  private readonly baseUrl = "http://api.openweathermap.org/data/2.5/weather";
  private readonly appId = "df2f0ccf23547ccff8b15b21af49ae31";
  private readonly weatherCache: WeatherCache;

  constructor() {
    this.weatherCache = new WeatherCache();
  }

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
    url.searchParams.append("appid", this.appId);
    url.searchParams.append("units", "metric");

    try {
      const request = await this.getRequestFromCacheOrServer(url.toString());

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

  private async getRequestFromCacheOrServer(url: string): Promise<Response> {
    const cacheResponse = await this.weatherCache.retrieveFromCache(url);

    if (cacheResponse) {
      return cacheResponse;
    } else {
      await this.weatherCache.addToCache(url);

      return await fetch(url);
    }
  }
}
