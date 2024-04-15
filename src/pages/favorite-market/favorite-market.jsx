import React, { useEffect, useMemo, useState } from "react";
import "./favorite-market.css";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { api } from "../../Api";
import LoadingAnimate from "../../UI-kit/loading";
import Card from "../market/components/card";
import search from "../../views/market/search.svg";

const FavoriteMarket = () => {
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState([]);
  const [valuePage, setValuePage] = useState("");
  const [render, setRender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFavorite([]);
    setLoading(true)
    const token = localStorage.getItem("token");
    api
      .get("/market/favourite/list/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setFavorite(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [render]);

  console.log(render);

  const SearchFilterPage = useMemo(() => {
    if (favorite.length > 0) {
      return favorite.filter((obj) => {
        const fullName = obj.ad.title.toLowerCase();
        return fullName.includes(valuePage.toLowerCase());
      });
    }
  }, [favorite, valuePage]);

  return (
    <div className="favorite_market">
      <div className="head_market">
        <MdOutlineArrowBackIosNew
          onClick={() => navigate(-1)}
          color="var(--black)"
          size={24}
        />
        <h1>Любимые обьявления</h1>
      </div>
      {loading ? (
        <div className="loading_div">
          <LoadingAnimate />
        </div>
      ) : (
        <div className="favorite_block">
          <div className="market">
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
            <div className="market_list">
              <div className="grid_col">
                {SearchFilterPage?.map((el, index) => (
                  <Card
                    el={el.ad}
                    index={index}
                    render={render}
                    setRender={setRender}
                  />
                ))}
              </div>
            </div>
            <div style={{ width: "100%", height: 100 }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteMarket;
