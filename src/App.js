import { React, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./container/Home";
import { Helmet } from "react-helmet";

function App() {
  const { store } = useContext(Context);
  const test = [
    {
      id: 8,
      categoryName: "Экономика",
      discription: "econimics",
      created_at: "08.02.2023 12:48",
    },
    {
      id: 7,
      categoryName: "Оқиға",
      discription: "event",
      created_at: "08.02.2023 12:48",
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      store.checkAuth();
    }

    store
      .GetAllCategory()
      .then(({ data }) =>
        localStorage.setItem("category", JSON.stringify(data))
      )
      .catch(() => localStorage.setItem("category", JSON.stringify(test)));
  }, []);

  return (
    <>
      <Helmet>
        <script>
          {`
        (function() {
          var widget_id = 'Y34eURvPvf';
          var d=document;
          var w=window;
          function l(){
            var s=document.createElement('script');
            s.type='text/javascript';
            s.async=true;
            s.src='https://code.jivosite.com/script/widget/'+widget_id;
            var ss=document.getElementsByTagName('script')[0];
            ss.parentNode.insertBefore(s,ss);}
          if(d.readyState=='complete'){l();}
          else{if(w.attachEvent){w.attachEvent('onload',l);}
          else{w.addEventListener('load',l,false);}}})();
      `}
        </script>
      </Helmet>

      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="home/*" element={<Home />} />
      </Routes>
    </>
  );
}

export default observer(App);
