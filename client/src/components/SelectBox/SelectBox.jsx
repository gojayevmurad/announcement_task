import React, { useEffect, useState } from "react";
import "./selectBox.scss";

const SelectBox = (props) => {
  const { label, options, setData, value } = props;

  const [active, setActive] = useState(false);

  return (
    <>
      <div
        className={
          active ? "select_box--overlay active" : "select_box--overlay"
        }
        onMouseDown={() => setActive(false)}
      ></div>

      <div className="select_box">
        <div
          className="select_box--main"
          onMouseDown={() => setActive(!active)}
        >
          <div className="select_box--main__content">
            <span>{label}</span>
            <span>{options[value]}</span>
          </div>
          <svg
            style={{
              transform: active ? "rotate(180deg)" : "",
              transition: "transform 0.3s ease-in-out",
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="6"
            viewBox="0 0 24 24"
            fill="#000"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-triangle"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          </svg>
        </div>
        <ul
          className={
            active ? "select_box--options active" : "select_box--options"
          }
        >
          {options.map((option, index) => (
            <li
              onMouseDown={() => setData(index)}
              key={index}
              className={value == index ? "active_option" : ""}
            >
              <p>{option}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SelectBox;
