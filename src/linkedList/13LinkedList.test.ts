import { LinkedList } from "./13linkedList.js";
import { describe, it, expect, beforeEach } from "vitest";

describe("LinkedList", () => {
  let list: LinkedList<number>;

  /**
   * Create a fresh list before each test
   */
  beforeEach(() => {
    list = new LinkedList<number>();
  });

  /**
   * Should initialize an empty list
   */
  it("should initialize empty", () => {
    expect(list.length()).toBe(0);
    expect(list.valueAtHead()).toBeNull();
    expect(list.valueAtTail()).toBeNull();
  });

  /**
   * Should correctly append elements to the end
   */
  it("should add at end", () => {
    list.addAtEnd(10);
    list.addAtEnd(20);

    expect(list.length()).toBe(2);
    expect(list.valueAtTail()).toBe(20);
    expect(list.valueAtHead()).toBe(10);
  });

  /**
   * Should remove the last element
   */
  it("should remove from end", () => {
    list.addAtEnd(15);
    list.addAtEnd(25);

    const removed = list.removeFromEnd();

    expect(removed).toBe(25);
    expect(list.length()).toBe(1);
    expect(list.valueAtTail()).toBe(15);
  });

  /**
   * Should correctly insert elements at the head
   */
  it("should add at head", () => {
    list.addAtHead(30);
    list.addAtHead(40);

    expect(list.valueAtHead()).toBe(40);
    expect(list.length()).toBe(2);
  });

  /**
   * Should handle multiple head insertions
   */
  it("should add multiple elements at head", () => {
    list.addAtHead(1);
    list.addAtHead(2);

    expect(list.valueAtHead()).toBe(2);
    expect(list.valueAtIndex(1)).toBe(1);
    expect(list.length()).toBe(2);
  });

  /**
   * Should remove the first element
   */
  it("should remove from head", () => {
    list.addAtEnd(9);
    list.addAtEnd(19);

    const value = list.removeFromHead();

    expect(value).toBe(9);
    expect(list.length()).toBe(1);
    expect(list.valueAtHead()).toBe(19);
  });

  /**
   * Should return value if found and null if not found
   */
  it("should search correctly", () => {
    list.addAtEnd(250);
    list.addAtEnd(300);

    expect(list.searchFor(250)).toBe(250);
    expect(list.searchFor(999)).toBeNull();
  });

  /**
   * Should return correct value at specific index
   */
  it("should return value at index", () => {
    list.addAtEnd(5);
    list.addAtEnd(15);
    list.addAtEnd(25);

    expect(list.valueAtIndex(0)).toBe(5);
    expect(list.valueAtIndex(1)).toBe(15);
    expect(list.valueAtIndex(2)).toBe(25);
    expect(list.valueAtIndex(3)).toBeNull(); // out of bounds
  });

  /**
   * Should safely return null when removing from an empty list
   */
  it("should return null when removing from empty list", () => {
    expect(list.removeFromEnd()).toBeNull();
    expect(list.removeFromHead()).toBeNull();
  });
});
