import './App.css';
import ProjectPage from './components/ProjectPage';
import HomePage from './home/HomePage';
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

function App() {
  return (
    <BrowserRouter >

      <header className='sticky'>
          <span className='logo'>
              <img src='' alt='logo' width={'49'} height={"99"}/>
          </span>
          <NavLink to='/' className='button rounded'>
            <span className='icon-home'></span>
            Home
          </NavLink>

          <NavLink to='/projects' className='button rounded'>
            Projects
          </NavLink>
      </header>

      <div className='container'>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/projects' element={<ProjectPage />}/>
          <Route path='/projects/:id' element={<ProjectPage />}/>
        </Routes>
      </div>

    </BrowserRouter>

   
  );
}

export default App;
