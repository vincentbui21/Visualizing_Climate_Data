import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { removeFromLayout } from '../../store/actions/LayoutActions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

function SingleChartInLayout({item, id, side, addToCharts}) {

    //Set dispatch

    let dispatch = useDispatch();

    //Handle delete

    const handleDelete = () => {
        dispatch(removeFromLayout(id));
    };

    //Set state for description

    let [chartList, setChartList] = useState({
        chartId: id,
        description: ""
    })
    
    //Set changes for description

    const handleChange = (e) => {

        setChartList((chartList) => {
            return {
                ...chartList,
                [e.target.name] : e.target.value
            }
        })
        
        addToCharts((prevCharts) => {
            return prevCharts.map((chart) => chart.chartId === chartList.chartId ? {...chart, description: e.target.value} : chart);
        });
    };

    


  return (
    <div className={side === "oneside" ? "my-44 p-10" : "my-16 p-10"}>
        <div className='flex justify-end'>
        <div className='p-4 border-2 border-red-600 rounded-lg cursor-pointer'>
        <FaTimes size={36} className="inline-block" color={"#FF1493"} onClick={handleDelete}/>
        </div>
        </div>
        <div className='title '>
            <h3 className='text-black font-bold text-center mb-10 text-3xl'> Visualization type: {id}</h3>
        </div>
        {item}
       

        <div className='flex items-center justify-center w-full'>
            <textarea name="description" id="description" className="mt-10 w-full p-4 border-2 border-black focus:outline-0 rounded-lg shadow-xl text-black font-bold placeholder:text-black placeholder:font-bold" placeholder='Write your description...!' cols="30" rows="10" onChange={handleChange} value={chartList.description}></textarea>
        </div>
    </div>
  )
}

export default SingleChartInLayout