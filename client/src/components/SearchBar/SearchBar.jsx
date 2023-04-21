import React, { useRef, useState } from "react";
import "./searchBar.scss";
import { connect } from "react-redux";

const SearchBar = ({ search, dispatch, isLoading, setIsLoading }) => {
  const [searchText, setSearchText] = useState("");

  const inputVal = useRef();

  const changeHandler = () => {
    setSearchText(inputVal.current.value);
    if (inputVal.current.value.trim() === "")
      dispatch({ type: "SET_SEARCH", payload: "" });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchText.trim() === search) return;
    setIsLoading(true);
    dispatch({ type: "SET_SEARCH", payload: searchText.trim() });
  };

  return (
    <form className="searchbar" onSubmit={submitHandler}>
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        value={searchText}
        onChange={changeHandler}
        ref={inputVal}
        disabled={isLoading}
        placeholder="Search..."
        type="text"
      />
      <button disabled={isLoading}>
        {isLoading ? <div className="loading"></div> : <p>Search</p>}
      </button>
    </form>
  );
};

const t = (a) => a;
export default connect(t)(SearchBar);
