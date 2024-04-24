import React, { useEffect, useState } from "react";
import "./discount.css";
import Header from "../../containers/header/header";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import cate1 from "../../views/disc/one.svg";
import cate2 from "../../views/disc/two.svg";
import cate3 from "../../views/disc/three.svg";
import cate4 from "../../views/disc/four.svg";
import cate5 from "../../views/disc/five.svg";
import SkeletonDiscount from "./Skeleton";
import { fetchdiscountData } from "../../App/slice/discount";
import { IoEyeSharp } from "react-icons/io5";

const categoryImages = [cate1, cate2, cate3, cate4, cate5];

export default function Discount() {
  const names = useSelector((state) => state.user_info.user_info);
  const data = useSelector(state => state.discount.discount)
  const [cate, setCate] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchdiscountData())
  }, [])

  useEffect(() => {
    if (names) {
      setCate(names.status);
    }
  }, [names]);

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
        {data.length ? (data.map((el, key) => (
          el.partners.length > 0 ? <div key={key}>
            <h2>{el.name}</h2>
            <div className="discount_block">
              {el.partners.map((item, idx) => (
                <div key={idx}>
                  <div
                    onClick={() => navigate(`/discount-detail/${item.id}`)}
                    className="discount_box"
                  >
                    <img src={`https://discount.asman.io${item.img}`} alt="" />
                  </div>
                  <p className="text_discount">{item.title}</p>
                  {cate === "Стандарт" && <p className="absolute">{item.d_standard} % скидки</p>}
                  {cate === "Бронза" && <p className="absolute">{item.d_bronze} % скидки</p>}
                  {cate === "Серебро" && <p className="absolute">{item.d_silver} % скидки</p>}
                  {cate === "Золото" && <p className="absolute">{item.d_gold} % скидки</p>}
                  {cate === "VIP" && <p className="absolute">{item.d_vip} % скидки</p>}
                  <h2 className="cost_of_visit">{item.cost_of_visit} asman</h2>
                  <h5><IoEyeSharp /> <span> {item.views}</span></h5>
                </div>
              ))}
            </div>
          </div> : ""
        ))
        ) : <SkeletonDiscount />}
      </div>
    </div>
  );
}
