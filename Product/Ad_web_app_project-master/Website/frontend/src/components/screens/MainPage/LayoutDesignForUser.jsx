import React from 'react';
import { useSelector } from 'react-redux';
import TotalChartsContext from '../../../context/LayoutContext';
import { useContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import SingleChartInLayout from '../../SingleItem/SingleChartInLayout';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { addLayout } from '../../../store/actions/LayoutAddActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetAfterAdding } from '../../../store/actions/LayoutAddActions';
import { removeLocalStorageOfLayout } from '../../../store/actions/LayoutAddActions';


function LayoutDesignForUser() {

     //Set dispatch and navigate
     let dispatch = useDispatch();
     let navigate = useNavigate();
 
     //Global state from redux for layoutAdd
 
     let {isSuccess, isError, message} = useSelector(state => state.layoutAdd);
 
     //All charts' array from context
 
     let {arrayCharts} = useContext(TotalChartsContext);
 
      //Global state from redux for layout array with charts inside for layout design page
 
     let {layoutArray} = useSelector(state => state.layout);
 
 
     //Get filter for selected id's charts
 
     let selectedCharts = arrayCharts.filter((chart) => {
         return layoutArray.includes(chart.id);
     });
 
     //Set state for layout selection (one-side or two-side)
 
     let [layout, setLayout] = useState("oneside");
 
     //Set state for name of layout
 
     let [name, setName] = useState("");
 
 
     //Set change for name
 
     const handleName = (e) => {
 
       setName(e.target.value);
     };
 
     //Set state for each chart
 
     let modifiedArrayOfSelectedCharts = selectedCharts.map((value) => ({
       chartId: value.id,
       description: ""
     }));
     let [listOfCharts, setListOfCharts] = useState(modifiedArrayOfSelectedCharts);
     
     console.log(listOfCharts);
     
     //Handle submit
 
     const handleSubmit = (e) => {
 
       e.preventDefault();
 
       const layoutInputs = {
         name: name,
         listOfCharts: listOfCharts,
         layoutType: layout,
         idForLink: uuidv4()
       };
 
       let nameIsValid = layoutInputs.name.trim().length >= 5;
       let listOfChartsIsValid = layoutInputs.listOfCharts.length > 0;
 
 
       if (nameIsValid === false || listOfChartsIsValid === false) {
 
         toast.error("Please fill a name for layout!");
         return;
       };
 
       dispatch(addLayout(layoutInputs));
     
     }
     
     // Set effect whether adding is successful or not
 
     useEffect(() => {
 
       if (isError) {
         toast.error(message);
         dispatch(resetAfterAdding());
       } else if (isSuccess) {
         navigate("/userprofile");
         toast.success("Create layout successfully!");
         dispatch(resetAfterAdding());
         dispatch(removeLocalStorageOfLayout());
       }
     },[isSuccess, isError, message]);
 
  
   return (
     <div className='p-14 bg-stone-300'>
    <div className='w-full mx-auto p-2 mb-36'>
        <h1 className='text-center text-black font-bold text-3xl'> Layout Design Page for User! </h1>
 
         {selectedCharts.length == 0 
         
         ? 
         
         (<div className='text-center my-96 text-3xl text-pink-500 font-bold h-96'> No charts added to layout! </div>) 
         
         : 
         
         (   <form onSubmit={handleSubmit}>
             <div className='my-10'> 
 
             <div className='flex items-center justify-center'>
                 <div className='formgroup flex items-center mb-4 mr-10'>
                 <input type="radio" name="sidelayout" id="oneside" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' onChange={() => setLayout("oneside")} checked={layout === "oneside"}/>
                 <label htmlFor='oneside' className='ml-2 text-lg font-medium text-gray-900 dark:text-gray-300'> One-side Layout </label>
                 </div>
 
             
 
                 <div className='form-group flex items-center mb-4'>
                 <input type="radio" name="sidelayout" id="twoside" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' onChange={() => setLayout("twoside")} checked={layout === "twoside"}/>
                 <label htmlFor="twoside" className='ml-2 text-lg font-medium text-gray-900 dark:text-gray-300'> Two-side Layout </label>
                 </div>
             </div>
 
             <div className='flex items-center justify-center'>
             <div className='formgroup mt-12 flex flex-col w-11/12'>
                 <label htmlFor="name" className='text-black font-bold mb-5 text-3xl'> Name of layout: </label>
                 <input type="input" name="name" id="name" className='input input-lg w-full bg-slate-200 border-2 border-black focus:outline-0 placeholder:text-slate-500' placeholder='Please add a name for layout (required)' value={name} onChange={handleName}/>
             </div>
             </div>
 
             <div className='my-36'>
             {layout === "oneside" && (
                 <div>
                  {selectedCharts.map((chart) => (
                     <SingleChartInLayout item={chart.item} id={chart.id} side={"oneside"} addToCharts={setListOfCharts}/>
                  ))}
                 </div>
               )}
 
             {layout === "twoside" && (
                  <div className='grid grid-cols-2 w-full gap-8'>
                       {selectedCharts.map((chart) => (
                     <SingleChartInLayout item={chart.item} id={chart.id} side={"twoside"} addToCharts={setListOfCharts}/>
                  ))}
                 
                 </div>
               )}
 
             </div>
 
           
             <div>
                 <button className='btn btn-lg w-full mt-10 bg-sky-500 focus:outline-0 hover:bg-gray-200 hover:text-black' type='submit'> Create visualization view! </button>
             </div>
 
             
 
         </div>
         </form>
         )}
    </div>
    </div>
   )
}

export default LayoutDesignForUser