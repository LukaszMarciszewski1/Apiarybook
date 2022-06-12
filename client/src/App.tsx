import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Apiary from './components/molecules/Apiary/Apiary';
import Root from './views/Root';

function App() {

  return (
    // <div className="App">
    //   <Root />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
