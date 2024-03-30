import React, { useEffect, useMemo, useState } from "react";
import "./market.css";
import search from "../../views/market/search.svg";
import filter from "../../views/market/filter.svg";
import { api } from "../../Api";
import AdsPost from "./components/ads-post/ads-post";
import { BiCategory } from "react-icons/bi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import Card from "./components/card";

export default function Market() {
  const [tab, setTab] = useState({
    tab1: true,
    tab2: false,
  });
  const [cate, setCate] = useState({
    active: [],
    data: [],
    category: [],
  });
  const [value, setValue] = useState("");

  useEffect(() => {
    api
      .get("/market/cat-list/")
      .then((response) => {
        setCate({
          ...cate,
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("/market/cat-list/:", error);
      });
  }, []);

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

  return (
    <>
      <div className="market">
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
          <div className="filter">
            <img className="icon" src={filter} alt="" />
          </div>
        </div>
        <div className="tabs">
          <div
            onClick={() => {
              setTab({ ...tab, tab1: true, tab2: false });
            }}
            className={`tab first ${tab.tab1 && "active"}`}
          >
            Магазины
          </div>
          <div
            onClick={() => {
              setTab({ ...tab, tab1: false, tab2: true });
            }}
            className={`tab end ${tab.tab2 && "active"}`}
          >
            Обьявления
          </div>
        </div>
      </div>
      <div className="market_over">
        <div className="category">
          <div
            onClick={() => setCate({ ...cate, active: "all", category: [] })}
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
      {tab.tab1 && (
        <div className="market_list">
          {cate?.category.name ? (
            <div className="line_boxs">
              <h2>
                {cate?.category.name}{" "}
                <MdOutlineArrowForwardIos className="icone" />{" "}
              </h2>
              <div className="ovar_boxs">
                {SearchFilterCate.map((el, index) => (
                  <Card el={el} index={index} />
                ))}
              </div>
            </div>
          ) : (
            SearchFilter.map((item, index) => (
              <div key={index} className="line_boxs">
                <h2>
                  {item.name} <MdOutlineArrowForwardIos className="icone" />
                </h2>
                <div className="ovar_boxs">
                  {item.ads.map((el, index) => (
                    <Card el={el} index={index} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {tab.tab2 && <AdsPost />}
      <div style={{ width: "100%", height: 200 }}></div>
    </>
  );
}
