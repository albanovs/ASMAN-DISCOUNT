import React, { useEffect, useState } from "react";
import "./stories.css";
import StorisContent from "./stories-component";
import { api } from "../../Api";

const Storis = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    api
      .get("/stories")
      .then((response) => {
        setStories(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="storis">
      <div className="storis_blockss">
        <div className="flip">
          {stories &&
            stories.map((el, id) => <StorisContent key={id} data={el} />)}
        </div>
      </div>
    </div>
  );
};

export default Storis;
