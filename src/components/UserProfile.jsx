import React, { useState, useContext } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Alert } from "antd";

import Spinner from "./Spinner";
import { Context } from "../index";
import { useEffect } from "react";

const UserProfile = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  const [formData, setFormData] = useState({
    username: userInfo.username,
    firstName: userInfo.first_name,
    lastName: userInfo.last_name,
    surname: userInfo.surname,
    email: userInfo.email,
    nameResidentialComplex: userInfo.nameResidentialComplex,
    entrance: userInfo.entrance,
    floor: userInfo.floor,
    roomNumber: userInfo.roomNumber,
  });

  const [error, setError] = useState({
    bool: false,
    message: "",
  });

  const [success, setSuccess] = useState({
    bool: false,
    message: "",
  });

  const [imageAsset, setImageAsset] = useState({
    url: null,
    file: null
  });
  const [wrongImageType, setWrongImageType] = useState(false);
  const [loading, setLoading] = useState(false);


  const uploadImage = (e) => {
    const { type } = e?.target?.files[0];
    let data = new FormData();

    if(type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/gif' || type === 'image/tiff') {
      setWrongImageType(false);
      setLoading(true);
      setImageAsset(() => {
        return {file: e.target.files[0], url: URL.createObjectURL(e.target.files[0])}
      })

      data.append('photo', e.target.files[0], e.target.files[0].name)
      store.ChangePhoto(data)
        .then(() => {
          store.getUserActualData()
            .then(() => window.location.reload())
        })
      
      setLoading(false);

      } else {
        setWrongImageType(true);
    }
  }


  const logout = () => {
    localStorage.clear();

    navigate("/login");
    window.location.reload();
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    store.updateUser(formData).then((result) => {
      if (result?.error) {
        const error = result?.error?.response;
        switch (error.status) {
          case 400:
            setError({
              bool: true,
              message: `${error.data?.email && error.data?.email + "\r\n"}${
                error.data?.username && error.data?.username
              }`,
            });
            setTimeout(() => setError(false), 5000);
            break;
          default:
            setError({ bool: true, message: error?.detail });
            setTimeout(() => setError(false), 5000);
            break;
        }
      } else {
        setSuccess({ bool: true, message: "Сәтті өзгертілді!" });
        setTimeout(() => setSuccess(false), 5000);
      }
    });
  };

  if (!userInfo) return <Spinner message="Loading profile" />;


  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            {/* <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={"https://diploms.pythonanywhere.com" + userInfo.photo}
              alt="user-pic"
            /> */}
            <div className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover">
            {loading && <Spinner />}
            {wrongImageType && <p>Дұрыс сурет жүктеніз</p>}
            {!imageAsset.file ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                  </div>
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
                <img src={imageAsset?.url} alt="uploaded-pic" className="rounded-full object-cover h-full w-full" />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 p-1 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
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
          <h1 className="font-bold text-3xl text-center mt-3">
            {userInfo.username}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            <button
              type="button"
              className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
              onClick={logout}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        </div>
        {error.bool && (
            <Alert
              message="Ошибка"
              description={error.message}
              type="error"
              showIcon
              className="z-10 text-center absolute h-16 -bottom-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          )}
          {success.bool && (
            <Alert
              message={success.message}
              className="z-10 text-center absolute h-16 -bottom-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              type="success"
              showIcon
            />
          )}
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={(e) => onSubmit(e)}
          >
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Логин
              </label>
              <input
                onChange={onChange}
                id="username"
                type="text"
                name="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="mrRobot"
                value={formData.username}
                required
              />
            </div>
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Аты
              </label>
              <input
                onChange={onChange}
                id="firstName"
                type="text"
                name="firstName"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Имя"
                value={formData.firstName}
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Тегі
              </label>
              <input
                onChange={onChange}
                id="lastName"
                type="text"
                name="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Фамилия"
                value={formData.lastName}
                required
              />
            </div>
            <div>
              <label
                htmlFor="surname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Әкесінің аты
              </label>
              <input
                onChange={onChange}
                id="surname"
                type="text"
                name="surname"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Отчество"
                value={formData.surname}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Почта
              </label>
              <input
                onChange={onChange}
                id="email"
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                value={formData.email}
                required
              />
            </div>
            <div>
              <label
                htmlFor="nameResidentialComplex"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ЖК
              </label>
              <input
                onChange={onChange}
                id="nameResidentialComplex"
                type="text"
                name="nameResidentialComplex"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ЖК"
                value={formData.nameResidentialComplex}
                required
              />
            </div>
            <div>
              <label
                htmlFor="entrance"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Подьезд
              </label>
              <input
                onChange={onChange}
                id="entrance"
                type="number"
                name="entrance"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Подьезд"
                value={formData.entrance}
                required
                min="0"
              />
            </div>
            <div>
              <label
                htmlFor="floor"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Қабат
              </label>
              <input
                onChange={onChange}
                id="floor"
                type="number"
                name="floor"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Этаж"
                value={formData.floor}
                required
                min="0"
              />
            </div>
            <div>
              <label
                htmlFor="roomNumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Пәтер нөмірі
              </label>
              <input
                onChange={onChange}
                id="roomNumber"
                type="number"
                name="roomNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Номер квартиры"
                value={formData.roomNumber}
                required
                min="0"
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Өзгерту
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
