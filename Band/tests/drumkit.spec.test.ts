import { test, expect } from "@playwright/test";

/**
 * End-to-end test suite for Drum Kit Recorder App.
 * Covers recording, pausing, playback, and clearing functionality.
 */
test.describe("Drum Kit Recorder App", () => {
  /**
   * Runs before each test.
   * Navigates to the app and ensures the main button is visible.
   */
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
    await expect(page.locator("#startStopBtn")).toBeVisible();
  });

  /**
   * Test: Start and stop recording
   * - Starts recording
   * - Verifies mode changes to recording
   * - Stops recording
   * - Verifies mode returns to normal
   */
  test("should start and stop recording", async ({ page }) => {
    const startStopBtn = page.locator("#startStopBtn");
    const status = page.locator("#status");

    await startStopBtn.click();
    await expect(status).toContainText("recording-progress");

    await page.keyboard.press("a");
    await page.keyboard.press("s");

    await startStopBtn.click();
    await expect(status).toContainText("normal");
  });

  /**
   * Test: Record beats and verify count
   * - Starts recording
   * - Presses 3 keys
   * - Verifies beat count is updated
   */
  test("should record and update beat count", async ({ page }) => {
    const startStopBtn = page.locator("#startStopBtn");
    const status = page.locator("#status");

    await startStopBtn.click();

    await page.keyboard.press("a");
    await page.keyboard.press("s");
    await page.keyboard.press("d");

    await expect(status).toContainText("Beats: 3");

    await startStopBtn.click();
  });

  /**
   * Test: Pause and resume recording
   * - Starts recording
   * - Pauses recording
   * - Verifies button text changes to "Record ▶"
   * - Resumes recording
   * - Verifies button text changes back to "Pause ||"
   */
  test("should pause and resume recording", async ({ page }) => {
    const startStopBtn = page.locator("#startStopBtn");
    const pauseBtn = page.locator("#RecordingPausePlay");

    await startStopBtn.click();

    await expect(pauseBtn).toBeEnabled();

    // Pause recording
    await pauseBtn.click();
    await expect(pauseBtn).toHaveText("Record ▶");

    // Resume recording
    await pauseBtn.click();
    await expect(pauseBtn).toHaveText("Pause ||");

    await startStopBtn.click();
  });

  /**
   * Test: Playback recorded beats
   * - Records some beats
   * - Starts playback
   * - Waits for playback to begin
   * - Pauses playback
   * - Resumes playback
   */
  test("should play recorded beats", async ({ page }) => {
    const startStopBtn = page.locator("#startStopBtn");
    const playBtn = page.locator("#startPlayback");
    const toggleBtn = page.locator("#togglePlayback");
    const status = page.locator("#status");

    // Record beats
    await startStopBtn.click();
    await page.keyboard.press("a");
    await page.keyboard.press("s");
    await startStopBtn.click();

    // Start playback
    await expect(playBtn).toBeEnabled();
    await playBtn.click();

    // Wait for playback mode
    await expect(status).toContainText("playback-progress");

    // Wait until toggle becomes enabled
    await expect(toggleBtn).toBeEnabled({ timeout: 10000 });

    // Pause playback
    await toggleBtn.click();
    await expect(status).toContainText("playback-paused");

    // Resume playback
    await toggleBtn.click();
    await expect(status).toContainText("playback-progress");
  });

  /**
   * Test: Clear recording
   * - Records a beat
   * - Clears recording after confirmation
   * - Verifies beat count resets to 0
   */
  test("should clear recording", async ({ page }) => {
    const startStopBtn = page.locator("#startStopBtn");
    const clearBtn = page.locator("#clearBtn");
    const status = page.locator("#status");

    await startStopBtn.click();
    await page.keyboard.press("a");
    await startStopBtn.click();

    await expect(clearBtn).toBeEnabled();

    // Handle confirmation dialog
    page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await clearBtn.click();

    await expect(status).toContainText("Beats: 0");
  });
});
