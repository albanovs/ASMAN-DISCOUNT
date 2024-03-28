import React, { useEffect, useState } from "react";
import "./stories.css";
import StorisContent from "./stories-component";
import { api } from "../../Api";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Storis = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/stories")
      .then((response) => {
        setStories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="storis">
      <div className="storis_blockss">
        <div className="flip">
          {loading ? (
            <div className="skeleton-stories">
              <Skeleton className="storis_content" height={90} width={90} />
              <Skeleton className="storis_content" height={90} width={90} />
              <Skeleton className="storis_content" height={90} width={90} />
              <Skeleton className="storis_content" height={90} width={90} />
              <Skeleton className="storis_content" height={90} width={90} />
            </div>
          ) : (
            stories.map((el, id) => <StorisContent key={id} data={el} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Storis;
