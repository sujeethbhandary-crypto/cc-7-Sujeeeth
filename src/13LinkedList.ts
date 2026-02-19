export class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

interface LinkedListInterface<T> {
  head: ListNode<T> | null;
  tail: ListNode<T> | null;
  addAtEnd(t: T): T;
  removeFromEnd(): T | null;
  addAtHead(t: T): T;
  removeFromHead(): T | null;
  searchForValue(t: T): T | null;
  length(): number;
}

export class LinkedList<T> implements LinkedListInterface<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;
  private size: number = 0;

  addAtEnd = (t: T): T => {
    const newNode = new ListNode<T>(t);

    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.size++;
    return t;
  };

  removeFromEnd = (): T | null => {
    if (!this.head) return null;

    if (this.head === this.tail) {
      const value = this.head.value;
      this.head = this.tail = null;
      this.size--;
      return value;
    }

    let current = this.head;

    while (current.next && current.next !== this.tail) {
      current = current.next;
    }

    const value = this.tail!.value;
    current.next = null;
    this.tail = current;
    this.size--;

    return value;
  };

  addAtHead = (t: T): T => {
    const newNode = new ListNode<T>(t, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    this.size++;
    return t;
  };

  removeFromHead = (): T | null => {
    if (!this.head) return null;

    const value = this.head.value;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    this.size--;
    return value;
  };

  searchForValue = (t: T): T | null => {
    let current = this.head;

    while (current) {
      if (current.value === t) {
        return current.value;
      }
      current = current.next;
    }

    return null;
  };

  length = (): number => {
    return this.size;
  };
}
