import { LinkedList } from "../linkedList/13linkedList.js";

export interface Stack<T> {
  push(item: T): T;
  pop(): T;
  top(): T | null;
  length(): number;
  isEmpty(): boolean;
}

/**
 * Stack implementation using LinkedList.
 * Uses strict runtime private field (#linkedList).
 */
export class StackImplementation<T> implements Stack<T> {
  #linkedList: LinkedList<T>;

  constructor() {
    this.#linkedList = new LinkedList<T>();
  }

  /**
   * Pushes an item onto the stack.
   */
  push = (item: T): T => {
    return this.#linkedList.addAtHead(item);
  };

  /**
   * Removes and returns the top item.
   * Throws error if stack is empty.
   */
  pop = (): T => {
    const removed = this.#linkedList.removeFromHead();

    if (removed === null) {
      throw new Error("Stack is empty");
    }

    return removed;
  };

  /**
   * Returns the top element without removing it.
   */
  top = (): T | null => {
    return this.#linkedList.valueAtHead();
  };

  /**
   * Returns number of elements.
   */
  length = (): number => {
    return this.#linkedList.length();
  };

  /**
   * Returns true if stack is empty.
   */
  isEmpty = (): boolean => {
    return this.#linkedList.length() === 0;
  };
}
