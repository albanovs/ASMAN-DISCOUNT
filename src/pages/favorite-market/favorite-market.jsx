import React, { useEffect, useState } from "react";
import "./favorite-market.css";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { api } from "../../Api";
import LoadingAnimate from "../../UI-kit/loading";

const FavoriteMarket = () => {
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/market/favorite/")
      .then((response) => {
        setFavorite(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

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
        <div className="favorite_block"></div>
      )}
    </div>
  );
};

export default FavoriteMarket;
