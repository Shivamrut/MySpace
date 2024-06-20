import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { FC, useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { NoteState } from "./context/notes/NoteState";
import { AuthState } from "./context/auth/AuthState";
import { Alert } from "./components/Alert";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

interface AlertParams {
  type: string;
  message: string;
}

const App: FC = () => {
  const [alert, setAlert] = useState<AlertParams | null>(null);
  const showAlert = (type: string, message: string) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <AuthState>
        <NoteState showAlert={showAlert}>
          <Router>
            <Navbar />
            <Alert alert={alert} />
            <div className="container ">
              <Routes>
                <Route path="/" element={<Home />}></Route>

                <Route path='/login' element={
                  <Login showAlert={showAlert} />
                }></Route>
                <Route path='/signup' element={
                  <Register showAlert={showAlert} />
                }></Route>
              </Routes>
            </div>
          </Router>
        </NoteState>
      </AuthState>
    </>
  );
};

export default App;
