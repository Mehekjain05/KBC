import './App.css'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Register from './Pages/Register';

function App() {
  // const [msg, setMsg] = useState('');
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try{
  //       const response = await fetch('/api/home');
  //       const data = await response.json();
  //       setMsg(data.data);
  //     }
  //     catch(Error){
  //       console.log(Error)
  //     }


  //   }
  //   fetchData();
  // })
  return (
    <>
      {/* <h1 className="text-3xl font-bold underline">
        {msg}
      </h1> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
