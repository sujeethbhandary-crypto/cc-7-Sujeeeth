/**
 * APIService provides methods to fetch posts and comments
 * from the JSONPlaceholder API.
 */

import type { Post, Comments } from "./interface.js";

export class APIService {
  /**
   * Fetch a post by its id.
   * @param id - Post ID
   * @returns Promise resolving to a Post object
   * @throws Error if the request fails
   */
  async fetchPost(id: number): Promise<Post> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Post");
    }

    const data: Post = await response.json();
    return data;
  }

  /**
   * Fetch comments for a given post.
   * Returns only the first `count` comments.
   * @param id - Post ID
   * @param count - Number of comments to return
   * @returns Promise resolving to an array of Comments
   * @throws Error if the request fails
   */
  async fetchComments(id: number, count: number): Promise<Comments[]> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch commemt");
    }

    const data: Comments[] = await response.json();

    return data.slice(0, count);
  }
}

/**
 * Example usage of APIService
 */
const api = new APIService();

try {
  const postData = await api.fetchPost(2);
  console.log(postData);
} catch (error) {
  console.error("Error occurred:", error);
}

try {
  const postData = await api.fetchPost(22112);
  console.log(postData);
} catch (error) {
  console.error("Error occurred:", error);
}

try {
  const commentData = await api.fetchComments(1, 3);
  console.log(commentData);
} catch (err) {
  console.log("Error Occured: ", err);
}

try {
  const commentData = await api.fetchComments(0, 3);
  console.log(commentData);
} catch (err) {
  console.error("Error Occured: ", err);
}
