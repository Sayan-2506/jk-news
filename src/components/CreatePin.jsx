import React, { useState, useContext } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import Spinner from "./Spinner";
import { Context } from '../index';

const CreatePin = () => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState({
    url: null,
    file: null
  });
  const [wrongImageType, setWrongImageType] = useState(false);

  const { store } = useContext(Context);

  const navigate = useNavigate();
  const categories = JSON.parse(localStorage.getItem('category'));
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return navigate('/login');

  const uploadImage = (e) => {
    const { type } = e?.target?.files[0];

    if(type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/gif' || type === 'image/tiff') {
      setWrongImageType(false);
      setLoading(true);
      setImageAsset(() => {
        return {file: e.target.files[0], url: URL.createObjectURL(e.target.files[0])}
      })
      setLoading(false);
      } else {
        setWrongImageType(true);
    }
  }

  const savePin = () => {
    let data = new FormData();
    if(title && about && imageAsset && category) {
        const catId = categories.filter(item => item.categoryName === category)[0].id;
        data.append('image1', imageAsset.file, imageAsset.file.name);
        data.append('image2', imageAsset.file, imageAsset.file.name);
        data.append('title', title);
        data.append('descriptionNews', about);
        data.append('category_id', catId);
        store.AddNews(data)
        .then(() => {
          navigate('/home/')
        })
    } else {
      setFields(true);

      setTimeout(() => setFields(false), 2000)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Барлық жолдарды толтырыңыз!
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>Дұрыс сурет жүктеніз</p>}
            {!imageAsset.file ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Сурет жүктеу үшін басыңыз</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    20 МБ-тан аз жоғары сапалы JPG, SVG, PNG, GIF пайдаланыңыз
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0" 
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img src={imageAsset?.url} alt="uploaded-pic" className="object-cover h-full w-full" />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset({
                    file: null,
                    url: null
                  })}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Жаңалық тақырыбы"
            className="outline-none text-2xl sm:text-2xl font-bold border-b-2 border-gray-200 p-2"
          />
          {user && (
            <div className="flex gap-2 my-2 items-center bg-white rounded-lg">
              <img
                src={"https://diploms.pythonanywhere.com" + user.photo}
                className="w-10 h-10 rounded-full"
                alt="user-profile" 
              />
              <p className="font-bold">{user.username}</p>
            </div>
          )}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Жаналық сипаттамасы"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text-lg sm:text-xl">Жаңалық категориясы</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                >
                  <option value="other" className="bg-white">Категория таңданыз</option>
                  {categories.map((category, i) => (
                    <option key={i} className="text-base border-0 outline-none capitalize bg-white text-black" value={category.name}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
            </div>
            <div className="flex justify-end items-end mt-5">
                <button
                  type="button"
                  onClick={savePin}
                  className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
                >
                  Сақтау
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
