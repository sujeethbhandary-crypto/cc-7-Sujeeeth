import { LinkedList } from "../linkedList/13linkedList.js";

interface Stack<T> {
  readonly linkedList: LinkedList<T>;
  push: (item: T) => T;
  pop: () => T;
  top: () => T | null;
  length: () => number;
  isEmpty: () => boolean;
}

export class StackImplementation<T> implements Stack<T> {
  readonly linkedList: LinkedList<T>;

  constructor() {
    this.linkedList = new LinkedList<T>();
  }

  push = (item: T): T => {
    return this.linkedList.addAtHead(item);
  };

  pop = (): T => {
    const removed = this.linkedList.removeFromHead();
    if (removed === null) {
      throw new Error("stack empty");
    }
    return removed;
  };

  top = (): T | null => {
    return this.linkedList.head?.value ?? null;
  };

  length = (): number => {
    return this.linkedList.length();
  };

  isEmpty = (): boolean => {
    return this.linkedList.length() === 0;
  };
}
