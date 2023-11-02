// Basic Types
let id: number = 5;
let company: string = 'Morgan Studios';
let isPublished: boolean = true;

// Can be of any type
let x: any = 'Hello'; 

// Declare type for variable with no assignment
let age: number; 




// Arrays - define the type for an entire array
let ids: number[] = [1, 2, 3, 4, 5];
let arr: any[] = [4, true, 'Hey']; 




// Tuple - define types for each item in an array
let person: [number, string, boolean] = [1, 'Morgan', true];


// Tuple Array - define types for items in each array within an array
let employee: [number, string][];
employee = [
  [1, 'Morgan'],
  [2, 'John'],
  [3, 'Sarah'],
];




// Union (allow a variable hold multiple specific types)
let _id: string | number = 22;




// Enums - Define a group of const(ants), either numeric or string.
// Define the first value and the rest will update to reflect it (2-5)
enum Direction1 {
  Up = 2,
  Down,
  Left,
  Right,
}

// Defining strings for each enum
enum Direction2 {
  Up = 'Hey',
  Down = 'There',
  Left = 'Good',
  Right = 'Bye',
}




// Objects - define types for each property value
type User = {
  id: number;
  name: string;
};

const user = {
  id: 1,
  name: 'John',
};

// Alternative syntax for objects, though is messy
const user2: {
  id: number;
  name: string;
} = {
  id: 1,
  name: 'John',
};




// Type assertion - explicitly tell the compiler to treat an entity as a
// different type. Two ways of doing this are as follows
let cid: any = 1;
let customerId = cid as number; // Syntax 1
// let customerId = <number>cid // Syntax 2




// Functions - paramters must have a type. Define return value type
// after the function signature
function addNum(x: number, y: number): number {
  return x + y;
}

// Might not always have a return value from a function, so use void
// type instead
function log(message: string | number): void {
  console.log(message);
}




// Interfaces - define custom types or specific structures for objects
interface UserInterface {
  id: number;
  name: string;
}

const user1: UserInterface = {
  id: 1,
  name: 'John',
};




// Custom types - directly define your own types. Can use primatives and
// unions
type Point = number | string;
const p1: Point = 1;
