/**
 * Tests for APIService class
 * Verifies fetching posts and comments using mocked fetch API
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { APIService } from "./7th_Assignment.js";
import type { Post, Comments } from "./interface.js";

describe("APIService", () => {
  /** Instance of APIService used for testing */
  const api = new APIService();

  /**
   * Reset all mocks before every test
   * Ensures previous test mocks do not affect the next test
   */
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  /**
   * Test successful post fetch
   * Verifies that fetchPost returns the correct Post object
   */
  it("should fetch a post successfully", async () => {
    const mockPost: Post = {
      userId: 1,
      id: 1,
      title: "Test Post",
      body: "This is a test post",
    };

    /** Mock the global fetch API */
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPost,
    } as Response);

    const result = await api.fetchPost(1);

    /** Verify returned data matches mock post */
    expect(result).toEqual(mockPost);

    /** Verify correct API endpoint was called */
    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts/1",
    );
  });

  /**
   * Test error handling when post fetch fails
   * Ensures function throws an exception
   */
  it("should throw error if post fetch fails", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    } as Response);

    await expect(api.fetchPost(1)).rejects.toThrow("Failed to fetch Post");
  });

  /**
   * Test fetching comments with a limit
   * Ensures only the requested number of comments are returned
   */
  it("should fetch comments with limit", async () => {
    const mockComments: Comments[] = [
      {
        postId: 1,
        id: 1,
        name: "comment1",
        email: "a@test.com",
        body: "Comment body 1",
      },
      {
        postId: 1,
        id: 2,
        name: "comment2",
        email: "b@test.com",
        body: "Comment body 2",
      },
      {
        postId: 1,
        id: 3,
        name: "comment3",
        email: "c@test.com",
        body: "Comment body 3",
      },
    ];

    /** Mock fetch response for comments */
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockComments,
    } as Response);

    const result = await api.fetchComments(1, 2);

    /** Verify only 2 comments are returned */
    expect(result.length).toBe(2);

    /** Verify returned comments match sliced mock data */
    expect(result).toEqual(mockComments.slice(0, 2));
  });

  /**
   * Test error handling when comments fetch fails
   */
  it("should throw error if comments fetch fails", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    } as Response);

    await expect(api.fetchComments(1, 3)).rejects.toThrow(
      "Failed to fetch commemt",
    );
  });
});
