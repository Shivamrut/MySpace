import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
      <NoteState>

        <Router>
          <Navbar />
          <Alert alert={{"type" : "success","message" : "This is my notes app!"}}/>
          <div className="container ">

            <Routes>
              <Route path='/' element={
                <Home />
              }></Route>
              <Route path='/about' element={
                <About />
              }></Route>

            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
