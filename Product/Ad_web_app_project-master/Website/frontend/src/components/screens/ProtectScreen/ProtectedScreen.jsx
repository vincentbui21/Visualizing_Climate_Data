import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

//Protect Screen
function ProtectedScreen() {

    //Set state for checking user
    let [checkUser, setCheckUser] = useState(true);


    //Get global state from redux for auth
   let {user} = useSelector(state => state.auth);

   //Set effect when checking user

   useEffect(() => {

    if (user.username) {
        setCheckUser(true);
    } else {
        setCheckUser(false);
    }

   },[user.username]);



   return checkUser ? <Outlet /> : <Navigate to="/login"/>


}

export default ProtectedScreen
