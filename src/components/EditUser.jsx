import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { headers } from '../ultis/headers'
import { useParams, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'

function EditUser() {
     const [username, setUsername] = useState("")
     const [email, setEmail] = useState("")
     const myUserId = localStorage.getItem("userId")
     const navigate = useNavigate()
     const { id } = useParams()
     const token = localStorage.getItem("accessToken")

     const handleGetCurrentUser = async () => {
          try {
               const { data: res } = await axios.get(`http://localhost:8000/v1/user/${id}`, {
                    headers,
               })
               console.log(id);
               setUsername(res.username)
               setEmail(res.email)
          } catch (error) {
               console.log(error);
          }
     }
     const data = {
          username,
          email,
     }
     useEffect(() => {
          handleGetCurrentUser()
     }, [id])
     const handleUpdateUser = async (e) => {
          e.preventDefault()
          try {
               const { data: res } = await axios.put(`http://localhost:8000/v1/user/${myUserId}/update`,
                    data,
                    {
                         headers: {
                              token: `Bearer ${token}`
                         },
                    }
               )
               navigate("/")
               toast.success("Update Success")
          } catch (error) {
               toast.error("Update Fail")
          }
     }
     return (
          <div className='flex flex-row h-screen w-screen overflow-hidden bg-neutral-100'>
               <Sidebar />
               <div className='flex-1'>
                    <h1 className='px-4 py-2 text-2xl font-semibold'>Edit User</h1>
                    <form className='flex flex-col items-center justify-center w-full cursor-pointer'
                         onSubmit={handleUpdateUser}>
                         <div className='bg-white mt-2 flex border-[1px] border-black px-4 py-2 
                         rounded-lg w-full'>
                              <label>Username:</label>
                              <input
                                   type="text"
                                   value={username}
                                   placeholder='Enter your username'
                                   onChange={(e) => setUsername(e.target.value)}
                                   className='bg-transparent outline-none border-none px-2 text-black w-full'
                              />
                         </div>
                         <div className='bg-white flex border-[1px] border-black px-4 py-2 rounded-lg mt-2 w-full'>
                              <label>Email</label>
                              <input
                                   type="text"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   placeholder="Enter your email"
                                   className='bg-transparent outline-none border-none px-2 text-black w-full'
                              />
                         </div>
                         <button className='bg-orange-500 hover:bg-orange-600 transition duration-200
        text-white px-3 py-1 rounded-xl mt-2 font-medium'>
                              Update
                         </button>
                    </form>
               </div>
          </div>
     )
}

export default EditUser