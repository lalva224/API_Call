import React, { useRef } from "react";
import {useEffect,useState} from "react";

/**
  url is a JSON of all the dog breeds. I randomly select one. 
  Performing the search does not work because not all dogs will have detailed breed data, only those listed in json under url

  I still perforn search bc the JSON does not contain image.
 */


 function GenerateDog(props){
  
  const url = "https://api.thedogapi.com/v1/breeds";
  const searchUrl ="https://api.thedogapi.com/v1/images/search?breed_ids="
  
  const getRandomInt = (max)=>{
    return Math.floor(Math.random()*max);
  }

  const [image,setImage] = useState();
  const [petBredFor,setPetBredFor] = useState();
  const[petName,setpetName] = useState();
  const[petLifespan,setPetLifespan] = useState();
 
  // for react 18 and above object is mounted more than once, use this for only 1 display.
  const shouldDisplay = useRef(true);

  //useEffect for only 1 occurance-> saying 0 dependencies
  useEffect(()=>{
      // fetch call
    const fetchData = async()=>{
        shouldDisplay.current = false;
        try{
          // select a random dog
         
          const response = await fetch(url);
          const data = await response.json();
          let dog = data[getRandomInt(data.length)];
          console.log(dog);
      
         
         

          // img not located within this url, need to use searchUrl and search by Id.
          const id = dog.id;
          const response2 = await fetch(searchUrl+id);
  
          const dataImage= await response2.json();
          setImage(dataImage[0].url);
         
          //pass back to callback function
          props.data(dog)
          props.image(dataImage[0].url)
    
      
        
          //set each attribute
          setpetName(dog.name);       
          setPetLifespan(dog.life_span);

          if(dog.bred_for!=undefined){
            setPetBredFor(dog.bred_for);
          }
          else{
            setPetBredFor(dog.breed_group);
          }
          
          const myPet = `Pet's name is ${dog.name}, life span is ${dog.life_span},`;
          console.log
        
          
          
          
        
        }
        catch(error){
          console.log(error);
          
        }
      
      
    }
      if(shouldDisplay.current){
        shouldDisplay.current = false;
        fetchData();
      }
       
       
    
   
  },[]);

  return(
    <div>
      
      <div className = "petInfo">
            <h3 className ="text">{petName}</h3> 
            <h3 className="text">{petLifespan}</h3>
            <h3 className="text">{petBredFor}</h3>

      </div>
      

      <img src={image}/>
    </div>
  )
}



  export default GenerateDog;
