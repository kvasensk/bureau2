import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './main/Main';
import About from './about/About';
import Modular from './modular/Modular';
import Item from './items/Item';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <div className='App-main'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/about' element={<About />} />
            <Route path='/modular' element={<Modular />} />
            <Route path='/item/:id' element={<Item />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
