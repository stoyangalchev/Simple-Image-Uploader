import React from 'react';


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <BrowserRouter>
      <FileUpload />
    </BrowserRouter>
  )
}


export default App
