import React, { useEffect, useState } from "react";
import "./discount.css";
import Header from "../../containers/header/header";
import { api } from "../../Api";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

export default function Discount() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/discount/list")
      .then((response) => {
        setData(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="discount">
      <Header />
      <div className="container_2">
        <h1 className="title">Скидки</h1>
        {loading ? (
          <>
            <div>
              <h2>
                <div className="block_h2">
                  <Skeleton width="100%" height={18} borderRadius={10} />
                </div>
              </h2>
              <div className="discount_block">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="discount_box_skeleton"></div>
                ))}
              </div>
            </div>
            <div>
              <h2>
                <div className="block_h2">
                  <Skeleton width="100%" height={18} borderRadius={10} />
                </div>
              </h2>
              <div className="discount_block">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="discount_box_skeleton"></div>
                ))}
              </div>
            </div>
          </>
        ) : (
          data.map((el) => (
            <div>
              <h2>{el.name}:</h2>
              <div className="discount_block">
                {el.partners.map((item) => (
                  <div
                    onClick={() => navigate(`/discount-detail/${item.id}`)}
                    className="discount_box"
                  >
                    <img src={item.img} alt="" />
                    <p className="text_discount">{item.title}</p>
                    <div className="box_fixet"></div>
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
