import { React, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import Login from './components/Login';
import Register from './components/Register';
import Home from './container/Home';



function App() {
  const {store} = useContext(Context);
  const test = [
    {
        "id": 8,
        "categoryName": "Экономика",
        "discription": "econimics",
        "created_at": "08.02.2023 12:48"
    },
    {
        "id": 7,
        "categoryName": "Оқиға",
        "discription": "event",
        "created_at": "08.02.2023 12:48"
    }
  ]

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      store.checkAuth()
    }

    store.GetAllCategory()
      .then(({ data }) => localStorage.setItem('category', JSON.stringify(data)))
      .catch(() => localStorage.setItem('category', JSON.stringify(test)))
  }, [])
  

  return (
    <Routes>
      <Route path='login' element={<Login />}/>
      <Route path='/' element={<Register />}/>
      <Route path='home/*' element={<Home />} />
    </Routes>
  );
}



export default observer(App);
