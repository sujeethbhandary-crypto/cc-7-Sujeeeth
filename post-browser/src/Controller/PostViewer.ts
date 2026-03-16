import type { Post, Comment } from "../services/APIService.js";
import { APIService } from "../services/APIService.js";
import { CacheService } from "../services/CacheService.js";
import { CommentList } from "../modules/commentList.js";

/**
 * PostViewer is responsible for displaying posts one at a time
 * and allowing navigation between posts. It also provides
 * functionality to fetch and display comments for the current post.
 */
export class PostViewer {
  /** Root container where the post viewer UI is rendered */
  private container: HTMLElement;

  /** API service used to fetch posts and comments */
  private api: APIService;

  /** Cache for storing fetched posts */
  private postsCache: CacheService<Post[]>;

  /** Cache for storing comments per post */
  private commentCache: CacheService<Comment[]>;

  /** List of posts fetched from the API */
  private posts: Post[] = [];

  /** Index of the currently displayed post */
  private currentIndex: number = 0;

  /**
   * Creates a new PostViewer instance.
   *
   * @param container - DOM element where the viewer will be rendered
   * @param api - APIService instance used for fetching data
   * @param postsCache - Cache service for storing posts
   * @param commentCache - Cache service for storing comments
   */
  constructor(
    container: HTMLElement,
    api: APIService,
    postsCache: CacheService<Post[]>,
    commentCache: CacheService<Comment[]>,
  ) {
    this.container = container;
    this.api = api;
    this.postsCache = postsCache;
    this.commentCache = commentCache;
  }

  /**
   * Initializes the PostViewer.
   * Loads posts from cache if available, otherwise fetches them from the API.
   * Displays the first post once the posts are loaded.
   */
  async init() {
    let posts = this.postsCache.get("posts");

    if (!posts) {
      posts = await this.api.fetchPosts();
      this.postsCache.set("posts", posts);
    }

    this.posts = posts;

    if (this.posts.length > 0) {
      this.renderPost(0);
    }
  }

  /**
   * Renders a post based on the provided index.
   * Updates the UI and sets up navigation and comment buttons.
   *
   * @param index - Index of the post to display
   */
  private async renderPost(index: number) {
    if (index < 0 || index >= this.posts.length) return;

    this.currentIndex = index;
    const post = this.posts[index];

    const commentsContainerId = `comments-${post.id}`;

    this.container.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      <p><strong>Post ${this.currentIndex + 1} of ${this.posts.length}</strong></p>
      <div>
        <button id="prev-post"><- Back</button>
        <button id="next-post">Next -></button>
        <button id="show-comments">Show Comments</button>
        <button id="refresh-comments">Refresh Comments</button>
      </div>
      <div id="${commentsContainerId}" style="display:none;"></div>
    `;

    const prevBtn = this.container.querySelector(
      "#prev-post",
    ) as HTMLButtonElement;

    const nextBtn = this.container.querySelector(
      "#next-post",
    ) as HTMLButtonElement;

    const showCommentsBtn = this.container.querySelector(
      "#show-comments",
    ) as HTMLButtonElement;

    const refreshCommentsBtn = this.container.querySelector(
      "#refresh-comments",
    ) as HTMLButtonElement;

    const commentsContainer = this.container.querySelector(
      `#${commentsContainerId}`,
    ) as HTMLElement;

    const commentsComponent = new CommentList(
      commentsContainer,
      this.api,
      this.commentCache,
    );

    prevBtn.addEventListener("click", () =>
      this.renderPost(this.currentIndex - 1),
    );

    nextBtn.addEventListener("click", () =>
      this.renderPost(this.currentIndex + 1),
    );

    /**
     * Fetches and displays comments for the current post.
     */
    showCommentsBtn.addEventListener("click", async () => {
      await commentsComponent.render(post.id);
      commentsContainer.style.display = "block";
    });

    /**
     * Forces a refresh of comments from the API,
     * bypassing the cache.
     */
    refreshCommentsBtn.addEventListener("click", async () => {
      await commentsComponent.render(post.id, true);
      commentsContainer.style.display = "none";
    });
  }
}
