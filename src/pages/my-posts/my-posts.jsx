import React, { useEffect, useState } from "react";
import "./my-posts.css";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { api } from "../../Api";
import LoadingAnimate from "../../UI-kit/loading";

const MyPosts = () => {
  const [loading, setLoading] = useState(true);
  const [myPosts, setMyPosts] = useState([]);
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

  console.log(myPosts);

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
        <div className="my_block"></div>
      )}
    </div>
  );
};

export default MyPosts;
