import React, { useEffect, useState } from "react";
import "./discount-detail.css";
import arrow from "../../views/coins/arrow-left.svg";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../Api";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";

const DiscountDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get(`/discount/detail/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loading]);

  return (
    <div className="discount_detail">
      <div className="head">
        <img onClick={() => navigate(-1)} src={arrow} alt="" />
        <p>{data.title}</p>
      </div>
      {data.img ? <img className="image" src={data.img} alt="" /> : <Skeleton className="image" />}
      <div className="text_discount">
        {data.title ? React.createElement("p", {
          dangerouslySetInnerHTML: {
            __html: data.description,
          },
        }) : <div>
          <Skeleton width={400} height={5} count={8} />
        </div>}
      </div>
      <p
        style={{
          margin: "20px 0",
          textAlign: "center",
          fontSize: 16,
          color: "rgb(0, 255, 0)",
        }}
      >
        Скидка на {data.discount} %
      </p>
      <button
        onClick={() => navigate('/qr-scanner')}
        className="btn"
      >
        Отсканировать QR
      </button>
    </div>
  );
};

export default DiscountDetail;
