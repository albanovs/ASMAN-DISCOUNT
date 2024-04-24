import React, { useEffect, useState } from "react";
import "./ads-post.css";
import { api } from "../../../Api";
import { MdAddPhotoAlternate } from "react-icons/md";
import LoadingAnimate from "../../../UI-kit/loading";
import AdsDetail from "./ads-detail";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CategorySelector } from "./components/categorySelector";
import { CurrencySelector } from "./components/currencySelector";

const AdsPost = () => {
  const [photos, setPhotos] = useState([]);
  const [post, setPost] = useState({
    cat: null,
    subcat: "",
    subsubcat: "",
    currency: "",
    title: "",
    price: null,
    price_asman: null,
    number: "",
    city: "",
    description: "",
    images: []
  });
  const [view, setView] = useState({
    openModal: false,
    value: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [subSubCategory, setSubSubCategory] = useState([]);
  const [currency, setCurrency] = useState("СОМ");


  useEffect(() => {
    api
      .get("/market/cat-choices/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const PostRequest = async () => {
    setLoading(true);
    if (post.images.length > 0) {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("cat", post.subsubcat);
      formData.append("title", post.title);
      formData.append("price", post.price);
      formData.append("city", post.city);
      formData.append("number", post.number);
      formData.append("currency", currency);
      formData.append("price_asman", post.price_asman);
      formData.append("description", post.description);

      post.images.forEach((image) => {
        formData.append("images", image.img);
      });

      try {
        const response = await api.post("/market/ad-create/", formData, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setLoading(false);
        setError(response.data);
        console.log(response.data);

        if (response.data.response === true) {
          setPost({
            cat: null,
            title: "",
            price: null,
            city: "",
            description: "",
            images: [],
            subcat: null,
          });
          setPhotos([]);
          navigate("/market");
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        setError({ photo: "" });
      }
    } else {
      setError({ photo: "Добавьте фотографию" });
      setLoading(false);
    }
  };

  const handleAddPhoto = (event) => {
    const files = event.target.files;
    const id = Date.now();
    const newPhotos = Array.from(files).map((file) => ({
      id: file.lastModified + id,
      img: URL.createObjectURL(file),
    }));
    const newPhotosTwo = Array.from(files).map((file) => ({
      id: file.lastModified + id,
      img: file,
    }));
    setPhotos((prevPhotos) => [...newPhotos, ...prevPhotos]);
    setPost((prevPost) => ({
      ...prevPost,
      images: [...newPhotosTwo, ...prevPost.images],
    }));
  };

  const handleDeletePhoto = (id) => {
    setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
    setPost((prevPost) => ({
      ...prevPost,
      images: prevPost.images.filter((image) => image.id !== id),
    }));
  };

  const handleChangePhoto = (id, file) => {
    if (!file || !(file instanceof Blob)) {
      console.error(file, "Invalid file type. Expected Blob.");
      return;
    }

    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo.id === id ? { ...photo, img: URL.createObjectURL(file) } : photo
      )
    );

    setPost((prevPost) => ({
      ...prevPost,
      images: prevPost.images.map((image) =>
        image.id === id ? { ...image, img: file } : image
      ),
    }));
  };

  const filterSubcategories = (selectedCategoryId, categories) => {
    const selectedCategory = categories.find(category => category.id == selectedCategoryId);
    if (selectedCategory && selectedCategory.children) {
      return selectedCategory.children;
    }
    return [];
  };

  const handleChangeCategory = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find(category => category.id == selectedCategoryId);
    if (selectedCategory && selectedCategory.children) {
      setSubSubCategory(selectedCategory.children);
    } else {
      setSubSubCategory([]);
    }
    setPost({ ...post, cat: selectedCategoryId, subcat: '', subsubcat: '' });
  };


  const handleChangeSubCategory = (e) => {
    const selectedSubCategoryId = e.target.value;
    const selectedSubCategory = subSubCategory.find(subcategory => subcategory.id == selectedSubCategoryId);
    if (selectedSubCategory && selectedSubCategory.children) {
      setPost({ ...post, subcat: selectedSubCategoryId });
      setSubSubCategory(selectedSubCategory.children);
    } else {
      setPost({ ...post, subcat: selectedSubCategoryId, subsubcat: '' });
      setSubSubCategory([]);
    }
  };

  return (
    <div className="ads_post">
      <div className="head_market">
        <MdOutlineArrowBackIosNew
          onClick={() => navigate(-1)}
          color="var(--black)"
          size={24}
        />
        <h1>Добавить обьявления</h1>
      </div>
      {view.openModal && (
        <div className="modal_photo">
          <div
            onClick={() => setView({ ...view, openModal: false })}
            className="modal_not"
          ></div>
          <div className="modal_photo_container">
            <img
              onClick={() => setView(true)}
              src={view.value}
              alt=""
              className="modal_image"
            />
          </div>
        </div>
      )}
      <div className="images_market">
        <div className="ads_post_container">
          <form onSubmit={handleAddPhoto}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleAddPhoto}
              style={{ display: "none" }}
            />
            <div
              className="btn_add"
              onClick={() =>
                document.querySelector('input[type="file"]').click()
              }
            >
              <MdAddPhotoAlternate color="#888" size={24} />
              <p>Добавить фото</p>
            </div>
          </form>
        </div>
        {photos.length > 0 && (
          <div className="photo-grid">
            {photos.map((photo, index) => (
              <AdsDetail
                view={view}
                setView={setView}
                photo={photo}
                index={index}
                handleDeletePhoto={handleDeletePhoto}
                handleChangePhoto={handleChangePhoto}
              />
            ))}
          </div>
        )}
      </div>
      <div className="ads_post_container">
        {error.photo && <p className="red">{error.photo}</p>}
        <form className="ads_detail_block">
          <CategorySelector
            filterSubcategories={filterSubcategories}
            categories={categories}
            handleChangeCategory={handleChangeCategory}
            handleChangeSubCategory={handleChangeSubCategory}
            post={post}
            setPost={setPost}
            subSubCategory={subSubCategory}
          />
          {error.cat && <p className="red">{error.cat}</p>}
          <div className="box_market">
            <label className="label_market">Название</label>
            <input
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="input_market"
              placeholder="Название"
              type="text"
            />
          </div>
          {error.title && <p className="red">{error.title}</p>}
          <div className="box_market">
            <label className="label_market">Описание</label>
            <textarea
              value={post.description}
              onChange={(e) =>
                setPost({ ...post, description: e.target.value })
              }
              className="input_market text"
              placeholder="Описание"
              type="text"
            />
          </div>
          {error.description && <p className="red">{error.description}</p>}
          <div className="box_market">
            <label className="label_market">Город</label>
            <input
              value={post.city}
              onChange={(e) => setPost({ ...post, city: e.target.value })}
              className="input_market"
              placeholder="Город"
              type="text"
            />
          </div>
          {error.city && <p className="red">{error.city}</p>}
          <CurrencySelector
            currency={currency}
            setPost={setPost}
            post={post}
            setCurrency={setCurrency} />
          {error.price && <p className="red">{error.price}</p>}
          <div className="box_market">
            <label className="label_market">Цена за asman</label>
            <input
              value={post.price_asman}
              onChange={(e) => setPost({ ...post, price_asman: e.target.value })}
              className="input_market"
              placeholder="валюта asman"
              type="number"
            />
          </div>
          {error.price_asman && <p className="red">{error.price_asman}</p>}
          <div className="box_market">
            <label className="label_market">Номер телефона</label>
            <input
              value={post.number}
              onChange={(e) => setPost({ ...post, number: e.target.value })}
              className="input_market"
              placeholder="+996500500500"
              type="number"
            />
          </div>
          {error.number && <p className="red">{error.number}</p>}
          <button
            disabled={loading}
            onClick={PostRequest}
            className="button_form"
          >
            {loading ? <LoadingAnimate /> : "Добавить"}
          </button>
        </form>
      </div >
    </div >
  );
};

export default AdsPost;