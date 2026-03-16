// src/services/CacheService.ts

/**
 * CacheService provides a simple in-memory caching mechanism
 * using a Map. It allows storing, retrieving, deleting,
 * and clearing cached data.
 *
 * @typeParam T - The type of value being stored in the cache
 */
export class CacheService<T> {
  /** Internal storage for cached values */
  private cache: Map<string, T> = new Map();

  /**
   * Stores a value in the cache.
   *
   * @param key - Unique key used to store the value
   * @param value - The value to be cached
   */
  set(key: string, value: T): void {
    this.cache.set(key, value);
  }

  /**
   * Retrieves a value from the cache.
   *
   * @param key - Key of the cached value
   * @returns The cached value if it exists, otherwise undefined
   */
  get(key: string): T | undefined {
    return this.cache.get(key);
  }

  /**
   * Removes a specific value from the cache.
   *
   * @param key - Key of the cached value to delete
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clears all cached entries.
   */
  clear(): void {
    this.cache.clear();
  }
}
