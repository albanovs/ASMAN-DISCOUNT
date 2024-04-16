import React, { useEffect, useState } from "react";
import "./discount-detail.css";
import arrow from "../../views/coins/arrow-left.svg";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../Api";
import "react-toastify/dist/ReactToastify.css";
import LoadingAnimate from "../../UI-kit/loading";
import SuccessAlert from "../../UI-kit/success";
import Skeleton from "react-loading-skeleton";

const DiscountBuy = () => {
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

  const setCoin = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "payment/scanner/?type=2",
        {
          partner: id,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setLoading(false);
      navigate("/payments");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="discount_detail">
      <div className="head">
        <img onClick={() => navigate(-1)} src={arrow} alt="" />
        <p>{data.title}</p>
      </div>
      {data.img ? (
        <img className="image" src={data.img} alt="" />
      ) : (
        <Skeleton className="image" />
      )}
      <div className="text_discount">
        {data.title ? (
          React.createElement("p", {
            dangerouslySetInnerHTML: {
              __html: data.description,
            },
          })
        ) : (
          <div>
            <Skeleton width={400} height={5} count={8} />
          </div>
        )}
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
      <SuccessAlert theme="colored" />
      <button
        disabled={loading}
        style={{ background: loading ? "#bba97a" : "#fdb602" }}
        onClick={() => {
          data.minutes === true && setCoin();
        }}
        className="btn"
      >
        {loading ? <LoadingAnimate /> : "Использовать коин"}
      </button>
    </div>
  );
};

export default DiscountBuy;
