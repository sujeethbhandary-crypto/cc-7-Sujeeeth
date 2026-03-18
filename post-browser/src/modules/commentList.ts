import type { Comment } from "../services/APIService.js";
import { APIService } from "../services/APIService.js";
import { CacheService } from "../services/CacheService.js";

/**
 * CommentList is responsible for fetching and rendering
 * comments for a given post inside a specified container.
 * It also supports caching to avoid unnecessary API calls.
 */
export class CommentList {
  /** Container where the comments will be rendered */
  private container: HTMLElement;

  /** API service used to fetch comments */
  private api: APIService;

  /** Cache used to store comments by post ID */
  private cache: CacheService<Comment[]>;

  /**
   * Creates a new CommentList instance.
   *
   * @param container - DOM element where comments will be displayed
   * @param api - APIService instance used for fetching comments
   * @param cache - CacheService instance used to cache comments
   */
  constructor(
    container: HTMLElement,
    api: APIService,
    cache: CacheService<Comment[]>,
  ) {
    this.container = container;
    this.api = api;
    this.cache = cache;
  }

  /**
   * Fetches and renders comments for a specific post.
   * If cached comments are available, they will be used unless
   * a forced refresh is requested.
   *
   * @param postId - ID of the post whose comments should be displayed
   * @param forceRefresh - If true, bypasses the cache and fetches fresh comments
   */
  async render(postId: number, forceRefresh = false) {
    let comments = this.cache.get(postId.toString());
    const isFetching = !comments || forceRefresh;

    if (isFetching) {
      this.container.innerHTML = `<div class="loading">Loading comments...</div>`;
      await new Promise((res) => setTimeout(res, 200));
    }

    if (!comments || forceRefresh) {
      comments = await this.api.fetchComments(postId);
      this.cache.set(postId.toString(), comments);
    }

    this.container.innerHTML = comments
      .map(
        (c) => `
      <div class="comment">
        <h4>${c.name} (${c.email})</h4>
        <p>${c.body}</p>
      </div>
    `,
      )
      .join("");
  }
}
