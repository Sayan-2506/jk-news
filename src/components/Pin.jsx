import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { AiTwotoneLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { Context } from "../index";


const Pin = ({ pin }) => {
  const navigate = useNavigate();
  const { id, title, image1, image2, likes, date_create_news, category, comments } = pin;

  const [like, setLike] = useState({
    isLike: localStorage.getItem(`like${id}`) !== 'undefined' ? JSON.parse(localStorage.getItem(`like${id}`)) : false,
    likes: likes.length
  });
  const {store} = useContext(Context);


  const likeHandler = () => {
    if (like.isLike && like.likes > 0) {
      localStorage.removeItem(`like${id}`)
      setLike({
        isLike: false,
        likes: like.likes - 1
      })
    } else if (!like.isLike) {
      localStorage.setItem(`like${id}`, true)
      setLike({
        isLike: true,
        likes: like.likes + 1
      })
    }
    store.Like({ post: id })
  }


  return (
    <div className="m-2 mb-5">
      <div
        onClick={() => navigate(`/home/pin-detail/${id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {image1 && (
          <img
            className="rounded-lg w-full"
            src={`${image1.includes('https://diploms.pythonanywhere.com') ? image1 : 'https://diploms.pythonanywhere.com' + image1}`}
            alt="user-post"
          />
        )}
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <span className="bg-black text-white rounded-lg text-xs w-16 h-7 flex justify-center items-center">
            {category.categoryName}
          </span>
          <div className="ml-2 flex items-center space-x-2">
            <div onClick={likeHandler} className="flex items-center">
              <span className="mr-1">{<AiTwotoneLike />}</span>
              <span>{like.likes}</span>
            </div>

            <div className="flex items-center">
              <span className="mr-1">{<FaComment />}</span>
              <span>{comments.length}</span>
            </div>
          </div>
        </div>
        <span className="text-xs opacity-50">{date_create_news}</span>
      </div>
      <p className="flex gap-2 mt-2 items-center font-bold">
        {title.length > 70 ? title.slice(0, 90) + "..." : title}
      </p>
    </div>
  );
};

export default Pin;
