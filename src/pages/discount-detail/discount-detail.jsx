import React, { useEffect, useState } from "react";
import "./discount-detail.css";
import arrow from "../../views/coins/arrow-left.svg";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingAnimate from "../../UI-kit/loading";
import SuccessAlert from "../../UI-kit/success";

const DiscountDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const notify = () =>
    toast.success("Вы успешно приобрели скидку!", {
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

  const setCoin = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/payment/scanner/?type=2",
        {
          partner: id,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      notify();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const notCoin = (param) => {
    toast.warning(
      `Приходите через ${
        param.lendth > 1 ? param + " дней" : param + " день"
      } `,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );
  };

  return (
    <div className="discount_detail">
      <div className="head">
        <img onClick={() => navigate(-1)} src={arrow} alt="" />
        <p>{data.title}</p>
      </div>
      <img className="image" src={data.img} alt="" />
      <p className="text_discount">
        {React.createElement("p", {
          dangerouslySetInnerHTML: {
            __html: data.description,
          },
        })}
      </p>
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
      <SuccessAlert theme="colored" />
      <button
        disabled={loading}
        style={{ background: loading ? "#bba97a" : "#fdb602" }}
        onClick={() => (data.days === true ? setCoin() : notCoin(data.days))}
        className="btn"
      >
        {loading ? <LoadingAnimate /> : "Использовать коин"}
      </button>
    </div>
  );
};

export default DiscountDetail;
