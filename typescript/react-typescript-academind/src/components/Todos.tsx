import { useContext } from 'react';

import { TodosContext, TodosContextType } from '../context/TodosContext';

import TodoItem from './TodoItem';
import classes from '../assets/styles/todos.module.css';

function Todos() {
  const { todos, removeTodo } = useContext(TodosContext) as TodosContextType;

  return (
    <ul className={classes.list}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} item={todo} onRemoveTodo={removeTodo} />
      ))}
    </ul>
  );
}
export default Todos;
