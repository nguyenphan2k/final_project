import React, { useState } from 'react'
import axios from "axios";
import { Link, Navigate } from 'react-router-dom';
import {toast} from 'react-toastify'

function Register() {
     const [username, setUser] = useState("")
     const [email, setEmail] = useState("")
     const [password, setPwd] = useState("")
     const [navigate, setNavigate] = useState(false)
     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const newUser = { username, password, email }
               if (newUser.username.includes('admin') || newUser.password.includes('admin')) {
                    const res = await axios.post("http://localhost:8000/v1/auth/register", newUser)
                    toast.success("Register Success!")
               }
               else {
                    const res = await axios.post("http://localhost:8000/v1/auth/register", newUser)
                    toast.success("Register Success!")
               }
               setNavigate(true)
          } catch (error) {
               toast.error("Username or password is not true!")
          }
     }
     if (navigate) {
          return <Navigate to="/login" />
     }
     return (
          <div className='bg-gradient-to-r from-cyan-500 to-blue-500 h-screen w-full'>
               <section className='flex flex-col items-center'>
                    <div>
                         <h1 className='text-3xl text-white text-center font-bold
                              mt-3 uppercase'>SIGN UP</h1>
                    </div>
                    <form className='flex flex-col items-center h-[400px] w-[450px] bg-white 
                         justify-center mt-5 rounded-xl cursor-pointer border-[1px]'
                         onSubmit={handleSubmit}>
                         <div className=' flex items-center bg-white px-3 py-1 rounded
                              w-[80%] text-black border-[1px] border-gray-400'>
                              <label htmlFor='username' className='flex items-center'>
                                   Username:
                              </label>
                              <input
                                   type="text"
                                   id='username'
                                   required
                                   value={username}
                                   placeholder="Enter your name"
                                   className='border-none outline-none pl-3 py-1 bg-transparent
                                   w-full text-black '
                                   onChange={(e) => setUser(e.target.value)}
                              />
                         </div>
                         <div className=' flex items-center bg-white px-3 py-1 rounded
                              w-[80%] text-black mt-3 border-[1px] border-gray-400'>
                              <label htmlFor='email' className='flex items-center'>
                                   Email:
                              </label>
                              <input
                                   type="text"
                                   id='email'
                                   required
                                   value={email}
                                   placeholder="Enter your name"
                                   className='border-none outline-none pl-3 py-1 bg-transparent
                                   w-full text-black'
                                   onChange={(e) => setEmail(e.target.value)}
                              />
                         </div>
                         <div className=' flex items-center bg-white px-3 py-1 rounded
                         w-[80%] focus:bg-slate-700/70 mt-3 border-[1px] border-gray-400'>
                              <label htmlFor='password' className='flex items-center'>
                                   Password:
                              </label>
                              <input
                                   type="password"
                                   value={password}
                                   required
                                   placeholder="Enter your password"
                                   className='border-none outline-none pl-3 py-1 bg-transparent
                                   text-gray-400 w-full'
                                   onChange={(e) => setPwd(e.target.value)}
                              />
                         </div>
                         <p className='cursor-pointer text-gray-600 mt-3'>
                              Already registered?
                              <Link to="/login" className='hover:underline transition duration-200 ml-1'>
                                   Sign In
                              </Link>
                         </p>
                         <span className='border-[1px] w-[80%] border-gray-300 mt-3 mb-1'></span>
                         <button className='mt-5 p-2 bg-green-500 text-white rounded-xl
                               hover:bg-green-600 w-[50%] transition ease-in-out duration-200
                               hover:rounded-3xl'>
                              Create new account
                         </button>
                    </form>
               </section>
          </div>
     )
}

export default Register