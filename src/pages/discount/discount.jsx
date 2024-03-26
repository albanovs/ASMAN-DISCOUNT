import React, { useEffect, useState } from "react";
import "./discount.css";
import Header from "../../containers/header/header";
import { api } from "../../Api";
import { useNavigate } from "react-router-dom";
import cate1 from "../../views/disc/one.svg";
import cate2 from "../../views/disc/two.svg";
import cate3 from "../../views/disc/three.svg";
import cate4 from "../../views/disc/four.svg";
import cate5 from "../../views/disc/five.svg";
import { useSelector } from "react-redux";

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
            Нажмите на статус, чтобы узнать, на какие фитнес-центры или
            рестораны есть скидки.
          </p>
        </div>
        <div className="cateing">
          <div
            onClick={() => setCate("Стандарт")}
            className={`cate ${cate === "Стандарт" && "active"}`}
          >
            <img src={cate1} alt="" />
          </div>
          <div
            onClick={() => setCate("Бронза")}
            className={`cate ${cate === "Бронза" && "active"}`}
          >
            <img src={cate2} alt="" />
          </div>
          <div
            onClick={() => setCate("Серебро")}
            className={`cate ${cate === "Серебро" && "active"}`}
          >
            <img src={cate3} alt="" />
          </div>
          <div
            onClick={() => setCate("Золото")}
            className={`cate ${cate === "Золото" && "active"}`}
          >
            <img src={cate4} alt="" />
          </div>
          <div
            onClick={() => setCate("VIP")}
            className={`cate ${cate === "VIP" && "active"}`}
          >
            <img src={cate5} alt="" />
          </div>
        </div>
        {loading ? (
          <>
            <div>
              <h2>
                <div className="block_h2"></div>
              </h2>
              <div className="discount_block">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="discount_box_skeleton"></div>
                ))}
              </div>
            </div>
            <div>
              <h2>
                <div className="block_h2"></div>
              </h2>
              <div className="discount_block">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="discount_box_skeleton"></div>
                ))}
              </div>
            </div>
          </>
        ) : (
          data.map((el, key) => (
            <div key={key}>
              <h2>{el.name}:</h2>
              <div className="discount_block">
                {el.partners.map((item) => (
                  <div>
                    <div
                      onClick={() => navigate(`/discount-detail/${item.id}`)}
                      className="discount_box"
                    >
                      <img src={item.img} alt="" />
                    </div>
                    <p className="text_discount">{item.title}</p>
                    {cate === "Стандарт" ? (
                      <p className="absolute">
                        {" "}
                        Скидка на {item.d_standard} %{" "}
                      </p>
                    ) : (
                      ""
                    )}
                    {cate === "Бронза" ? (
                      <p className="absolute"> Скидка на {item.d_bronze} % </p>
                    ) : (
                      ""
                    )}
                    {cate === "Серебро" ? (
                      <p className="absolute"> Скидка на {item.d_silver} % </p>
                    ) : (
                      ""
                    )}
                    {cate === "Золото" ? (
                      <p className="absolute"> Скидка на {item.d_gold} % </p>
                    ) : (
                      ""
                    )}
                    {cate === "VIP" ? (
                      <p className="absolute"> Скидка на {item.d_vip} % </p>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
