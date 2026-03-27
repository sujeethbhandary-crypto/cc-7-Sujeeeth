import { test, expect } from "@playwright/test";

/**
 * End-to-end test suite for the Post Viewer application.
 * Covers initial load, navigation, comments, error handling, and refresh behavior.
 */
test.describe("Post Viewer E2E", () => {
  /**
   * Verifies that the first post is displayed on initial page load.
   * Ensures title is not empty and metadata shows POST #1.
   */
  test("should load first post on initial load", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("#post-title");

    await expect(page.locator("#post-title")).not.toBeEmpty();
    await expect(page.locator("#post-meta")).toContainText("POST #1");
  });

  /**
   * Verifies that clicking the "Next" button loads the next post.
   * Ensures metadata updates to POST #2.
   */
  test("should navigate to next post", async ({ page }) => {
    await page.goto("/");
    await page.click("#next-btn");
    await page.waitForSelector("#post-meta");

    await expect(page.locator("#post-meta")).toContainText("POST #2");
  });

  /**
   * Verifies that clicking the "Previous" button navigates back
   * to the first post after moving forward.
   */
  test("should navigate to previous post", async ({ page }) => {
    await page.goto("/");
    await page.click("#next-btn");
    await page.click("#prev-btn");
    await page.waitForSelector("#post-meta");

    await expect(page.locator("#post-meta")).toContainText("POST #1");
  });

  /**
   * Verifies that clicking "View Comments" loads and displays
   * the comments section.
   */
  test("should load comments when clicking view comments", async ({ page }) => {
    await page.goto("/");
    await page.click("#view-comments-btn");
    await page.waitForSelector("#comments-section");

    await expect(page.locator("#comments-section")).toBeVisible();
  });

  /**
   * Verifies that the application handles API failure gracefully.
   * Simulates a 500 server error for post fetch and checks if
   * an error message is displayed in the UI.
   */
  test("should handle post fetch failure", async ({ page }) => {
    await page.route("**/posts/*", (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      });
    });

    await page.goto("/");

    await expect(page.locator("#post-title")).toContainText("Error");

    await page.unroute("**/posts/*");
  });

  /**
   * Verifies that clicking the "Refresh" button resets the viewer
   * back to the first post after navigating forward.
   */
  test("refresh should reset to first post", async ({ page }) => {
    await page.goto("/");
    await page.click("#next-btn");
    await expect(page.locator("#post-meta")).toContainText("POST #2");

    await page.click("#refresh-btn");
    await page.waitForSelector("#post-meta");

    await expect(page.locator("#post-meta")).toContainText("POST #1");
  });
});
