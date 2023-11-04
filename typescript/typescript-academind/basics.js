"use strict";
// Primitives
let age;
age = 12;
let userName;
userName = 'Eric';
let isInstructor;
isInstructor = true;
// More complex types
let hobbies;
hobbies = ['Sports', 'Cooking', 'Tennis'];
let person;
person = {
    name: 'John Doe',
    age: 32,
};
let people;
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
let course = 'React - The Complete Guide';
course = 1234;
// Functions & types
function add(a, b) {
    return a + b;
}
function printMessage(value) {
    console.log(value);
}
// Generics
function insertAtBeginning(array, value) {
    const newArray = [value, ...array];
    return newArray;
}
const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, -1);
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd');
const mixedArray = insertAtBeginning([[1, 2, 3], 'Hey'], 'world');
