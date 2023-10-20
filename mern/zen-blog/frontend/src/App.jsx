import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import HomeScreen from './screens/HomeScreen';
import CreateScreen from './screens/CreateScreen';
import DetailsScreen from './screens/DetailsScreen';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <div className="content">
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/create" element={<CreateScreen />} />
            <Route path="/blogs/:slug/:id" element={<DetailsScreen />} />
            <Route path="*" element={<HomeScreen />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
