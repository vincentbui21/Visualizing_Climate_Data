import React from 'react';
import { useSelector } from 'react-redux';
import { fetchLayouts } from '../../../store/actions/LayoutAddActions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import SingleLayoutDisplayInProfile from '../../SingleItem/SingleLayoutDisplayInProfile';
import { deleteUser } from '../../../store/actions/UserActions';
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';

//User Page for log-in user 
function UserProfilePage() {

    //Global state from redux for auth
    let {user} = useSelector(state => state.auth);

      //Global state from redux for layout arrays

      let {layoutArrays} = useSelector(state => state.layoutAdd);

      //Set dispatch
  
      let dispatch = useDispatch();
  
      // Set effect for fetching
  
      useEffect(() => {
        dispatch(fetchLayouts());
      },[]);
      
       //Set navigate

       let navigate = useNavigate();
    
      
       //Handle delete user
   
       const handleDelete = () => {
           if (window.confirm("Are you sure to delete your own account? All created layouts are also deleted!")) {
             dispatch(deleteUser());
             navigate("/");
             toast.success("Delete yourself successfully!");
           } else {
             console.log("No delete!");
           }
       };
    

  return (
        <div>
        <div className='container mx-auto p-5'>
        <div className="my-10 flex justify-between items-center">
            <h1 className='text-black text-3xl font-bold my-5' onClick={handleDelete}> Profile Page: {user.username}</h1>

            <div className='btn btn-lg bg-emerald-400 focus:outline-0' onClick={handleDelete}> Delete User </div>
            </div>
            <div className='bg-gray-100 w-10/12 xl:w-6/12 lg:w-6/12 md:w-6/12 border-2 rounded-lg border-black p-10 shadow-lg'>
               
                    <h3 className='text-black font-bold text-xl'> Name: {user.username}</h3>
    
               
                    <h3 className='text-black font-bold text-xl mt-5'> Email: {user.email}</h3>

            </div>

            <div className='my-10'>
              <h1 className='text-black font-bold text-3xl'> List of layouts created by {user.username}: </h1>
            </div>

            {layoutArrays.length === 0 && (
              <h3 className='text-pink-600 font-bold text-3xl my-10 text-center'> No layouts are created by {user.username} </h3>
            )}
            
            {layoutArrays.length > 0 && (
              layoutArrays.map((layout) => (
                <SingleLayoutDisplayInProfile key={layout._id} layout={layout}/>
              ))
            )}

        </div>
        </div>
  )
}



export default UserProfilePage