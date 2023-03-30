import React, { useEffect } from 'react';
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import EditUser from './components/EditUser';
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  const { accessToken, userId } = useSelector((state) => state.auth)
  useEffect(() => {
    if (
      !localStorage.getItem("accessToken") ||
      (!localStorage.getItem("userId"))) {
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("userId", userId)
    }
  }, [accessToken, userId])
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/user/:id' element={<EditUser />} />
      </Routes>
      <ToastContainer
        position='bottom-center'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      >
      </ToastContainer>
    </div>
  );
}

export default App;
