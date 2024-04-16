import React, { useEffect, useState } from "react";
import "./ads-detail.css";
import { api } from "../../Api";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { LuShare2 } from "react-icons/lu";
import Slider from "react-slick";
import heart from "../../views/market/heart.svg";
import heart_red from "../../views/market/heart_red.svg";
import Card from "../market/components/card";
import LoadingAnimate from "../../UI-kit/loading";
import { toast } from "react-toastify";
import { FaCity } from "react-icons/fa";
import { MdPhone } from "react-icons/md";
import { useSelector } from "react-redux";

const AdsDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [love, setLove] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getStatus = useSelector((state) => state.status.status);

  useEffect(() => {
    if (data.isfavorite) {
      setLove(true);
    }
  }, [data]);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    api
      .get(`/market/ad-detail/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("/market/ad-detail/:", error);
        setLoading(false);
      });
  }, [love]);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const sendFavoriteId = (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    setLove(!love);
    api
      .post(
        `/market/favourite/${data.id}/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
      })
      .then((error) => {
        console.log(error);
      });
  };

  const handleShareLink = async () => {
    try {
      await navigator.share({
        title: data.title,
        text: (
          <p
            className="description"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        ),
        url: `https://discount.asman.io/#/market-detail/${data.id}`,
      });
    } catch (error) {
      console.error("Ошибка обмена:", error.message);
    }
  };

  return loading ? (
    <div className="loading_div">
      <LoadingAnimate />
    </div>
  ) : (
    <div className="ads_detail">
      <div className="head_detail">
        <div className="between">
          <IoMdArrowBack onClick={() => navigate(-1)} size={24} />
          <div className="flex">
            {/* <AiOutlineInfoCircle size={24} /> */}
            <LuShare2 onClick={handleShareLink} size={24} />
          </div>
        </div>
      </div>

      {data.images.length > 1 ? (
        <Slider {...settings} className="box_slide">
          {data?.images?.map((elem, id) => (
            <div key={id}>
              <img className="ads_detail_photo" src={elem?.img} alt="" />
            </div>
          ))}
        </Slider>
      ) : (
        <div>
          <img className="ads_detail_photo" src={data?.images[0]?.img} alt="" />
        </div>
      )}

      <div className="contants">
        <div className="between">
          <p className="title">{data.title}</p>
          <img
            className="loves"
            onClick={sendFavoriteId}
            src={love ? heart_red : heart}
            alt=""
          />
        </div>
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
        <p className="prices">
          {data.price} c / {data.price * getStatus.rate} Асман
        </p>
        <div className="user">
          <img src={data.avatar} alt="" />
          <div>
            <p className="user_title">
              {data.first_name} {data.last_name}
            </p>
          </div>
        </div>
        <div className="user">
          <FaCity style={{ marginRight: 10 }} color="var(--orange)" size={24} />
          <div>
            <p className="user_title">{data.city}</p>
            <p className="texting">Город</p>
          </div>
        </div>
        <div className="user r">
          <MdPhone
            style={{ marginRight: 10 }}
            color="var(--orange)"
            size={24}
          />
          <div>
            <p className="user_title">{data?.number}</p>
            <p className="texting">Номер телефона</p>
          </div>
        </div>
        <div className="line_boxs">
          <h2>Похожие товары</h2>
        </div>
      </div>
      <div className="ovar_boxs">
        {data?.similar_ads?.map((el, index) => (
          <div className="box_markets">
            <Card el={el} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdsDetail;
