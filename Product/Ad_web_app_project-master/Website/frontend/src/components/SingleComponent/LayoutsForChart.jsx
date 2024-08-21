import React from 'react';
import { useContext } from 'react';
import mockData from '../../data/mockdata';
import ChartContext from '../../context/ChartContext';
import { useState } from 'react';
import SingleChartOneSide from '../SingleItem/SingleChartOneSide';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function LayoutsForChart() {

    let {charts, setBackArray} = useContext(ChartContext);
    let navigation = useNavigate();
    let chosenCharts = mockData.filter((chart) => {
        return charts.includes(chart.id);
    });

    let [layout, setLayout] = useState("oneside");

    const submit = () => {
        toast.success("Create successfully!");
        setBackArray();
        navigation("/");
    }
    

  return (
    <div className='p-24 bg-stone-300'>
   <div className='container mx-auto p-5 mb-36'>
       <h1 className='text-center text-black font-bold text-3xl'> Layout Design Page for User! </h1>

        {charts.length == 0 
        
        ? 
        
        (<div className='text-center my-52 text-3xl text-pink-500 font-bold m'> No charts added to layout! </div>) 
        
        : 
        
        (<div className='my-10'> 

            <div className='flex'>
                <div className='formgroup flex items-center mb-4 mr-4'>
                <input type="radio" name="sidelayout" id="oneside" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' onChange={() => setLayout("oneside")} checked={layout === "oneside"}/>
                <label htmlFor='oneside' className='ml-2 text-lg font-medium text-gray-900 dark:text-gray-300'> One-side Layout </label>
                </div>

                <div className='form-group flex items-center mb-4'>
                <input type="radio" name="sidelayout" id="twoside" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' onChange={() => setLayout("twoside")} checked={layout === "twoside"}/>
                <label htmlFor="twoside" className='ml-2 text-lg font-medium text-gray-900 dark:text-gray-300'> Two-side Layout </label>
                </div>
            </div>

            <div className='my-36'>
            {layout === "oneside" && (
                  <div>
                     {chosenCharts.map((chart) => (
                        <SingleChartOneSide chart={chart} key={chart.id}/>
                    ))}
                </div>
              )}

            {layout === "twoside" && (
                  <div className='grid grid-cols-2 gap-8'>
                     {chosenCharts.map((chart) => (
                        <SingleChartOneSide chart={chart} key={chart.id}/>
                    ))}
                </div>
              )}

            </div>

            <div>
            <textarea name="textbox" id="textbox" cols="30" rows="10" className='w-full focus:outline-0 rounded-lg border-2 border-gray-900 pl-4'></textarea>
            </div>

            <div>
                <div className='btn btn-lg w-full mt-10 bg-sky-500 focus:outline-0 hover:bg-gray-200 hover:text-black' onClick={submit}> Create visualization view! </div>
            </div>

            

        </div>)}
   </div>
   </div>
  )
}

export default LayoutsForChart