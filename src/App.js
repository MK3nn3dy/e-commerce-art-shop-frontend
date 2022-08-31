import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Basket from './pages/Basket';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useUserContext } from './hooks/useUserHook';
import Profile from './pages/Profile';

function App() {

  const { user_id } = useUserContext();

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
            path="/login"
            element={!user_id ? <Login /> : <Navigate to="/"/>}
          />
          <Route
            path="/signup"
            element={!user_id ? <Signup /> : <Navigate to="/"/>}
          />
          <Route
            path="/basket"
            element={user_id ? <Basket /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user_id ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
        {}
      </div>
    </BrowserRouter>
  );
}

export default App;
