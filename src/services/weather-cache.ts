export class WeatherCache {
  private readonly cacheName: string;

  constructor() {
    this.cacheName = "weatherCache";

    void caches.delete(this.cacheName);
  }

  async addToCache(url: string): Promise<void> {
    const cache: Cache = await caches.open(this.cacheName);

    return cache.add(url);
  }

  async retrieveFromCache(url: string): Promise<Response | undefined> {
    const cache: Cache = await caches.open(this.cacheName);

    return cache.match(url);
  }
}
