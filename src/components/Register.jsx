import { React, useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "antd";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import Spinner from "./Spinner";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const Register = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    surname: "",
    email: "",
    password: "",
    nameResidentialComplex: "",
    entrance: 0,
    floor: 0,
    roomNumber: 0,
  });

  const [wrongImageType, setWrongImageType] = useState(false);

  const [passwordError, setPasswordError] = useState(false);

  const [imageAsset, setImageAsset] = useState({
    url: null,
    file: null,
  });

  const uploadImage = (e) => {
    const { type } = e.target.files[0];

    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);
      setImageAsset(() => {
        return {
          file: e.target.files[0],
          url: URL.createObjectURL(e.target.files[0]),
        };
      });
      setLoading(false);
    } else {
      setWrongImageType(true);
    }
  };

  const [error, setError] = useState({
    bool: false,
    message: "",
  });

  const {
    username,
    firstName,
    lastName,
    surname,
    email,
    password,
    nameResidentialComplex,
    entrance,
    floor,
    roomNumber,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!imageAsset.file) {
      setWrongImageType(true);
      return;
    }

    if (password.length >= 8){
      setPasswordError(false);
      setWrongImageType(false);
      if (
        username &&
        firstName &&
        lastName &&
        surname &&
        email &&
        password &&
        nameResidentialComplex &&
        imageAsset.url
      ) {
        let data = new FormData();
        data.append("username", username);
        data.append("first_name", firstName);
        data.append("last_name", lastName);
        data.append("surname", surname);
        data.append("email", email);
        data.append("password", password);
        data.append("nameResidentialComplex", nameResidentialComplex);
        data.append("entrance", entrance);
        data.append("floor", floor);
        data.append("roomNumber", roomNumber);
        data.append("photo", imageAsset.file, imageAsset.file.name);
  
        store.registration(data).then((result) => {
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
            navigate("/home", { replace: true });
          }
        });
      }
    } else {
      setPasswordError(true);
      return;
    }
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="overflow-y-hidden flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            {error.bool && (
              <Alert
                message="Ошибка"
                description={error.message}
                type="error"
                showIcon
                className="absolute"
              />
            )}
            <img className="mb-6" src={logo} width="130px" alt="logo" />
            <div className="overflow-y-auto h-1/2 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Аккаунт құру
                </h1>

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
                      value={username}
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
                      value={firstName}
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
                      value={lastName}
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
                      value={surname}
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
                      value={email}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Құпия сөз
                    </label>
                    <input
                      onChange={onChange}
                      id="password"
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={password}
                      required
                    />
                    {passwordError && (
                      <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        Құпия сөз кем дегенде 8 символдан тұру қажет
                      </p>
                    )}
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
                      value={nameResidentialComplex}
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
                      value={entrance}
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
                      value={floor}
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
                      value={roomNumber}
                      required
                      min="0"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Аккаунт құру
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Аккаунт бар?{" "}
                    <Link
                      to="login"
                      className="text-blue-400 font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Кіру
                    </Link>
                  </p>
                </form>

                <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-120">
                  {loading && <Spinner />}
                  {wrongImageType && <p className="bg-red-100 border-red-400 text-red-700 px-4 py-3 relative">Дұрыс сурет жүктеніз</p>}
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
                          20 МБ-тан аз, жоғары сапалы JPG, SVG, PNG, GIF
                          пайдаланыңыз
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
                      <img
                        src={imageAsset?.url}
                        alt="uploaded-pic"
                        className="object-cover h-full w-full"
                      />
                      <button
                        type="button"
                        className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                        onClick={() =>
                          setImageAsset({
                            file: null,
                            url: null,
                          })
                        }
                      >
                        <MdDelete />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Register);
