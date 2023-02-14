import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Feed, PinDetail, Navbar } from '../components';
import CreatePin from '../components/CreatePin';
import Search from '../components/Search';
import CalendarEvent from '../components/CalendarEvent'


const Pins = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="h-full">
        <Routes>
        

          <Route path="/" element={<Feed />} />
          <Route path="/calendar" element={<CalendarEvent />} />
          <Route path="pin-detail/:pinId" element={<PinDetail />} />
          <Route path="category/:categoryId" element={<Feed />} />
          <Route path="/create-pin" element={<CreatePin />} />
          <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        
        </Routes>
      </div>
    </div>
  );
};

export default Pins;