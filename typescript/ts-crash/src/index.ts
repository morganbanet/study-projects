// Basic Types
let id: number = 5;
let company: string = 'Morgan Studios';
let isPublished: boolean = true;
let x: any = 'Hello'; // Can be of any type
let age: number; // Initialize with no assignment

// Arrays
let ids: number[] = [1, 2, 3, 4, 5]; // Array that contains only numbers
let arr: any[] = [4, true, 'Hey']; // Array that contains any type

// Tuple (specify the types of each item)
let person: [number, string, boolean] = [1, 'Morgan', true];

// Tuple Array
let employee: [number, string][]; // Each array contains number & string
employee = [
  [1, 'Morgan'],
  [2, 'John'],
  [3, 'Sarah'],
];

// Union (allow a variable hold multiple specific types)
let _id: string | number = 22;

// Enum (define a set of named constants, either numeric or string)
enum Direction1 {
  Up = 1, // Change to 1 and others will follow accordingly
  Down,
  Left,
  Right,
}

// Enums are basically just a set of const(ants)!
enum Direction2 {
  Up = 'Hey',
  Down = 'There',
  Left = 'Whats',
  Right = 'Up',
}

// Objects
type User = {
  id: number;
  name: string;
};

const user = {
  id: 1,
  name: 'John',
};

// Looks messy, so we'll do the approach above instead
// const user: {
//   id: number;
//   name: string;
// } = {
//   id: 1,
//   name: 'John',
// };

// Type Assertion (explicitly tell the compiler that we want to treat
// an entity as a different type). Here we set cid to "any" type but
// want the customerId to equal cid as only a "number" type.
let cid: any = 1;
// let customerId = <number>cid // Syntax 1
let customerId = cid as number; // Syntax 2

// Functions (parameters must have a type, but can change in config)
// Type 1: 1st parameter
// Type 2: 2nd paramter
// Type 3: return value
function addNum(x: number, y: number): number {
  return x + y;
}

// Might not always have a return value from a function, so use void
// type instead
function log(message: string | number): void {
  console.log(message);
}
