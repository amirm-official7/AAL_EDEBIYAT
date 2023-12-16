// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/home/Home';


function App() {
  const [steps, setSteps] = useState(0);


  return (
    <div>
      <Home setSteps={setSteps} steps={steps}  />
      {/* <FileHandeler/> */}
    </div>
  );
}

export default App;
