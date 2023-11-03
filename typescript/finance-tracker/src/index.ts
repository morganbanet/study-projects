import Invoice from './classes/Invoice.js';
import { Payment } from './classes/Payments.js';
import { HasFormatter } from './interfaces/HasFormatter.js';
import { ListTemplate } from './classes/ListTemplate.js';

// Form
const form = document.querySelector('.new-item-form') as HTMLFormElement;

// List template instance
const ul = document.querySelector('ul')!;
const list = new ListTemplate(ul);

// Inputs
const type = document.querySelector('#type') as HTMLSelectElement;
const tofrom = document.querySelector('#tofrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  let values: [string, string, number];
  values = [tofrom.value, details.value, amount.valueAsNumber];

  let doc: HasFormatter;

  if (type.value === 'invoice') {
    doc = new Invoice(...values);
  } else {
    doc = new Payment(...values);
  }

  list.render(doc, type.value, 'end');
});

// --- end of app ---

// Enums
enum ResourceType {
  Book,
  Author,
  Film,
  Director,
  Person,
}

interface Resource<T> {
  uid: number;
  resourceType: ResourceType;
  data: T;
}

const docOne: Resource<object> = {
  uid: 1,
  resourceType: ResourceType.Author,
  data: { title: 'Name of the Wind' },
};

const docTwo: Resource<object> = {
  uid: 10,
  resourceType: ResourceType.Person,
  data: { name: 'John' },
};

// Tuples
let myTup: [string, number, boolean] = ['John', 25, false];
let student: [string, number] = ['Sara', 22345];
