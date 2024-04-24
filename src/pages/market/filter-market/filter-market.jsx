import React, { useEffect, useState } from "react";
import "./filter-market.css";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slider";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCity,
  changePricefrom,
  changePriceto,
  changeSort,
} from "../../../App/slice/filter";

const MIN = 0;
const MAX = 9999;

const cities = [
  { city: "--" },
  { city: "Бишкек" },
  { city: "Нурсултан" },
  { city: "Москва" },
  { city: "Алматы" },
  { city: "Астана" },
  { city: "Ташкент" },
  { city: "Баку" },
  { city: "Душанбе" },
  { city: "Тбилиси" },
  { city: "Ереван" },
  { city: "Киев" },
  { city: "Минск" },
  { city: "Кишинёв" },
  { city: "Рига" },
  { city: "Вильнюс" },
];

const sorts = [
  {
    name: "Самые новые",
    code: "newest",
  },
  {
    name: "Самые старые",
    code: "oldest",
  },
  {
    name: "Самые дешевые",
    code: "cheapest",
  },
  {
    name: "Самые дорогие",
    code: "expensive",
  },
];

const FilterMarket = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const [requests, setRequests] = useState({
    budget: [0, 0],
  });
  const dispatch = useDispatch();
  const { pricefrom, priceto, city, sort } = useSelector(
    (state) => state.filter
  );

  useEffect(() => {
    setRequests({ ...requests, budget: [pricefrom, priceto] });
  }, []);

  useEffect(() => {
    dispatch(changePricefrom(requests.budget[0]));
    dispatch(changePriceto(requests.budget[1]));
  }, [requests]);

  function empty() {
    setRequests({ ...requests, budget: [0, 0] });
    dispatch(changePricefrom(""));
    dispatch(changePriceto(""));
    dispatch(changeCity(""));
    dispatch(changeSort(""));
  }

  return (
    <div className="filter_market">
      <div className="head_market">
        <MdOutlineArrowBackIosNew
          onClick={() => {
            if (page === "cate") {
              navigate("/category-market/true");
            } else {
              navigate(-1);
            }
          }}
          color="var(--black)"
          size={24}
        />
        <h1>Фильтр и сортировка</h1>
      </div>
      <div className="filter_body">
        <div className="ranges">
          <h3>Ценовой диапазон</h3>
          <div className="values-container">
            <div className="value_div">
              <span>$ </span>
              {requests.budget[0] === 0 ? "-" : requests.budget[0]}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              -
            </div>
            <div className="value_div">
              <span>$ </span>
              {requests.budget[1] === 0 ? "-" : requests.budget[1]}
            </div>
          </div>
          <div className="range-container">
            <Slider
              className="slider"
              onChange={(newBudget) => {
                setRequests({ ...requests, budget: newBudget });
              }}
              value={requests.budget}
              min={MIN}
              max={MAX}
            />
          </div>
        </div>
        <div className="input_box_air">
          <h3>Город</h3>
          <select
            className="select_market"
            value={city}
            onChange={(e) => dispatch(changeCity(e.target.value))}
            type="text"
            placeholder="Страна выдачи"
            name="citizen"
          >
            {cities.map((item) => (
              <option key={item.city} value={item.city}>
                {item.city}
              </option>
            ))}
          </select>
        </div>
        <div className="sort">
          <h3>Сортировка</h3>
          <div className="sort_block">
            {sorts.map((el, index) => (
              <div
                onClick={() => dispatch(changeSort(el.code))}
                key={index}
                className="sort_box"
              >
                <div className="toggle">
                  {sort === el.code && <div className="true"></div>}
                </div>
                <p> {el.name} </p>
              </div>
            ))}
          </div>
        </div>
        <div className="btns">
          <button
            onClick={() => {
              if (page === "cate") {
                navigate("/category-market/true");
              } else {
                navigate(-1);
              }
            }}
            className="button_form"
          >
            Применить
          </button>
          <button onClick={empty} className="button_form empty">
            Сбросить
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterMarket;
