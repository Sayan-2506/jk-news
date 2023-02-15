import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { BsCalendarCheck } from "react-icons/bs";

import logo from "../assets/logo.png";
import { categoryImages } from "../utils/data";
import { Context } from "../index";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ closeToggle }) => {
  const navigate = useNavigate();

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  const categories = JSON.parse(localStorage.getItem("category"));

  const { store } = useContext(Context);

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return navigate("/login");

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/home"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/home/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Басты бет
          </NavLink>
          <NavLink
            to="calendar"
            className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
          onClick={handleCloseSidebar}
            >
            <BsCalendarCheck />
            Күнтізбе
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">Категориялар</h3>
          {categories.map((category) => (
            <NavLink
              to={`category/${category.categoryName}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.categoryName}
            >
              <img
                src={categoryImages[category.discription]}
                className="w-8 h-8 rounded-full shadow-sm"
                alt="category-img"
              />
              {category.categoryName}
            </NavLink>
          ))}
        </div>
      </div>
      {store.isAuth && (
        <Link
          to={`user-profile/`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={"https://diploms.pythonanywhere.com" + user.photo}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p className="font-bold text-base">
            {user.first_name} {user.last_name}
          </p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
