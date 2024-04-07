import React, { useRef } from "react";

const AdsDetail = ({
  view,
  setView,
  photo,
  index,
  handleChangePhoto,
  handleDeletePhoto,
}) => {
  const fileInputRef = useRef(null);

  return (
    <div className="photo_box" key={index}>
      <div className="photo-container">
        <img
          onClick={() =>
            setView({
              ...view,
              openModal: true,
              value: photo.url,
            })
          }
          src={photo.url}
          alt=""
          className="photo"
        />
        <div className="photo-buttons">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleChangePhoto(photo.id, e.target.files[0])}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <button
            className="btn_photo"
            onClick={() => fileInputRef.current.click()}
          >
            Изменить
          </button>
          <button
            className="btn_photo delete"
            onClick={() => handleDeletePhoto(photo.id)}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdsDetail;
