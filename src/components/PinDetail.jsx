import React, { useState, useEffect, useContext } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { Context } from "../index";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";



const PinDetail = () => {
  const {store} = useContext(Context);
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const fetchPinDetails = () => {
    axios.get(`https://diploms.pythonanywhere.com/api/v1/news/${pinId}`)
        .then(({ data }) => {
          setPinDetail(data);
          store.FilterByCategory(data.category.categoryName)
            .then(({ data: response }) => {
              setPins(response.results.filter((item) => item.id !== data.id))
            })
        })
        .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);



  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      store
        .Comment({ news_id: pinDetail.id, comments: comment })
        .then(() => {
          fetchPinDetails();
          setComment("");
          setAddingComment(false);
        });
    }
  };

  if (!pinDetail) return <Spinner message="Жаңалық жүктелуде..." />;

  return (
    <>
      {pinDetail && (
        <div
          className="flex xl-flex-row flex-col m-auto bg-white"
          style={{ maxWidth: "1500px", borderRadius: "32px" }}
        >
          <div className="flex justify-center items-center md:items-start flex-initial">
            <img
              src={`https://diploms.pythonanywhere.com${pinDetail?.image1}`}
              className="rounded-t-3xl rounded-b-lg w-full"
              alt="user-post"
            />
          </div>
          <div className="w-full p-5 flex-1 xl:min-w-620">
            <div>
              <h1 className="text-2xl font-bold break-words mt-3">
                {pinDetail.title}
              </h1>
              <p className="mt-3">{pinDetail.descriptionNews}</p>
            </div>
            <h2 className="mt-5 text-2xl">Пікірлер</h2>
            <div className="max-h-370 overflow-y-auto">
              {pinDetail?.comments?.map((comment, i) => (
                <div
                  className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                  key={i}
                >
                  <img
                    src={`https://diploms.pythonanywhere.com${comment.user_photo}`}
                    alt="user-profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-bold">{comment.user.username}</p>
                      <span className="text-xs opacity-50">{comment.date_created}</span>
                    </div>
                    <p>{comment.comments}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              <input
                className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Пікір жазу"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                {addingComment ? "Пікір жіберілуде..." : "Жіберу"}
              </button>
            </div>
          </div>
        </div>
      )}
      {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          Ұқсас жаналықтар
        </h2>
      )}
      {pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <Spinner message="Жаңалықтар жүктелуде" />
      )}
    </>
  );
};

export default PinDetail;
