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
// different type
let cid: any = 1;

// Syntax 1
let customerId = cid as number;

// Syntax 2
let customerId2 = <number>cid




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




// Custom types - directly define your own types. Can use primatives and
// unions
type Point = number | string;
const p1: Point = 1;




// Interfaces - define types for specific structures. Structures using
// the interface must comply with the structure defined within it
interface UserInterface {
  readonly id: number;
  name: string;
  age?: number; // "?" makes optional
}

const user1: UserInterface = {
  id: 1,
  name: 'John',
};




// Interfaces with functions
interface MathFunc {
  (x: number, y: number): number
}

const add: MathFunc = (x: number, y: number ): number => x + y
const sub: MathFunc = (x: number, y: number): number => x - y




// Interface with classes - includes return values of class methods
interface PersonInterface {
  id: number,
  name: string,
  age?: number,
  register(): string
}

// Class uses "implements" method to apply interface
class Person implements PersonInterface {
  id: number
  name: string

  // Access modifiers:
  // - Private: only available within the class
  // - Protected: only available within the class or inherited classes
  // - Public: Available everywhere

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }

  register() {
    return `${this.name} is now registered`
  }
}

const vincent = new Person(1, 'Van Goth');
const micheal = new Person(2, 'Michealangelo')




// Class inheritence (subclass)
class Employee extends Person {
  position: string

  constructor(id: number, name: string, position: string) {
    super(id, name);
    this.position = position;
  }
}

const ada = new Employee(3, 'Ada Lovelace', 'Developer');




// Generics - used to build reusable components
function getArray<T>(items: T[]): T[] {
  return new Array().concat(items);
}

let numArray = getArray<number>([1, 2, 3, 4])
let strArray = getArray<string>(['John', 'Sarah', 'Jane', 'Smith'])

