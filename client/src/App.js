import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
      <NoteState>

        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={
              <Home />
            }></Route>
            <Route path='/about' element={
              <About />
            }></Route>

          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
