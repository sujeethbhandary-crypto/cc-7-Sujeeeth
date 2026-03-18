import type { Post, Comment } from "../services/APIService";
import { APIService } from "../services/APIService";
import { CacheService } from "../services/CacheService";

/**
 * Handles post display, navigation, and comments
 */
export class PostViewer {
  private api: APIService;
  private postCache: CacheService<Post>;
  private commentCache: CacheService<Comment[]>;

  private currentId = 1;
  private MAX_POSTS = 100;

  private elements = {
    meta: document.getElementById("post-meta"),
    title: document.getElementById("post-title"),
    body: document.getElementById("post-body"),
    nextBtn: document.getElementById("next-btn") as HTMLButtonElement | null,
    prevBtn: document.getElementById("prev-btn") as HTMLButtonElement | null,
    refreshBtn: document.getElementById("refresh-btn"),
    viewCommentsBtn: document.getElementById(
      "view-comments-btn",
    ) as HTMLButtonElement | null,
    commentsContainer: document.getElementById("comments-section"),
  };

  constructor(
    api: APIService,
    postCache: CacheService<Post>,
    commentCache: CacheService<Comment[]>,
  ) {
    this.api = api;
    this.postCache = postCache;
    this.commentCache = commentCache;
  }

  /** Initialize app */
  init() {
    this.attachEvents();
    this.updateUI(this.currentId);
  }

  /** Attach all event listeners */
  private attachEvents() {
    this.elements.nextBtn?.addEventListener("click", () => {
      if (this.currentId < this.MAX_POSTS) {
        this.updateUI(++this.currentId);
      }
    });

    this.elements.prevBtn?.addEventListener("click", () => {
      if (this.currentId > 1) {
        this.updateUI(--this.currentId);
      }
    });

    this.elements.refreshBtn?.addEventListener("click", () => {
      this.postCache.clear();
      this.commentCache.clear();

      this.currentId = 1;
      this.updateUI(this.currentId);
    });

    this.elements.viewCommentsBtn?.addEventListener("click", async () => {
      await this.loadComments();
    });
  }

  /** Update post UI */
  private async updateUI(postId: number) {
    try {
      // Reset UI
      if (this.elements.title) this.elements.title.textContent = "Loading...";
      if (this.elements.body) this.elements.body.textContent = "";
      if (this.elements.meta) this.elements.meta.textContent = "";

      if (this.elements.viewCommentsBtn)
        this.elements.viewCommentsBtn.style.display = "block";

      if (this.elements.commentsContainer) {
        this.elements.commentsContainer.style.display = "none";
        this.elements.commentsContainer.innerHTML = "";
      }

      let post: Post;
      const key = postId.toString();

      if (this.postCache.get(key)) {
        post = this.postCache.get(key)!;
      } else {
        post = await this.api.fetchPost(postId);
        this.postCache.set(key, post);
      }

      if (this.elements.meta)
        this.elements.meta.textContent = `POST #${post.id} OF ${this.MAX_POSTS}`;

      if (this.elements.title) this.elements.title.textContent = post.title;

      if (this.elements.body) this.elements.body.textContent = post.body;

      if (this.elements.prevBtn) this.elements.prevBtn.disabled = postId <= 1;

      if (this.elements.nextBtn)
        this.elements.nextBtn.disabled = postId >= this.MAX_POSTS;
    } catch (err) {
      console.error(err);

      if (this.elements.title)
        this.elements.title.textContent = "Error loading post.";

      if (this.elements.body) this.elements.body.textContent = "";
      if (this.elements.meta) this.elements.meta.textContent = "";

      if (this.elements.prevBtn) this.elements.prevBtn.disabled = true;
      if (this.elements.nextBtn) this.elements.nextBtn.disabled = true;
    }
  }

  /** Load comments */
  private async loadComments() {
    try {
      const cacheKey = `comments-${this.currentId}`;
      let comments: Comment[];

      const cachedComments = this.commentCache.get(cacheKey);

      if (cachedComments) {
        comments = cachedComments;
      } else {
        comments = await this.api.fetchComments(this.currentId);
        this.commentCache.set(cacheKey, comments);
      }
      if (this.elements.viewCommentsBtn)
        this.elements.viewCommentsBtn.style.display = "none";

      if (this.elements.commentsContainer) {
        this.elements.commentsContainer.style.display = "block";
        this.elements.commentsContainer.innerHTML = `
          <h3>Recent Comments</h3>
          ${comments
            .map(
              (c) => `
            <div class="comment">
              <h4>${c.email}</h4>
              <p>${c.body}</p>
            </div>
          `,
            )
            .join("")}
        `;
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  }
}
