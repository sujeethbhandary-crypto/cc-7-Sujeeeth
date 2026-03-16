// src/api/APIService.ts

/**
 * Represents a blog post returned from the API.
 */
export interface Post {
  /** Unique identifier of the post */
  id: number;

  /** ID of the user who created the post */
  userId: number;

  /** Title of the post */
  title: string;

  /** Body content of the post */
  body: string;
}

/**
 * Represents a comment associated with a post.
 */
export interface Comment {
  /** Unique identifier of the comment */
  id: number;

  /** ID of the post this comment belongs to */
  postId: number;

  /** Name of the commenter */
  name: string;

  /** Email address of the commenter */
  email: string;

  /** Comment text */
  body: string;
}

/**
 * APIService handles all network requests to the JSONPlaceholder API.
 * It provides methods to fetch posts and comments.
 */
export class APIService {
  /** Base URL for the JSONPlaceholder API */
  private BASE_URL = "https://jsonplaceholder.typicode.com";

  /**
   * Fetches all posts from the API.
   *
   * @returns A promise resolving to an array of posts
   * @throws Error if the request fails
   */
  async fetchPosts(): Promise<Post[]> {
    const res = await fetch(`${this.BASE_URL}/posts`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
  }

  /**
   * Fetches a single post by its ID.
   *
   * @param id - The ID of the post to retrieve
   * @returns A promise resolving to the requested post
   * @throws Error if the request fails
   */
  async fetchPost(id: number): Promise<Post> {
    const res = await fetch(`${this.BASE_URL}/posts/${id}`);
    if (!res.ok) throw new Error("Failed to fetch post");
    return res.json();
  }

  /**
   * Fetches comments associated with a specific post.
   *
   * @param postId - ID of the post whose comments should be retrieved
   * @returns A promise resolving to an array of comments
   * @throws Error if the request fails
   */
  async fetchComments(postId: number): Promise<Comment[]> {
    const res = await fetch(`${this.BASE_URL}/posts/${postId}/comments`);
    if (!res.ok) throw new Error("Failed to fetch comments");
    return res.json();
  }
}
