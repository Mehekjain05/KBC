import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch('/api/home');
        const result = await response.json();
        setData(result);
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
        Hello world! {data}
      </h1>
    </>
  )
}

export default App
