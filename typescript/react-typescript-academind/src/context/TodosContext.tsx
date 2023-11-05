import { createContext, useState } from 'react';
import Todo from '../models/todo';

interface Props {
  children: React.ReactNode;
}

export type TodosContextType = {
  todos: Todo[];
  addTodo: (enteredText: string) => void;
  removeTodo: (id: string) => void;
};

const TodosContext = createContext<TodosContextType | null>(null);

function TodosProvider({ children }: Props) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (enteredText: string) => {
    const newTodo = new Todo(enteredText);

    setTodos((todos) => {
      return todos.concat(newTodo);
    });
  };

  const removeTodo = (todoId: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);

    setTodos(updatedTodos);
  };

  const contextValue: TodosContextType = {
    todos,
    addTodo,
    removeTodo,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
}
export { TodosProvider, TodosContext };
