import React, { useEffect, useMemo, useState } from "react";
import "./my-posts.css";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { api } from "../../../Api";
import LoadingAnimate from "../../../UI-kit/loading";
import Card from "../components/card";
import search from "../../../views/market/search.svg";

const MyPosts = () => {
  const [loading, setLoading] = useState(true);
  const [myPosts, setMyPosts] = useState([]);
  const [valuePage, setValuePage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/market/my-ads", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setMyPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const SearchFilterPage = useMemo(() => {
    if (myPosts.length > 0) {
      return myPosts.filter((obj) => {
        const fullName = obj.title.toLowerCase();
        return fullName.includes(valuePage.toLowerCase());
      });
    }
  }, [myPosts, valuePage]);

  return (
    <div className="my_market">
      <div className="head_market">
        <MdOutlineArrowBackIosNew
          onClick={() => navigate(-1)}
          color="var(--black)"
          size={24}
        />
        <h1>Мои обьявления</h1>
      </div>
      {loading ? (
        <div className="loading_div">
          <LoadingAnimate />
        </div>
      ) : (
        <div className="my_block">
          <div className="market">
            {/* <div className="search_block"> */}
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
            {/* <div
                onClick={() => navigate("/filter-market/cate")}
                className="filter"
              >
                <img className="icon" src={filter} alt="" />
              </div> */}
            {/* </div> */}
            <div className="market_list">
              <div className="grid_col">
                {SearchFilterPage?.map((el, index) => (
                  <Card el={el} index={index} />
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

export default MyPosts;
