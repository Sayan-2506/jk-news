import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';


const Navbar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return navigate('/login');

  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within shadow-sm">
        <IoMdSearch fontSize={21} className='ml-1' />
        <input type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Іздеу'
          value={searchTerm}
          onFocus={() => navigate('search')}
          className='p-2 w-full bg-white outline-none'
        />
      </div>
      <div className="flex gap-3">
        <Link to={`user-profile/`} className='hidden md:block'>
          <img src={'https://diploms.pythonanywhere.com' + user.photo} alt="user" className='w-14 h-12 rounded-lg'/>
        </Link>
        {user.is_superuser && <Link to={'create-pin'} className='bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'>
          <IoMdAdd />
        </Link>}
      </div>
    </div>
  )
}

export default Navbar