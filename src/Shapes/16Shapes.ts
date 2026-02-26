interface Point {
  x: number;
  y: number;
}

abstract class Shape {
  // A class can be marked as abstract, if you dont want explicit instance of this class be ever created.
  private origin: Point; // private is only accessible within the class.

  area(): number {
    return 0;
  }

  constructor() {
    this.origin = { x: 0, y: 0 };
  }
}

class Rectangle extends Shape {
  override area(): number {
    // Implicite overrides can be warned using "noImplicitOverride": true, setting in tsconfig.json
    // Always use override keyword to ensure safe overrides, in case base method is renamed, we will get an error.
    return this.width * this.height;
  }

  constructor(
    private width: number,
    private height: number,
  ) {
    super();
    this.width = width;
    this.height = height;
  }
  // ! exercise, rewrite the constructor where the vars width, and height will be auto created.

  // * Getters
  get w() {
    return this.width;
  }

  get h() {
    return this.height;
  }

  //* Setters
  set w(width: number) {
    this.width = width;
  }
  set h(height: number) {
    this.height = height;
  }
}

const rectangle = new Rectangle(10, 22);
rectangle.w = 15;
rectangle.h = rectangle.w + 10; // Setters and getters usage

//! Exercise. Implement Circle class. It should override from Shape. Implement getter to access its radius.  Then create an Array of circles and rectangles. Find the item in the array that has least area.

class Circle extends Shape {
  constructor(private radius: number) {
    super();
    this.radius = radius;
  }

  override area(): number {
    return Math.PI * this.radius * this.radius;
  }

  get r(): number {
    return this.radius;
  }

  set r(radius: number) {
    this.radius = radius;
  }
}

const circle = new Circle(5);
circle.r = 6; //setters
console.log("Getter for circle:", circle.r); //getters

const shapes: Shape[] = [
  new Rectangle(10, 20),
  new Rectangle(5, 5),
  new Circle(6),
  new Circle(2),
];

if (shapes.length === 0) {
  throw new Error("Shapes array is empty");
}

let smallest: Shape = shapes[0]!;

for (let shape of shapes) {
  if (shape.area() < smallest.area()) {
    smallest = shape;
  }
}
if (smallest instanceof Circle) {
  console.log("Smallest item is a Circle with radius:", smallest.r);
} else if (smallest instanceof Rectangle) {
  console.log(
    "Smallest item is a Rectangle with width:",
    smallest.w,
    "and height:",
    smallest.h,
  );
}
console.log("Smallest Area:", smallest.area());
