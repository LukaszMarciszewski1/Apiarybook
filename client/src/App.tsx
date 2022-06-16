import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Root from './views/Root';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
