import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signIn/signIn";
import SignUp from "./pages/signUp/signUp";
import HomePage from "./pages/homePage/homePage";
import './App.scss';
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Lỗi chuỗi JSON:', error);
      }
    }

  }, []);

  const element = user ? <HomePage /> : <SignIn />;

  return (
    <Routes>
      <Route path="/" element={element} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
