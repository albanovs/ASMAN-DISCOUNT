import React from "react";
import "./chat-market.css";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ChatMarket = () => {
  const navigate = useNavigate();
  
  return (
    <div className="chat_market">
      <div className="head_market">
        <MdOutlineArrowBackIosNew
          onClick={() => navigate(-1)}
          color="var(--black)"
          size={24}
        />
        <h1>Чат</h1>
      </div>
    </div>
  );
};

export default ChatMarket;
