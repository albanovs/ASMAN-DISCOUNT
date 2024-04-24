import React, { useEffect, useMemo, useState } from "react";
import "./market.css";
import search from "../../views/market/search.svg";
import filter from "../../views/market/filter.svg";
import { api } from "../../Api";
import { BiCategory } from "react-icons/bi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import Card from "./components/card";
import LoadingAnimate from "../../UI-kit/loading";
import banner from "../../views/market/banner.jpg";
import { IoIosCreate } from "react-icons/io";
import { GoHeartFill } from "react-icons/go";
import { ImYelp } from "react-icons/im";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../../App/slice/tab";
import axios from "axios";
import { changeData, changeId, changeName } from "../../App/slice/category";

export default function Market() {
  const [cate, setCate] = useState({
    active: [],
    data: [],
    category: [],
    result: [],
    nextPage: null
  });
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const { tab } = useSelector((state) => state.tab);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pricefrom, priceto, city, sort } = useSelector(
    (state) => state.filter
  );

  const nextloadData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(cate.nextPage, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      console.log(response);

      if (Array.isArray(response.data.results)) {
        setCate((prevState) => ({
          ...prevState,
          nextPage: response.data.next,
          data: response.data,
          result: prevState.result.concat(response.data.results),
        }));
      } else {
        console.log("Ошибка: response.data.results не является массивом.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get(
        `/market/ad-list/?pricefrom=${pricefrom}${priceto !== 0 ? `&priceto=${priceto}` : ""
        }${city && `&city=${city}`}${sort && `&ordering=${sort}`}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        setCate({
          ...cate,
          data: response.data,
          result: response.data.results,
          nextPage: response.data.next
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log("/market/cat-list/:", error);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <div className="loading_div">
      <LoadingAnimate />
    </div>
  ) : (
    <>
      <div className="market">
        <div className="market_banner_main">
          <img src={banner} alt="" />
        </div>
        <div className="search_block">
          <div className="relative_input">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="search"
              type="text"
              placeholder="Search..."
            />
            <img className="icon absolute" src={search} alt="" />
          </div>
          <div onClick={() => navigate("/filter-market")} className="filter">
            <img className="icon" src={filter} alt="" />
          </div>
        </div>
        <div className="tabs">
          <div
            onClick={() => {
              dispatch(changeTab());
            }}
            className={`tab first ${tab === true && "active"}`}
          >
            Магазины
          </div>
          <div
            onClick={() => {
              dispatch(changeTab());
            }}
            className={`tab end ${tab === false && "active"}`}
          >
            Обьявления
          </div>
        </div>
      </div>
      {tab === true && (
        <>
          <div className="market_over">
            <div className="category">
              <div
                onClick={() =>
                  setCate({ ...cate, active: "all", category: [] })
                }
                className={`cate ${"all" === cate.active && "active"}`}
              >
                <BiCategory className="img" />
                <p>Все</p>
              </div>

            </div>
          </div>
        </>
      )}
      {
        tab === true && <div className="all_category_items">
          {
            Array.isArray(cate.result) && cate.result.map(item => {
              return (
                <div>
                  <Card el={item} />
                </div>
              )
            })
          }
        </div>
      }
      {tab === false && (
        <div className="marketing">
          <div onClick={() => navigate("/ads-post")} className="btns">
            <div className="flex">
              <IoIosCreate className="icon" />
              <p>Создать обьявления</p>
            </div>
            <MdArrowForwardIos size={22} />
          </div>
          <div onClick={() => navigate("/favorite-market")} className="btns">
            <div className="flex">
              <GoHeartFill className="icon" />
              <p>Любимые</p>
            </div>
            <MdArrowForwardIos size={22} />
          </div>
          <div onClick={() => navigate("/my-posts")} className="btns">
            <div className="flex">
              <ImYelp className="icon" />
              <p>Мои обьявления</p>
            </div>
            <MdArrowForwardIos size={22} />
          </div>
        </div>
      )}
      <div style={{ width: "100%", height: 100 }}></div>
    </>
  );
}
