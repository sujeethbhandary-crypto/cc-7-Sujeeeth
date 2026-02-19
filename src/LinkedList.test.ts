import { LinkedList } from "./13LinkedList.js";

import { describe, it, expect, beforeEach } from "vitest";

describe("LinkedList", () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  // Test case: Check if a new list is empty
  it("should initialize empty", () => {
    expect(list.length()).toBe(0);

    expect(list.head).toBeNull();

    expect(list.tail).toBeNull();
  });

  // Test case: Check if a new list is empty
  it("should add at end", () => {
    list.addAtEnd(10);
    list.addAtEnd(20);

    expect(list.length()).toBe(2);

    expect(list.tail!.value).toBe(20);
  });

  // Test case: Adding elements at the end
  it("should remove from end", () => {
    list.addAtEnd(15);
    list.addAtEnd(25);

    const removed = list.removeFromEnd();
    expect(removed).toBe(25);

    expect(list.length()).toBe(1);
  });

  // Test case: Adding elements at the head
  it("should add at head", () => {
    list.addAtHead(30);
    list.addAtHead(40);

    expect(list.head!.value).toBe(40);

    expect(list.length()).toBe(2);
  });

  // Test case: Adding elements at the head
  it("should add at head", () => {
    list.addAtHead(1);
    list.addAtHead(2);

    expect(list.head?.value).toBe(2);

    expect(list.length()).toBe(2);
  });

  // Test case: Removing the first element
  it("should remove from head", () => {
    list.addAtEnd(9);
    list.addAtEnd(19);

    const value = list.removeFromHead();

    expect(value).toBe(9);
    expect(list.length()).toBe(1);
  });

  // Test case: Searching for an element
  it("it should search for the exact value", () => {
    list.addAtEnd(250);
    list.addAtEnd(300);

    expect(list.searchForValue(250)).toBe(250);

    expect(list.searchForValue(990)).toBeNull();
  });
});
