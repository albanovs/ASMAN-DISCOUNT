import React, { useState } from "react";
import "./Modal.css";
import { MdClose } from "react-icons/md";

const Modal = ({ isModalOpen, setIsModalOpen, children, color }) => {
  const [startY, setStartY] = useState(null);
  const [offsetY, setOffsetY] = useState(0);

  const closeModal = () => {
    setIsModalOpen(false);
    setOffsetY(0);
  };

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!startY) return;

    const deltaY = e.touches[0].clientY - startY;
    setOffsetY(deltaY);
  };

  const handleTouchEnd = () => {
    if (offsetY > 100) {
      closeModal();
    } else {
      setOffsetY(0);
    }
    setStartY(null);
  };

  return (
    <div className="modal_comp">
      <div
        className="modal-overlay"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateY(${Math.min(offsetY, 0)}px)`,
          transition: "transform 0.3s ease",
        }}
      >
        <div onClick={closeModal} className="not_modal"></div>
        <div style={{ background: color }} className="modal">
          <span className="close" onClick={closeModal}>
            <MdClose className="icon" />
          </span>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
