import React from 'react';
import {apiUrl , filterData} from "./data";
import { useState ,useEffect } from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";


const App = () => {

  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cetagory, setCetagory] = useState(filterData[0].tittle)
      async function fetchData() {
        setLoading(true);
         try{ 
        let response = await fetch(apiUrl);
        let output = await response.json();
        // sava data into variable
        setCourses(output.data);
      }
      catch(error) {
        toast.error("Something went wrong");
      }
      setLoading(false);
      }

      useEffect(() =>{
         fetchData();
      }, [])
  
  return (
      <div className=" min-h-screen flex flex-col bg-bgDark2">
           <div>
             <Navbar/>
           </div>
             <div className='bg-bgDark2'>
               <div>
                 <Filter filterData = {filterData}
                 category={cetagory}
                 setCetagory={setCetagory}
                 />
             </div>

            <div className='w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]'>
               {
                loading ? (<Spinner/>) : ( <Cards courses ={courses} category = {cetagory}/> )
               }
            </div> 

             </div>
             

      </div>
  );
};

export default App;
