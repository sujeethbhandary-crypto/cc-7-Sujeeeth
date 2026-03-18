import "./styles/style.css";
import { APIService } from "./services/APIService";
import { CacheService } from "./services/CacheService";
import { PostViewer } from "./Controller/PostViewer";
import type { Post, Comment } from "./services/APIService";

/** Services */
const api = new APIService();
const postCache = new CacheService<Post>();
const commentCache = new CacheService<Comment[]>();

/** Initialize PostViewer */
const viewer = new PostViewer(api, postCache, commentCache);
viewer.init();
