import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import LayoutForDesignPageContext from '../../context/LayoutForDesignPage';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addToLayout } from '../../store/actions/LayoutActions';
import { removeFromLayout } from '../../store/actions/LayoutActions';
// localStorage.removeItem("layout");
function EachChart({id, singleItem}) {

  //Global state from redux for auth
  let {user} = useSelector(state => state.auth);

  //Global state from redux for layout array with charts inside for layout design page

  let {layoutArray} = useSelector(state => state.layout);
  
  //Set dispatch
  let dispatch = useDispatch();

  //Check whether a layout is added or not

  let chartExists = layoutArray.includes(id);


  //Handle add chart to layout page when logging successfully;
  const handleAddChart = () => {
    dispatch(addToLayout(id));
    
  };

  //Handle remove chart out of layout page when logging successfully

  const handleRemoveChart = () => {
    dispatch(removeFromLayout(id));
  };

  return (
  
     <div className='p-5 my-5'>       
            <div>
            <h1 className='text-black text-center text-3xl my-5'> Visualization type: <span className='font-bold'> {id} </span> </h1>
            {singleItem}
            </div>

            <div className='flex items-center justify-center my-5'>
              {user.username && chartExists === false
              
              &&
              
              
              (
                <div className='btn btn-lg bg-sky-500 focus:outline-0' onClick={handleAddChart}> Add This Chart to Layout! </div>
              )
            }

            {user.username && chartExists === true ?
        

              (
                <div className='btn btn-lg bg-amber-100 focus:outline-0 text-black font-bold' onClick={handleRemoveChart}> Added to layout (can be seen in layout design page)</div>
              )

              :

              (<div> </div>)
            } 

            {!user.username &&  (
              <Link to="/login">
              <div className='btn btn-lg bg-amber-500 focus:outline-0'> Please Log In To Add Chart! </div>
              </Link>
              )}
            </div>
    </div>
    
  )
}

export default EachChart