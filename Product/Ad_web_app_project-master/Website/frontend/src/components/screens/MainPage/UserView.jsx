import React from 'react';
import { useContext } from 'react';
import ChartContext from '../../context/ChartContext';
import SingleCreatedView from '../SingleItem/SingleCreatedView';

function UserView() {
    let {layouts} = useContext(ChartContext);


  return (
    <div className='bg-stone-200 p-10 pb-80'>
    <div className='container mx-auto mb-32'>
        <h1 className='text-center text-black font-bold text-3xl'> Public Created Data Visualizations </h1>

        <div className=''>
            {layouts.map((layout) => (
                <SingleCreatedView layout={layout}/>
            ))}
        </div>
    </div>
    </div>
  )
}

export default UserView