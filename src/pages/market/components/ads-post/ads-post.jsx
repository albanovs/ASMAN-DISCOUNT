import React, { useEffect, useState } from "react";
import "./ads-post.css";
import { api } from "../../../../Api";
import { MdAddPhotoAlternate } from "react-icons/md";
import LoadingAnimate from "../../../../UI-kit/loading";
import AdsDetail from "./ads-detail";

const AdsPost = () => {
  const [photos, setPhotos] = useState([]);
  const [post, setPost] = useState({
    cat: null,
    title: "",
    price: null,
    city: "",
    description: "",
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const [view, setView] = useState({
    openModal: false,
    value: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);

  const PostRequest = async () => {
    setLoading(true);
    if (post.images.length > 0) {
      const token = localStorage.getItem("token");
      const newDatas = {
        cat: post.cat,
        title: post.title,
        price: post.price,
        city: post.city,
        description: post.description,
        images: post.images,
      };
      try {
        const response = await api.post("/market/ad-create/", newDatas, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setLoading(false);
        setError(response.data);
        console.log(response.data);
        if (response.data.response === true) {
          setPost({
            ...post,
            cat: null,
            title: "",
            price: null,
            city: "",
            description: "",
            images: [],
          });
          setPhotos([]);
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

  const handleAddPhoto = (event) => {
    const files = event.target.files;
    const newPhotos = Array.from(files).map((file) => ({
      id: Date.now(),
      url: URL.createObjectURL(file),
    }));
    setPhotos((prevPhotos) => [...newPhotos, ...prevPhotos]);
    setPost((prevPost) => ({
      ...prevPost,
      images: [...newPhotos, ...prevPost.images],
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
        photo.id === id ? { ...photo, url: URL.createObjectURL(file) } : photo
      )
    );

    setPost((prevPost) => ({
      ...prevPost,
      images: prevPost.images.map((image) => (image.id === id ? file : image)),
    }));
  };

  console.log(post);

  return (
    <div className="ads_post">
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
      </div>
      <div className="ads_post_container">
        {error.photo && <p className="red">{error.photo}</p>}
        <from className="ads_detail_block">
          <div className="box_market">
            <label className="label_market">Категория</label>
            <select
              className="select_market"
              value={post.cat}
              onChange={(e) => setPost({ ...post, cat: e.target.value })}
            >
              <option value="">Выберите категорию</option>
              {categories.map((category) => (
                <option
                  onClick={() => setPost({ ...post, cat: category.id })}
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
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
          <div className="box_market">
            <label className="label_market">Цена</label>
            <input
              value={post.price}
              onChange={(e) => setPost({ ...post, price: e.target.value })}
              className="input_market"
              placeholder="Цена"
              type="number"
            />
          </div>
          {error.price && <p className="red">{error.price}</p>}
          <button
            disabled={loading}
            onClick={PostRequest}
            className="button_form"
          >
            {loading ? <LoadingAnimate /> : "Добавить"}
          </button>
        </from>
      </div>
    </div>
  );
};

export default AdsPost;
