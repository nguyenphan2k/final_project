import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { headers } from '../ultis/headers'
import { toast } from 'react-toastify'
import {BsPen} from 'react-icons/bs'
import { AiOutlineDelete } from "react-icons/ai";

function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(5)
  const pageNumbers = []
  const totalUsers = users.length
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)
  const myUserId = localStorage.getItem("userId")
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")

  const removeItem = (item) => {
    localStorage.removeItem(item)
  }

  const handleDelete = async () => {
    try {
      const { data: res } = await axios.post("http://localhost:8000/v1/auth/logout",
        userId,
        {
          headers,
        }
      )
      console.log(res)
      removeItem("accessToken")
      removeItem("userId")
      navigate("/login")
      toast.success("Logout success!")
    } catch (error) {

    }
  }
  const handleGetUsers = async () => {
    setIsLoading(true)
    try {
      const { data: res } = await axios.get("http://localhost:8000/v1/user", {
        headers,
      })
      console.log(res);
      setUsers(res)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }
  useEffect(() => {
    handleGetUsers()
  }, [])
  const handleClick = (pageNumbers) => setCurrentPage(pageNumbers)

  const handleRemove = async (userId) => {
    try {
      const { data: res } = await axios.delete(`http://localhost:8000/v1/user/${userId}/delete`, {
        headers,
      })
      setUsers(users.filter((user) => (user._id !== userId)))
    } catch (error) {
      console.log(error);
    }
  }

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i)
  }
  if (isLoading) return <h1 className='text-4xl text-white flex items-center bg-black/60 
  w-full h-screen justify-center'>
    Loading.....
  </h1>
  return (
    <div className='flex flex-row h-screen w-screen overflow-hidden bg-neutral-100'>
      <Sidebar handleDelete={handleDelete} />
      <div className='flex-1'>
        <Header lists={users} handleDelete={handleDelete}/>
        <div className='mt-3'>
          <table className='w-full text-gray-700'>
            <thead className='bg-sky-300'>
              <tr>
                <th className='text-lg font-medium text-white px-6 py-4'>ID</th>
                <th className='text-lg font-medium text-white px-6 py-4'>Account</th>
                <th className='text-lg font-medium text-white px-6 py-4'>Email</th>
                <th className='text-lg font-medium text-white px-6 py-4'>Role</th>
                <th className='text-lg font-medium text-white px-6 py-4'>Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {currentUsers.filter((user) => {
                return search.toLowerCase() === '' ? user : user.username.toLowerCase().includes(search)
              }).map((user) => (
                <tr key={user._id} className="border-black border-b-[1px]">
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 ">
                    {user._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 ">
                    {user.username}
                  </td>
                  <td className="text-lg text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="text-lg text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                    {`${user?.isAdmin.toString() && user.username.includes('admin') ? 'admin' : 'user'}`}
                  </td>
                  <td className="flex justify-center items-center text-lg text-gray-900 font-medium mt-2 space-x-2">
                    {myUserId === user._id && !user.username.includes("admin")
                      && <button className='px-4 py-2 text-gray-900 border-[1px]
                      rounded-full transition ease-in-out hover:shadow-2xl
                      duration-200 bg-orange-500 hover:bg-orange-600 
                      hover:text-white font-medium shadow-xl'
                        onClick={() => navigate(`/user/${user._id}`)}>
                        <BsPen size={20}/>
                      </button>}
                    {user.username.includes("admin")
                      ? !user.username.includes("admin")
                      : <button className='px-4 py-2 text-gray-900 border-[1px]
                  rounded-full transition ease-in-out hover:shadow-2xl
                  duration-200 bg-orange-500 hover:bg-orange-600 
                  hover:text-white font-medium shadow-xl'
                        onClick={() => handleRemove(user._id)}
                        disabled={myUserId === user._id}
                        defaultChecked={user.username.includes("admin") && user.isAdmin === true}>
                        <AiOutlineDelete size={20}/>
                      </button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex mt-2'>
          <ul className='flex gap-1 items-center cursor-pointer'>
            {pageNumbers.map(number => (
              <li onClick={() => handleClick(number)} key={number}
                className="px-3 py-1 text-black border-[1px] hover:bg-yellow-400/90
                transition-all duration-200 ease-in-out bg-transparent rounded-lg
                border-gray-400 ml-2 flex items-center justify-center hover:border-yellow-400/90">
                {number}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home