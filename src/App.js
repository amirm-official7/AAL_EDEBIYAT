// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  const [steps, setSteps] = useState(0);


  return (

    <BrowserRouter>
    <Routes>
      <Route path="*" element={<div><Home setSteps={setSteps} steps={steps}/></div>}>
        {/* <Route index element={<Home />} /> */}
        {/* <Route path="*" element={<div><Home setSteps={setSteps} steps={steps}/></div>} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
    // <div>
    //   <Home setSteps={setSteps} steps={steps}  />
    //   {/* <FileHandeler/> */}
    // </div>
  );
}

export default App;
