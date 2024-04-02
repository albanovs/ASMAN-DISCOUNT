import React, { useEffect, useState } from "react";
import "./discount.css";
import Header from "../../containers/header/header";
import { api } from "../../Api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import cate1 from "../../views/disc/one.svg";
import cate2 from "../../views/disc/two.svg";
import cate3 from "../../views/disc/three.svg";
import cate4 from "../../views/disc/four.svg";
import cate5 from "../../views/disc/five.svg";
import SkeletonDiscount from "./Skeleton";

const categoryImages = [cate1, cate2, cate3, cate4, cate5];

export default function Discount() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const names = useSelector((state) => state.user_info.user_info);
  const [cate, setCate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (names) {
      setCate(names.status);
    }
  }, [names]);

  useEffect(() => {
    api
      .get("/discount/list/")
      .then((response) => {
        setData(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 300);
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
  }, []);

  return (
    <div className="discount">
      <Header />
      <div className="container_2">
        <div>
          <h1 className="title">Скидки</h1>
          <p className="text_dis">
            Нажмите на статус, чтобы узнать, какие привилегии есть у выбранного статуса
          </p>
        </div>
        <div className="cateing">
          {["Стандарт", "Бронза", "Серебро", "Золото", "VIP"].map((category, index) => (
            <div
              key={index}
              onClick={() => setCate(category)}
              className={`cate ${cate === category && "active"}`}
            >
              <img src={categoryImages[index]} alt="" />
              <h1>{category}</h1>
            </div>
          ))}
        </div>
        {!loading ? (data.map((el, key) => (
          <div key={key}>
            <h2>{el.name}</h2>
            <div className="discount_block">
              {el.partners.map((item, idx) => (
                <div key={idx}>
                  <div
                    onClick={() => navigate(`/discount-detail/${item.id}`)}
                    className="discount_box"
                  >
                    <img src={item.img} alt="" />
                  </div>
                  <p className="text_discount">{item.title}</p>
                  {cate === "Стандарт" && <p className="absolute">{item.d_standard} % скидки</p>}
                  {cate === "Бронза" && <p className="absolute">{item.d_bronze} % скидки</p>}
                  {cate === "Серебро" && <p className="absolute">{item.d_silver} % скидки</p>}
                  {cate === "Золото" && <p className="absolute">{item.d_gold} % скидки</p>}
                  {cate === "VIP" && <p className="absolute">{item.d_vip} % скидки</p>}
                </div>
              ))}
            </div>
          </div>
        ))
        ) : <SkeletonDiscount />}
      </div>
    </div>
  );
}