import React, { useEffect, useState } from "react";
import "./discount-detail.css";
import arrow from "../../views/coins/arrow-left.svg";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../Api";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import { CountdownTimer } from "./timer";
import { useSelector } from "react-redux";

const DiscountDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const datas_user = useSelector(state => state.user_info.user_info)
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
          <Skeleton width={350} height={5} count={8} />
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
      {
        datas_user.balance <= 0 ? <p style={{ color: 'white', textAlign: 'center' }}>Купите ASMAN чтобы пользоваться</p> :
          < button
            onClick={() => navigate('/qr-scanner')}
            className='btn'
            style={{ background: typeof data.minutes !== 'number' ? "#fdb602" : '#bba97a' }}
            disabled={typeof data.minutes === 'number'}>
            {typeof data.minutes !== 'number' ? "Отсканировать QR" : <CountdownTimer minutes={data.minutes} />}
          </button>
      }
    </div >
  );
};

export default DiscountDetail;