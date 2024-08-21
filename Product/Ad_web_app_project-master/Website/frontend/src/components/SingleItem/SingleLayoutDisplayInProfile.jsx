
import {FaTimes} from "react-icons/fa";
import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteLayouts } from "../../store/actions/LayoutAddActions";

function SingleLayoutDisplayInProfile({layout}) {

    //Set dispatch

    let dispatch = useDispatch();

    //Handle delete

    const handleDelete = () => {
        dispatch(deleteLayouts(layout._id));
    };

  return (
    <div className='w-full flex justify-between'>
     <Link to={`/publiclayout/${layout._id}`} className="w-full">
    <div className='w-full bg-amber-300 rounded-lg p-10 my-10 shadow-lg'> 
       
        <div>
            <h3 className='text-black font-bold text-xl'> {layout.name} </h3>
        </div>
       
    </div>
    </Link>

    <div >
        <FaTimes color="red" size={24} className="inline-block cursor-pointer" onClick={handleDelete}/>
    </div>
    </div>
  )
}

export default SingleLayoutDisplayInProfile