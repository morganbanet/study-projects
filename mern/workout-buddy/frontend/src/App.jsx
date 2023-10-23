import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className="pages">
        <Outlet />
      </div>
    </div>
  );
}
export default App;
