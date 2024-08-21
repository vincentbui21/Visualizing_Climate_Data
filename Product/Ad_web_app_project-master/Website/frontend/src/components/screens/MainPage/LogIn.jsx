import React from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loginFunction } from '../../../store/actions/AuthActions';
import { resetAfterLogin } from '../../../store/actions/AuthActions';
import { useNavigate } from 'react-router-dom';
function LogIn() {


  //Set state for user inputs
  let [userInputs, setUserInputs] = useState({
    username: "",
    password: ""
  });

  //Set dispatch and navigate

  let navigate = useNavigate();
  let dispatch = useDispatch();

  //Global state from redux for auth

  let {user, isSuccess, isError, message} = useSelector(state => state.auth);

  //Set effect for pages

  useEffect(() => {

    if (isError) {
      toast.error(message);
      dispatch(resetAfterLogin());
    } else if (isSuccess) {
      toast.success("Log in succesfully!");
      navigate("/userprofile");
      dispatch(resetAfterLogin());
    } else if (user.username) {
      navigate("/");
    }


  },[user.username, isSuccess, isError, message])

  //Handle changes for inputs

  const handleChange = (e) => {

    setUserInputs((userInputs) => {
      return {
        ...userInputs,
        [e.target.name]: e.target.value
      }
    })
  };

  //Handle submit for inputs

  const handleSubmit = (e) => {

      e.preventDefault();

      let userInputValues = {
        username: userInputs.username,
        password: userInputs.password
      };

      if (userInputValues.username.length === 0 || userInputValues.password.length === 0) {
        toast.error("Please fill in your information!");
      } else {

        dispatch(loginFunction(userInputValues));
      }
  };

  

  return (
    <div className="flex w-full h-screen">
    <div className="w-full flex items-center justify-center lg:w-1/2">
      <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
        <h1 className="text-5xl font-semibold">Team 10</h1>
        <p className="font-medium text-lg text-gray-500 mt-4">
          Welcome back, please sign in.
        </p>

        <form onSubmit={handleSubmit}>
        <div className="mt-8">
          <div className="flex flex-col">
            <label className="text-lg font-medium"> Username </label>
            <input
              name="username"
              onChange={handleChange}
              value={userInputs.username}
              
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your username"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-lg font-medium">Password</label>
            <input
              name="password"
              value={userInputs.password}
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your password"
              type={"password"}
              onChange={handleChange}
            />
          </div>
         
          <div className="mt-8 flex flex-col gap-y-4">
            <button
              className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-sky-500 rounded-xl text-white font-bold text-lg"
              type='submit'
            >
              Sign in
            </button>
           
          </div>
          <div className="mt-8 flex justify-center items-center">
            <p className="font-medium text-base">Don't have an account?</p>
            <Link to="/register">
            <button
              
              className="ml-2 font-medium text-base text-sky-500"
            >
              Sign up
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

export default LogIn