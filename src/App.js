import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Basket from './pages/Basket';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/basket"
            element={<Basket />}
          />
        </Routes>
        {}
      </div>
    </BrowserRouter>
  );
}

export default App;
