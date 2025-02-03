import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [msg, setMsg] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch('/api/home');
        const data = await response.json();
        setMsg(data.data);
      }
      catch(Error){
        console.log(Error)
      }


    }
    fetchData();
  })
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        {msg}
      </h1>
    </>
  )
}

export default App
