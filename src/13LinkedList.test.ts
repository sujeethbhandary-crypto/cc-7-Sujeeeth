/**
 * LinkedList test suite
 * Verifies core operations like insert, delete, search, and length tracking.
 */

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
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });

  /**
   * Should correctly append elements to the end
   */
  it("should add at end", () => {
    list.addAtEnd(10);
    list.addAtEnd(20);

    expect(list.length()).toBe(2);
    expect(list.tail!.value).toBe(20);
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
  });

  /**
   * Should correctly insert elements at the head
   */
  it("should add at head", () => {
    list.addAtHead(30);
    list.addAtHead(40);

    expect(list.head!.value).toBe(40);
    expect(list.length()).toBe(2);
  });

  /**
   * Should handle multiple head insertions
   */
  it("should add multiple elements at head", () => {
    list.addAtHead(1);
    list.addAtHead(2);

    expect(list.head!.value).toBe(2);
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
   * Should safely return null when removing from an empty list
   */
  it("should return null when removing from empty list", () => {
    expect(list.removeFromEnd()).toBeNull();
    expect(list.removeFromHead()).toBeNull();
  });
});
