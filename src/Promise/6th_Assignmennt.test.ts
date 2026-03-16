import { describe, it, expect, vi } from "vitest";
import { getUsers } from "./6th_Assignment.js";

describe("getUsers", () => {
  it("should return users after delay", async () => {
    vi.useFakeTimers();

    const mockUsers = [
      {
        id: 1,
        name: "Sujeeth",
        username: "Sujeeth Bhandary",
        email: "sujeeth@gmail.com",
      },
    ];

    // Mock fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      } as Response),
    );

    const promise = getUsers(2000);
    //console.log("PEnding", promise);
    // fast-forward time
    await vi.advanceTimersByTimeAsync(2000);

    const users = await promise;
    //console.log("USer", users);
    expect(users).toEqual(mockUsers);

    vi.useRealTimers();
  });
});
