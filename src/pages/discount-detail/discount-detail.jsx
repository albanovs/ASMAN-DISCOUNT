import React, { useEffect, useState } from "react";
import "./discount-detail.css";
import arrow from "../../views/coins/arrow-left.svg";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../Api";

const DiscountDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/discount/detail/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="discount_detail">
      <div className="head">
        <img onClick={() => navigate(-1)} src={arrow} alt="" />
        <p>{data.title}</p>
      </div>
      <img className="image" src={data.img} alt="" />
      <p className="text_discount">{data.description}</p>
      <button onClick={() => navigate("/qr-scanner")} className="btn">
        Использовать коин
      </button>
    </div>
  );
};

export default DiscountDetail;
