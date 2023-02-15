import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, useNavigate, Route, Routes } from 'react-router-dom';

import { Sidebar } from '../components';
import Pins from './Pins';
import logo from '../assets/logo.png';
import UserProfile from '../components/UserProfile';


const Home = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    const logout = () => {
      localStorage.clear();
      navigate("/login");
      window.location.reload();
    }

    const user =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : logout;


    useEffect(() => {
      scrollRef.current.scrollTo(0, 0);

      if (!JSON.parse(localStorage.getItem('isUpdate'))) {
        localStorage.setItem('isUpdate', JSON.stringify(true))
        window.location.reload();
      }
    }, [])

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar closeToggle={setToggleSidebar} />
      </div>

      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)} />
          <Link to='/home'>
            <img src={logo} alt="logo" className='w-28'/>
          </Link>
          <Link to={`user-profile/`}>
            <img src={'https://diploms.pythonanywhere.com' + user.photo} alt="logo" className='w-10 h-10 rounded-full'/>
          </Link>
        </div>
        {toggleSidebar && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setToggleSidebar(false)} />
          </div>
          <Sidebar closeToggle={setToggleSidebar} />
        </div>
      )}
      </div>

      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef} onClick={() => setToggleSidebar(false)}>
        <Routes>
          <Route path='/user-profile/' element={<UserProfile />} />
          <Route path='/*' element={<Pins closeToggle={setToggleSidebar} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home