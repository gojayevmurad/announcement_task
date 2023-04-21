import React, { useEffect, useState } from "react";
import "./filter.scss";
import SelectBox from "../SelectBox/SelectBox";
import { connect } from "react-redux";

const Filter = ({ dispatch }) => {
  const [sortByIndex, setSortByIndex] = useState(3);
  const [typeIndex, setTypeIndex] = useState(3);

  let sortByOptions = ["Date added", "Highest price", "Lowest price", ""];
  let typeOptions = ["Appartment", "Villa", "Townhouse", ""];

  const set_type = () => {
    dispatch({
      type: "SET_TYPE",
      payload: typeOptions[typeIndex].toUpperCase(),
    });
  };

  const set_sort = () => {
    dispatch({
      type: "SET_SORT",
      payload: sortByOptions[sortByIndex].toLowerCase().split(" ").join("_"),
    });
    if (sortByIndex == 1 || sortByIndex == 0) {
      dispatch({
        type: "SET_ORDER",
        payload: "desc",
      });
    } else {
      dispatch({
        type: "SET_ORDER",
        payload: "asc",
      });
    }
  };

  useEffect(() => {
    set_sort();
  }, [sortByIndex]);

  useEffect(() => {
    set_type();
  }, [typeIndex]);

  return (
    <div className="filter">
      <SelectBox
        label="Sort by"
        options={sortByOptions}
        setData={setSortByIndex}
        value={sortByIndex}
      />
      <SelectBox
        label="Type"
        options={typeOptions}
        setData={setTypeIndex}
        value={typeIndex}
      />
      <button
        className="filter__clear"
        onClick={() => {
          setTypeIndex(3);
          setSortByIndex(3);
        }}
      >
        CLEAR
      </button>
    </div>
  );
};
const t = (a) => a;
export default connect(t)(Filter);
