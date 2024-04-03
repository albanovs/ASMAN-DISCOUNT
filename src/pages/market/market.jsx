import React, { useEffect, useMemo, useState } from "react";
import "./market.css";
import search from "../../views/market/search.svg";
import filter from "../../views/market/filter.svg";
import { api } from "../../Api";
import AdsPost from "./components/ads-post/ads-post";
import { BiCategory } from "react-icons/bi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import Card from "./components/card";
import { IoMdArrowBack } from "react-icons/io";
import LoadingAnimate from "../../UI-kit/loading";
import banner from '../../views/market/banner.jpg'

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
  const [valuePage, setValuePage] = useState("");
  const [page, setPage] = useState({
    pages: false,
    data: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/market/cat-list/")
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

  const SearchFilterPage = useMemo(() => {
    if (page?.data?.ads) {
      return page.data.ads.filter((obj) => {
        const fullName = obj.title.toLowerCase();
        return fullName.includes(valuePage.toLowerCase());
      });
    }
  }, [page.data.ads, valuePage]);

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
      {tab.tab1 && (
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
          {
            cate.data.length > 0 ? (
              <div className="market_list">
                {cate?.category.name ? (
                  <div className="line_boxs">
                    <h2
                      onClick={() =>
                        setPage({ ...page, data: cate.category, pages: true })
                      }
                    >
                      {cate?.category.name}
                      <MdOutlineArrowForwardIos className="icone" />
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
                      <h2
                        onClick={() =>
                          setPage({ ...page, data: item, pages: true })
                        }
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
                            <Card el={el} index={index} />
                          ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) :
              <div
                style={{ textAlign: ' center' }}
              >Скоро появится товары !!!</div>
          }
        </>
      )}

      {tab.tab2 && <AdsPost />}

      <div style={{ width: "100%", height: 100 }}></div>

      {page.pages && <div className="page_fixet_not"></div>}

      {page.pages && (
        <div className="fixet_mar">
          <div className="page_fixet">
            <div className="head_market">
              <div className="head_page">
                <IoMdArrowBack
                  onClick={() => setPage({ ...page, data: [], pages: false })}
                  size={24}
                />
                <h4>{page.data.name}</h4>
              </div>
            </div>
            <div className="market">
              <div className="search_block">
                <div className="relative_input">
                  <input
                    value={valuePage}
                    onChange={(e) => setValuePage(e.target.value)}
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
              <div className="market_list">
                <div className="grid_col">
                  {SearchFilterPage.map((el, index) => (
                    <Card el={el} index={index} />
                  ))}
                </div>
              </div>
              <div style={{ width: "100%", height: 100 }}></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
