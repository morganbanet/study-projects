import NewTodo from './components/NewTodo';
import Todos from './components/Todos';

import { TodosProvider } from './context/TodosContext';

function App() {
  return (
    <TodosProvider>
      <div>
        <NewTodo />
        <Todos />
      </div>
    </TodosProvider>
  );
}

export default App;
