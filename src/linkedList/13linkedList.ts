/**
 * Represents a node in the LinkedList.
 */
class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

/**
 * Contract describing the behavior of a LinkedList.
 * Notice: No head/tail exposure.
 */
export interface LinkedListInterface<T> {
  addAtEnd(t: T): T;
  removeFromEnd(): T | null;

  addAtHead(t: T): T;
  removeFromHead(): T | null;

  searchFor(t: T): T | null;

  valueAtHead(): T | null;
  valueAtTail(): T | null;
  valueAtIndex(index: number): T | null;

  length(): number;
}

/**
 * Generic singly LinkedList implementation.
 */
export class LinkedList<T> implements LinkedListInterface<T> {
  // Strictly private fields (true runtime privacy)
  #head: ListNode<T> | null = null;
  #tail: ListNode<T> | null = null;
  #size: number = 0;

  /**
   * Adds a value at the end of the list.
   */
  addAtEnd = (t: T): T => {
    const newNode = new ListNode<T>(t);

    if (!this.#head) {
      this.#head = this.#tail = newNode;
    } else {
      this.#tail!.next = newNode;
      this.#tail = newNode;
    }

    this.#size++;
    return t;
  };

  /**
   * Removes and returns the last element of the list.
   */
  removeFromEnd = (): T | null => {
    if (!this.#head) return null;

    if (this.#head === this.#tail) {
      const value = this.#head.value;
      this.#head = this.#tail = null;
      this.#size--;
      return value;
    }

    let current = this.#head;

    while (current.next && current.next !== this.#tail) {
      current = current.next;
    }

    const value = this.#tail!.value;
    current.next = null;
    this.#tail = current;
    this.#size--;

    return value;
  };

  /**
   * Adds a value at the beginning of the list.
   */
  addAtHead = (t: T): T => {
    const newNode = new ListNode<T>(t, this.#head);
    this.#head = newNode;

    if (!this.#tail) {
      this.#tail = newNode;
    }

    this.#size++;
    return t;
  };

  /**
   * Removes and returns the first element of the list.
   */
  removeFromHead = (): T | null => {
    if (!this.#head) return null;

    const value = this.#head.value;
    this.#head = this.#head.next;

    if (!this.#head) {
      this.#tail = null;
    }

    this.#size--;
    return value;
  };

  /**
   * Searches for a value in the list.
   */
  searchFor = (t: T): T | null => {
    let current = this.#head;

    while (current) {
      if (current.value === t) return current.value;
      current = current.next;
    }

    return null;
  };

  /**
   * Returns the value stored at the head.
   */
  valueAtHead = (): T | null => {
    return this.#head ? this.#head.value : null;
  };

  /**
   * Returns the value stored at the tail.
   */
  valueAtTail = (): T | null => {
    return this.#tail ? this.#tail.value : null;
  };

  /**
   * Returns the value at a specific index (0-based).
   */
  valueAtIndex = (index: number): T | null => {
    if (index < 0 || index >= this.#size) return null;

    let current = this.#head;
    let i = 0;

    while (current) {
      if (i === index) return current.value;
      current = current.next;
      i++;
    }

    return null;
  };

  /**
   * Returns the number of elements in the list.
   */
  length = (): number => {
    return this.#size;
  };
}
