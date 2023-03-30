import React, { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, loginSuccess } from '../redux/actions/auth'
import axios from 'axios'

function Login() {
  const [username, setName] = useState("")
  const [password, setPass] = useState("")
  const [navigate, setNavigate] = useState(false);
  const dispatch = useDispatch()
  const getUser = async (e) => {
    e.preventDefault();
    const user = { username, password };
    dispatch(login())
    try {
      const { data: res } = await axios.post("http://localhost:8000/v1/auth/login",
        user,
        // { withCredentials: true }
      )
      dispatch(loginSuccess({
        accessToken: res.accessToken,
        userId: res._id,
      }))
      // axios.defaults.headers.common['Authorization'] = `Bearer ${res['token']}`;
      setNavigate(true);
      // toast.success("Login Success!")
    } catch (error) {
      // toast.error("Username or password is not true!")
    }
  }
  if (navigate) {
    return <Navigate to="/" />;
  }
  return (
    <div className='flex flex-col items-center bg-gradient-to-r from-cyan-500 to-blue-500 h-screen'>
      <h1 className='text-3xl text-white font-bold mt-5 uppercase flex flex-col'>
        Sign In
      </h1>
      <form className='h-[300px] w-[400px] bg-white border-[1px] 
      flex flex-col items-center justify-center rounded-lg mt-4'
        onSubmit={getUser}>
        <div className='flex items-center justify-start bg-white px-3 py-1 rounded 
        w-[80%] text-black border-[1px] border-gray-400'>
          <AiOutlineUser className='text-2xl' />
          <input
            type="text"
            id='username'
            required
            value={username}
            placeholder="Enter your username"
            className='border-none outline-none pl-3 py-1 bg-transparent
            text-gray-400 w-full'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='flex items-center justify-start bg-white px-3 py-1 rounded
                    w-[80%] mt-3 text-black border-[1px] border-gray-400'>
          <RiLockPasswordLine className='text-black text-2xl bg-transparent' />
          <input
            type="password"
            id='password'
            required
            value={password}
            placeholder="Enter your password"
            className='border-none focus:border-none focus:outline-none 
            outline-none bg-transparent pl-3 py-1 w-full'
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <p className='cursor-pointer text-gray-600 mt-3'>
          Need an Account?
          <span>
            <Link to="/register" className='hover:underline transition duration-200 ml-1'>Sign Up</Link>
          </span>
        </p>
        <span className='border-[1px] w-[80%] border-gray-300 mt-3 mb-1'></span>
        <button
          className='mt-3 p-2 bg-green-500 text-white rounded-xl
          hover:bg-green-600 w-[50%] transition ease-in-out duration-200'>
          Sign In
        </button>
      </form>
    </div>
  )
}

export default Login