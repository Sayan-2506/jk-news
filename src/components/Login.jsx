import { React, useContext, useState } from "react";
import { observer } from 'mobx-react-lite';
import { useNavigate, Link } from "react-router-dom";
import { Alert } from 'antd';
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { Context } from "../index";


const Login = () => {
  const {store} = useContext(Context);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    bool: false,
    message: ''
  });

  const {
    username,
    password
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
      const newUser = {
        username,
        password
      };

      store.login({...newUser})
        .then((result) => {
          if (result?.error) {
            const error = result?.error?.response
            switch (error.status) {
              case 401:
                setError({bool: true, message: 'Барлық жолды тексерініз!'})
                setTimeout(() => setError(false), 5000)
                break;
              default:
                setError({bool: true, message: error?.detail})
                setTimeout(() => setError(false), 5000)
                break;
            }
          } else {
            navigate('/home', { replace: true })
          }
        })
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
          {error.bool && <Alert
            message='Қате'
            description={error.message}
            type="error"
            showIcon
            className="absolute"
            />}
            <img className="mb-6" src={logo} width="130px" alt="logo" />
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Кіру
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
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Кіру
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Аккаунт жоқ{"? "}
                    <Link
                      to="/"
                      className="text-blue-400 font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Аккаунт құру
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Login);
