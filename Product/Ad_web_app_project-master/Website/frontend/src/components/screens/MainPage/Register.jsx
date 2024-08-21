import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { registerFunction } from '../../../store/actions/AuthActions';
import { resetAfterRegister } from '../../../store/actions/AuthActions';
import { useNavigate } from 'react-router-dom';

//Register Page
function Register() {

  //Set state for inputs
  
  let [userInputs, setUserInputs] = useState({
    username: "",
    email: "",
    password: ""
  });

  //Get state from redux

  let {isSuccess, isError, message} = useSelector(state => state.auth);


  //Set dispatch and navigate

  let dispatch = useDispatch();
  let navigate = useNavigate();

  //Set effect for pages after submitting

  useEffect(() => {

      if (isError) {
        toast.error(message);
        dispatch(resetAfterRegister());
      } else if (isSuccess) {
        toast.success("Register successfully");
        navigate("/login");
        dispatch(resetAfterRegister());
      }

     

  },[isSuccess, isError, message])

  //Handle changes for inputs

  const handleChange = (e) => {

    setUserInputs((userInputs) => {
      return {
        ...userInputs,
        [e.target.name]: e.target.value
      }
    })
  };

  //Handle submit

  const handleSubmit = (e) => {
      e.preventDefault();

      let userInputValues = {
        username: userInputs.username,
        email: userInputs.email,
        password: userInputs.password
      };

      //Email regex for checking

      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let checkEmail = regex.test(userInputValues.email);
      
      //Password regex for checking
      const lowercaseRegExp   = /(?=.*?[a-z])/;
      const digitsRegExp      = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
     
      const uppercaseRegExp   = /(?=.*?[A-Z])/;

      let lowerCaseCheck = lowercaseRegExp.test(userInputValues.password);
      let digitCheck = digitsRegExp.test(userInputValues.password);
      let specialCharCheck = specialCharRegExp.test(userInputValues.password);
      let upperCaseCheck = uppercaseRegExp.test(userInputValues.password);
     
  
      if (userInputValues.username.length <5 || userInputValues.username.length > 12) {
          toast.error("Please fill your username. At least 5 characters are required and no more than 12 characters!")
      } else if (userInputValues.email.length === 0 || checkEmail === false) {
          toast.error("Please check your email!");
      } else if (userInputValues.password.length < 8 || lowerCaseCheck === false || digitCheck === false || specialCharCheck === false || upperCaseCheck === false) {
          toast.error("Please fill your password. At least 8 characters, at least one Uppercase, at least one LowerCase, at least one digit, and at least one special character are required!");
      } else {
         dispatch(registerFunction(userInputValues));
      }
    
    
  };


  return (
    <div className="flex w-full h-screen">
    <div className="w-full flex items-center justify-center lg:w-1/2">
      <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
        <h1 className="text-5xl font-semibold">Register</h1>
        <p className="font-medium text-lg text-gray-500 mt-4">
          Welcome back, please sign up.
        </p>
        <form onSubmit={handleSubmit}>
        <div className="mt-8">
          <div className="flex flex-col">
            <label className="text-lg font-medium"> Username </label>
            <input
              name="username"
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your username"
              value={userInputs.username}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium">Email</label>
            <input
              name="email"
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your email"
              value={userInputs.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex flex-col mt-4">
            <label className="text-lg font-medium">Password</label>
            <input
              name="password"
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your password"
              type={"password"}
              value={userInputs.password}
              onChange={handleChange}
            />
          </div>
         
          <div className="mt-8 flex flex-col gap-y-4">
            <button
              className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-sky-500 rounded-xl text-white font-bold text-lg"
              type="submit"
            >
              Register
            </button>
           
          </div>
          <div className="mt-8 flex justify-center items-center">
            <p className="font-medium text-base">You have an account?</p>
            <Link to="/login">
            <button
              
              className="ml-2 font-medium text-base text-sky-500"
            >
              Sign in
            </button>
            </Link>
          </div>
        </div>
        </form>
      </div>
    </div>
    <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
      <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-spin" />
      <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
    </div>
  </div>
  )
}

export default Register