// Primitives
let age: number;
age = 12;

let userName: string | string[];
userName = 'Eric';

let isInstructor: boolean;
isInstructor = true;

// More complex types
let hobbies: string[];
hobbies = ['Sports', 'Cooking', 'Tennis'];

type Person = {
  name: string;
  age: number;
};

let person: Person;

person = {
  name: 'John Doe',
  age: 32,
};

let people: Person[];

people = [
  {
    name: 'John Doe',
    age: 42,
  },
  {
    name: 'Sara Jane',
    age: 33,
  },
];

// Type inference
let course: string | number = 'React - The Complete Guide';
course = 1234;

// Functions & types
function add(a: number, b: number): number {
  return a + b;
}

function printMessage(value: any) {
  console.log(value);
}

// Generics
function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, -1);
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd');

const mixedArray = insertAtBeginning<string | number | number[]>(
  [[1, 2, 3], 'Hey'],
  'world'
);
