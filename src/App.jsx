import { useState } from 'react'
import axios from "axios"
import './App.css'
// import Generatedog from './components/Generatedog'
import GenerateDog from './components/generateDog';

function App() {
  const [apiData, setApiData] = useState(null);
  const [showDog,setShowDog] = useState(false);

  const handleClick = (data)=>{
    setApiData(data);
  }

  const display = ()=>{
    setShowDog(true);
  }

  
 
  
  return (

    <div>
    <h1 className = "text">Explore Dogs!!</h1>
      <form>
      <GenerateDog/>

      <input type="submit" value ="Explore!"/>
      </form>
        
       


    
  
  
    
   </div>
    
  )

}

export default App
