import React from 'react';
import {FaTimes} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logoutFunction } from '../../../store/actions/AuthActions';
import { useDispatch } from 'react-redux';


function Navbar({closeModal, navbarOpen}) {
    //Set dispatch 
    let dispatch = useDispatch();

    //Set navigate
    let navigate = useNavigate();

    //Set close for navbar
    const handleClick = () => {

        closeModal();
    };

    //Go to login page

    const toLogIn = () => {

        navigate("/login");
        closeModal();

    };

    //Go to register page

    const toRegister = () => {
        navigate("/register");
        closeModal();   
    };

    //Go to Main page

    const toHomePage = () => {
        navigate("/");
        closeModal();  
    };

    //Go to emission page

    const toEmissionPage = () => {
        navigate("/emission");
        closeModal();
    };

    //Go to page to design layout

    const toLayout = () => {
        navigate("/layoutdesign");
        closeModal();
    };

    //Go to profile page

    const toProfilePage = () => {
        navigate("/userprofile");
        closeModal();
    };

    //Handle log out

    const handleLogout = () => {
        dispatch(logoutFunction());
        navigate("/login");
        closeModal();
    }

    //Get global state from redux for auth

    let {user} = useSelector(state => state.auth);

  return (
    <div className={navbarOpen ? "nav fixed top-0 left-0 w-full h-full z-10": undefined} onClick={() => closeModal()} >
        <div className={navbarOpen ? ("open active absolute top-0 left-0 w-3/12 xl:w-2/12 md:w-2/12 lg:w-2/12 h-full bg-gray-200") : "open absolute top-0 left-0 w-3/12 xl:w-2/12 md:w-2/12 lg:w-2/12 h-full bg-gray-200"} onClick={(e) => e.stopPropagation()}>
            <div className='flex items-center justify-between my-10 px-2'>
            <h1 className="text-xl text-black font-bold"> Navigation  </h1>
            <FaTimes className="inline-block border-2 cursor-pointer" size={24} color={"red"} onClick={handleClick}/>
            </div>
            <ul className='p-0 border-2'>
            <li className='py-5 text-center border-b-2 border-b-gray-600 border-t-2 border-t-gray-600 cursor-pointer font-bold' onClick={toHomePage}> <p> Athmospheric co2 and temperatures </p> </li>
            <li className='py-5 text-center text-center pt-5 border-b-2 border-b-gray-600 cursor-pointer font-bold' onClick={toEmissionPage}> <p> Emission sources </p> </li>
            <li className='py-5 text-center text-center pt-5 border-b-2 border-b-gray-600 cursor-pointer font-bold' onClick={toLayout}> <p> To Layout Design Page </p> </li>

                {user.username ?(
                         <li className='py-5 text-center text-center pt-5 border-b-2 border-b-gray-600 cursor-pointer font-bold' onClick={toProfilePage}> <p> User: {user.username} </p> </li>
                    ) : (  <li className='py-5 text-center text-center pt-5 border-b-2 border-b-gray-600 cursor-pointer font-bold' onClick={toLogIn}> <p> Log In </p> </li>)}

                {user.username ? (
                    <li className='py-5 text-center text-center pt-5 border-b-2 border-b-gray-600 cursor-pointer font-bold' onClick={handleLogout}> <p> Log out </p> </li>
                ):<li className='py-5 text-center text-center pt-5 border-b-2 border-b-gray-600 cursor-pointer font-bold' onClick={toRegister}> Register </li>}
              
              
                
            </ul>
        </div>
    </div>
  )
}

export default Navbar