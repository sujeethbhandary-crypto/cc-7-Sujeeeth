/**
 * Represents a node in the LinkedList.
 */
export class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

/**
 * Contract describing the structure and behavior of a LinkedList.
 */
export interface LinkedListInterface<T> {
  head: ListNode<T> | null;
  tail: ListNode<T> | null;
  addAtEnd(t: T): T;
  removeFromEnd(): T | null;
  addAtHead(t: T): T;
  removeFromHead(): T | null;
  searchFor(t: T): T | null;
  length(): number;
}

/**
 * Generic singly LinkedList implementation.
 */
export class LinkedList<T> implements LinkedListInterface<T> {
  private _head: ListNode<T> | null = null;
  private _tail: ListNode<T> | null = null;
  private size: number = 0;

  /** Public read-only access to head */
  public get head(): ListNode<T> | null {
    return this._head;
  }

  /** Public read-only access to tail */
  public get tail(): ListNode<T> | null {
    return this._tail;
  }

  /**
   * Adds a value at the end of the list.
   */
  addAtEnd = (t: T): T => {
    const newNode = new ListNode<T>(t);

    if (!this._head) {
      this._head = this._tail = newNode;
    } else {
      this._tail!.next = newNode;
      this._tail = newNode;
    }

    this.size++;
    return t;
  };

  /**
   * Removes and returns the last element of the list.
   */
  removeFromEnd = (): T | null => {
    if (!this._head) return null;

    if (this._head === this._tail) {
      const value = this._head.value;
      this._head = this._tail = null;
      this.size--;
      return value;
    }

    let current = this._head;

    while (current.next && current.next !== this._tail) {
      current = current.next;
    }

    const value = this._tail!.value;
    current.next = null;
    this._tail = current;
    this.size--;

    return value;
  };

  /**
   * Adds a value at the beginning of the list.
   */
  addAtHead = (t: T): T => {
    const newNode = new ListNode<T>(t, this._head);
    this._head = newNode;

    if (!this._tail) {
      this._tail = newNode;
    }

    this.size++;
    return t;
  };

  /**
   * Removes and returns the first element of the list.
   */
  removeFromHead = (): T | null => {
    if (!this._head) return null;

    const value = this._head.value;
    this._head = this._head.next;

    if (!this._head) {
      this._tail = null;
    }

    this.size--;
    return value;
  };

  /**
   * Searches for a value in the list.
   */
  searchFor = (t: T): T | null => {
    let current = this._head;

    while (current) {
      if (current.value === t) {
        return current.value;
      }
      current = current.next;
    }

    return null;
  };

  /**
   * Returns the number of elements in the list.
   */
  length = (): number => {
    return this.size;
  };
}
