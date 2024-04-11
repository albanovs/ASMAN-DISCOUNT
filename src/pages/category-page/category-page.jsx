import React, { useEffect, useMemo, useState } from "react";
import "./category-page.css";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../market/components/card";
import { useDispatch, useSelector } from "react-redux";
import { changeData } from "../../App/slice/category";
import search from "../../views/market/search.svg";
import filter from "../../views/market/filter.svg";
import { api } from "../../Api";
import LoadingAnimate from "../../UI-kit/loading";

const CategoryPage = () => {
  const { state } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [valuePage, setValuePage] = useState("");
  const { data, name, id } = useSelector((state) => state.category);
  const { pricefrom, priceto, city, sort } = useSelector(
    (state) => state.filter
  );

  console.log(id);

  useEffect(() => {
    if (state === "true") {
      dispatch(changeData([]));
      setLoading(true);
      api
        .get(
          `/market/ad-list/?${id && `cat=${id}`}${
            pricefrom && `&pricefrom=${pricefrom}`
          }${priceto && `&priceto=${priceto}`}${city && `&city=${city}`}${
            sort && `&ordering=${sort}`
          }`
        )
        .then((response) => {
          dispatch(changeData(response.data));
          setLoading(false);
        })
        .catch((error) => {
          console.log("/market/ad-list/:", error);
          setLoading(false);
        });
    }
  }, []);

  const SearchFilterPage = useMemo(() => {
    if (data.length > 0) {
      return data.filter((obj) => {
        const fullName = obj.title.toLowerCase();
        return fullName.includes(valuePage.toLowerCase());
      });
    }
  }, [data, valuePage]);

  return (
    <div className="category_page">
      {loading ? (
        <div className="loading_div">
          <LoadingAnimate />
        </div>
      ) : (
        <>
          {" "}
          <div className="head_market">
            <div className="head_page">
              <IoMdArrowBack
                onClick={() => {
                  navigate("/market");
                  dispatch(changeData([]));
                }}
                size={24}
              />
              <h4>{name}</h4>
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
              <div
                onClick={() => navigate("/filter-market/cate")}
                className="filter"
              >
                <img className="icon" src={filter} alt="" />
              </div>
            </div>
            <div className="market_list">
              <div className="grid_col">
                {SearchFilterPage?.map((el, index) => (
                  <Card el={el} index={index} />
                ))}
              </div>
            </div>
            <div style={{ width: "100%", height: 100 }}></div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryPage;
