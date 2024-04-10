import React, { useEffect, useState } from "react";
import "./discount-detail.css";
import arrow from "../../views/coins/arrow-left.svg";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { api } from "../../Api";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import { CountdownTimer } from "./timer";
import { useSelector } from "react-redux";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

const DiscountDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
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
  }, []);

  return (
    <div className="discount_detail">
      <div className="head">
        <img onClick={() => navigate('/discount')} src={arrow} alt="" />
      </div>
      {data.img ? <img className="image" src={data.img} alt="" /> : <Skeleton className="image" />}
      <div className="text_discount">
        <h1>{data.title}</h1>
        {data.title ? <p style={{ textAlign: 'justify' }}><span>Описание: </span>{data.description}</p> : <div>
          <Skeleton width={350} height={5} count={8} />
        </div>}
      </div>
      <div className="discount_sale">{datas_user.balance >= 100 ? `Скидка на ${data.discount} %` : 'Купите ASMAN чтобы пользоваться'}</div>
      <div className="details_partners">
        <h1>Данные заведений:</h1>
        <div className="details_partners_item"><span style={{ color: "#8f8f8f" }}>Телефон номер:</span> <NavLink to={`tel:${data.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}><FaPhoneAlt />{data.phone}</NavLink></div>
        <NavLink className="details_partners_item"><span style={{ color: "#8f8f8f" }}>Адрес:</span><span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}><FaMapMarkerAlt />{data.address}</span></NavLink>
      </div>
      {
        datas_user.balance <= 100 ? "" :
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