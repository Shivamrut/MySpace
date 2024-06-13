import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import AuthState from './context/auth/AuthState';
import Alert from './components/Alert';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function App() {
  return (
    <>
      <AuthState>
        <NoteState>

          <Router>
            <Navbar />
            <Alert alert={{ "type": "success", "message": "This is my notes app!" }} />
            <div className="container ">

              <Routes>
                <Route path='/' element={
                  <Home />
                }></Route>
                <Route path='/about' element={
                  <About />
                }></Route>
                <Route path='/login' element={
                  <Login />
                }></Route>
                <Route path='/signup' element={
                  <Register />
                }></Route>

              </Routes>
            </div>
          </Router>
        </NoteState>
      </AuthState>
    </>
  );
}

export default App;
