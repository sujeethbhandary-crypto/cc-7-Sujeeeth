import "./styles/style.css";
import { APIService } from "./services/APIService";
import { CacheService } from "./services/CacheService";
import { PostViewer } from "./Controller/PostViewer";
import type { Post, Comment } from "./services/APIService";

/**
 * Entry point of the Post Browser application.
 *
 * This file initializes the core services required for the app:
 * - APIService for fetching posts and comments
 * - CacheService for storing posts and comments locally
 * - PostViewer for rendering posts and handling navigation
 */

/** API service instance used for all network requests */
const api = new APIService();

/** Cache for storing fetched posts */
const postsCache = new CacheService<Post[]>();

/** Cache for storing comments per post */
const commentCache = new CacheService<Comment[]>();

/**
 * Root container where the post viewer UI will be rendered.
 * The `!` non-null assertion assumes the element exists in the HTML.
 */
const postContainer = document.getElementById("post-details")!;

/**
 * Initializes the PostViewer component which manages:
 * - Post navigation (Next / Back)
 * - Displaying post content
 * - Fetching and rendering comments
 */
const carousel = new PostViewer(postContainer, api, postsCache, commentCache);

/** Start the application */
carousel.init();
