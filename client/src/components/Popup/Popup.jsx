import React from "react";
import "./popup.scss";

const Popup = ({ header, content, hidden, setMessage }) => {
  return (
    <>
      {!hidden && <div className="sweetbox_overlay"></div>}
      <div className={hidden ? "sweetbox hidden" : "sweetbox"}>
        <p className="header">{header}</p>
        <p className="content">{content}</p>
        <button className="sweetbox__btn--ok" onClick={() => setMessage(false)}>
          OK
        </button>
      </div>
    </>
  );
};

export default Popup;
