/* eslint-disable react-hooks/exhaustive-deps */
import {  useState } from "react";

export default () => {
  const [datas, setDatas] = useState([]);

  function getApi(url) {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/${url}`)
      .then((res) => res.json())
      .then((data) => setDatas(data?.data))
      .catch((err) => console.log(err));
      return datas
  }
  return {
    getApi,
    datas,
  };
};
