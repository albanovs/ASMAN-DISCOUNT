import React, { useState } from 'react';
import './stories.css';
import Stories from 'react-insta-stories';
import { IoClose } from "react-icons/io5";
import LoadingAnimate from '../../UI-kit/loading';

const StorisContent = ({ data }) => {
  const [status, setStatus] = useState(false);
  const [view, setView] = useState(false);

  return (
    <>
      <div onClick={() => setStatus(true) || setView(true)} className="storis_content">
        <img style={{ border: view ? "2px solid transparent" : "2px solid var(--blue)" }} src={data.img} alt="" />
      </div>
      {status ? data ? (
        <div className="statuses">
          <IoClose onClick={() => setStatus(false)} className='close' />
          <Stories
            stories={data.stories}
            width={"100%"}
            height={"100vh"}
            onAllStoriesEnd={() => setStatus(false)}
          />
        </div>
      ) : (
        <div onClick={() => setStatus(false)} className="not_status">
          <LoadingAnimate color={"#fff"} />
        </div>
      ) : ""
      }
    </>
  );
};

export default StorisContent;