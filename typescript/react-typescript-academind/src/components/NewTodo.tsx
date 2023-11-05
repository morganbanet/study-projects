import { useRef, useContext } from 'react';

import { TodosContext, TodosContextType } from '../context/TodosContext';

import classes from '../assets/styles/newTodo.module.css';

function NewTodo() {
  const { addTodo } = useContext(TodosContext) as TodosContextType;

  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const enteredText = todoTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      return;
    }

    addTodo(enteredText);

    todoTextInputRef.current!.value = '';
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="text">Todo text</label>
      <input type="text" id="text" ref={todoTextInputRef} />
      <button>Add Todo</button>
    </form>
  );
}
export default NewTodo;
