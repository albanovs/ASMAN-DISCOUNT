import React, { useEffect, useState } from "react";
import "./discount-detail.css";
import arrow from "../../views/coins/arrow-left.svg";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../Api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingAnimate from "../../UI-kit/loading";
import SuccessAlert from "../../UI-kit/success";

const DiscountDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const notify = () => toast.success('Вы успешно проибрели скидку!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

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

  const setCoin = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      await api.post('/payment/scanner/?type=2', {
        partner: id
      }, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      notify()
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="discount_detail">
      <div className="head">
        <img onClick={() => navigate(-1)} src={arrow} alt="" />
        <p>{data.title}</p>
      </div>
      <img className="image" src={data.img} alt="" />
      <p className="text_discount">{data.description}</p>
      <SuccessAlert theme="colored" />
      <button disabled={loading} style={{ background: loading ? '#bba97a' : "#fdb602" }} onClick={() => setCoin()} className="btn">
        {loading ? <LoadingAnimate /> : 'Использовать коин'}
      </button>
    </div>
  );
};

export default DiscountDetail;