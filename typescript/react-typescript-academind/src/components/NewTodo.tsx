import { useRef } from 'react';
import classes from '../assets/styles/newTodo.module.css';

interface Props {
  onAddTodo: (enteredText: string) => void;
}

function NewTodo({ onAddTodo }: Props) {
  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const enteredText = todoTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      return;
    }

    onAddTodo(enteredText);

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
