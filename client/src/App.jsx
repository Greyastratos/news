import { useEffect, useState } from 'react'
import Features from './components/Features'
import Form from './components/form'


function App() {
  const [News, setNews]= useState([])
  useEffect(()=>{
  setNews(Features.FetchNews())
  },[])


  return (
    <div className="flex flex-wrap justify-center flex-col">
      <Form/>      
    </div>
  )
}

export default App
