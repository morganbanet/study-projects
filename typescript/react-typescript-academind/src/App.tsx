import { useState } from 'react';
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Todo from './models/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const onAddTodoHandler = (enteredText: string) => {
    const newTodo = new Todo(enteredText);

    setTodos((todos) => {
      return todos.concat(newTodo);
    });
  };

  const onRemoveTodo = (todoId: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);

    setTodos(updatedTodos);
  };

  return (
    <div>
      <NewTodo onAddTodo={onAddTodoHandler} />
      <Todos items={todos} onRemoveTodo={onRemoveTodo} />
    </div>
  );
}

export default App;
