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
import { changeData, changeId, changeName } from "../../App/slice/category";

export default function Market() {
  const [cate, setCate] = useState({
    active: [],
    data: [],
    category: [],
  });
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const { tab } = useSelector((state) => state.tab);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pricefrom, priceto, city, sort } = useSelector(
    (state) => state.filter
  );
  const [render, setRender] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get(
        `/market/cat-list/?pricefrom=${pricefrom}${
          priceto !== 0 ? `&priceto=${priceto}` : ""
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
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log("/market/cat-list/:", error);
        setLoading(false);
      });
  }, [render]);

  const SearchFilterCate = useMemo(() => {
    if (cate?.category?.ads) {
      return cate.category.ads.filter((obj) => {
        const fullName = obj.title.toLowerCase();
        return fullName.includes(value.toLowerCase());
      });
    } else {
      return [];
    }
  }, [cate?.category, value]);

  const SearchFilter = useMemo(() => {
    if (cate?.data) {
      return cate.data.filter((obj) => {
        return obj.ads.some((adding) => {
          const fullName = adding.title.toLowerCase();
          return fullName.includes(value.toLowerCase());
        });
      });
    } else {
      return [];
    }
  }, [cate?.data, value]);

  useEffect(() => {
    if (cate.data.length > 0) {
      setCate({
        ...cate,
        active: "all",
      });
    }
  }, [cate.data]);

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
              {cate?.data?.map((el, index) => (
                <div
                  onClick={() => setCate({ ...cate, category: el, active: el })}
                  key={index}
                  className={`cate ${el.name === cate.active.name && "active"}`}
                >
                  <img className="img" src={el.icon} alt="" />
                  <p>{el.name}</p>
                </div>
              ))}
            </div>
          </div>
          {cate.data.length > 0 ? (
            <div className="market_list">
              {cate?.category.name ? (
                <div className="line_boxs">
                  <h2
                    onClick={() => {
                      navigate("/category-market/false");
                      dispatch(changeName(cate.category.name));
                      dispatch(changeId(cate.category.id));
                      dispatch(changeData(cate.category.ads));
                    }}
                  >
                    {cate?.category.name}
                    <MdOutlineArrowForwardIos className="icone" />
                  </h2>
                  <div className="ovar_boxs">
                    {SearchFilterCate.map((el, index) => (
                      <div className="box_markets">
                        <Card
                          el={el}
                          index={index}
                          render={render}
                          setRender={setRender}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                SearchFilter.map((item, index) => (
                  <div key={index} className="line_boxs">
                    <h2
                      onClick={() => {
                        navigate("/category-market/false");
                        dispatch(changeName(item.name));
                        dispatch(changeId(item.id));
                        dispatch(changeData(item.ads));
                      }}
                    >
                      {item.name} <MdOutlineArrowForwardIos className="icone" />
                    </h2>
                    <div className="ovar_boxs">
                      {item.ads
                        .filter((obj) => {
                          const fullName = obj.title.toLowerCase();
                          return fullName.includes(value.toLowerCase());
                        })
                        .map((el, index) => (
                          <div className="box_markets">
                            <Card
                              el={el}
                              index={index}
                              render={render}
                              setRender={setRender}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div style={{ textAlign: " center" }}>
              Скоро появится товары !!!
            </div>
          )}
        </>
      )}
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
