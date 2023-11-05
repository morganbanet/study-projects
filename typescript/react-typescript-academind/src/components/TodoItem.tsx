import classes from '../assets/styles/TodoItem.module.css';
import Todo from '../models/todo';

interface Props {
  item: Todo;
  onRemoveTodo: (todoId: string) => void;
}

function TodoItem({ item, onRemoveTodo }: Props) {
  return (
    <li className={classes.item} onClick={() => onRemoveTodo(item.id)}>
      {item.text}
    </li>
  );
}
export default TodoItem;
