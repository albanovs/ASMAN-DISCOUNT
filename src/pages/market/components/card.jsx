import React, { useEffect, useState } from "react";
import "./card.css";
import heart from "../../../views/market/heart.svg";
import heart_red from "../../../views/market/heart_red.svg";
import { useNavigate } from "react-router-dom";
import { api } from "../../../Api";

const Card = ({ render, setRender, index, el }) => {
  const [love, setLove] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (el.isfavorite) {
      setLove(el.isfavorite);
    }
  }, [el.isfavorite]);

  const sendFavoriteId = (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    setLove(!love);
    if (setRender) {
      setRender(!render);
    }
    api
      .post(
        `/market/favourite/${el.id}/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!el) {
    return <div className="skeleton"></div>;
  }

  return (
    <div
      onClick={() => navigate(`/market-detail/${el.id}`)}
      key={index}
      className="card_box"
    >
      <img
        className="love"
        onClick={sendFavoriteId}
        src={love ? heart_red : heart}
        alt=""
      />
      <div className="max">
        <div className="max-widht-box">
          <img className="card_image" src={el.images[0]?.img} alt="" />
        </div>
      </div>
      <div className="contant">
        <h3>{el.title.split(' ').slice(0, 1).join(' ')}...</h3>
        <div className="flex">
          <p className="price">
            {el.price} {el.currency ? el.currency : "c"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
