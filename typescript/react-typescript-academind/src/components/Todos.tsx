import Todo from '../models/todo';
import TodoItem from './TodoItem';
import classes from '../assets/styles/todos.module.css';

interface Props {
  children?: React.ReactNode;
  items: Todo[];
  onRemoveTodo: (todoId: string) => void;
}

function Todos({ items, onRemoveTodo }: Props) {
  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <TodoItem key={item.id} item={item} onRemoveTodo={onRemoveTodo} />
      ))}
    </ul>
  );
}
export default Todos;
