import React, { useState } from "react";
import "./card.css";
import Slider from "react-slick";
import { FiShoppingCart } from "react-icons/fi";
import heart from "../../../views/market/heart.svg";
import heart_red from "../../../views/market/heart_red.svg";
import { useNavigate } from "react-router-dom";

const Card = ({ index, el }) => {
  const [love, setLove] = useState(false);
  const navigate = useNavigate();

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      onClick={() => navigate(`/market-detail/${el.id}`)}
      key={index}
      className="box"
    >
      <img
        className="love"
        onClick={(e) => {
          e.stopPropagation(); 
          setLove(!love);
        }}
        src={love ? heart_red : heart}
        alt=""
      />
      <div className="max">
        <Slider {...settings} className="box_slide">
          {el.images.map((elem, id) => (
            <div key={id}>
              <img src={elem.img} alt="" />
            </div>
          ))}
        </Slider>
      </div>
      <div className="contant">
        <h3>{el.title}</h3>
        <div className="flex">
          <p className="price">
            {el.price} {el.currency ? el.currency : "c"}
          </p>
          <div className="cart">
            <FiShoppingCart className="icond" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
