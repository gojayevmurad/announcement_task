import React, { useEffect, useState } from "react";
import "./products.scss";

import Filter from "../../components/Filter/Filter";
import SearchBar from "../../components/SearchBar/SearchBar";
import Product from "../../components/Product/Product";
import { AnnouncementApi } from "../../api/api";
import { connect } from "react-redux";

const Products = ({ sort, type, order, search }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchBarLoading, setSearchBarLoading] = useState(false);

  //? hamburger filter
  const [hideFilter, setHideFilter] = useState(true);

  //! pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);

  function getProducts() {
    AnnouncementApi.getAnnouncements(
      currentPage,
      postsPerPage,
      type,
      sort,
      order,
      search
    ).then((res) => {
      setProducts(res.announcements);
      setPageCount(Math.ceil(res.totalCount / postsPerPage));
      setIsLoading(false);
      searchBarLoading && setSearchBarLoading(false);
    });
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    isLoading && getProducts();
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);
  }, [currentPage, type, sort, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [type, sort, search]);

  return (
    <>
      <div
        className={hideFilter ? "overlay" : "overlay hide"}
        onMouseDown={() => !hideFilter && setHideFilter(true)}
      ></div>
      <div className="hamburger">
        <input
          className="checkbox"
          type="checkbox"
          name=""
          id=""
          checked={!hideFilter}
          onChange={() => setHideFilter(!hideFilter)}
        />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
      </div>
      <div className="products">
        <div className="container">
          <div className="products--content">
            <div
              className={
                hideFilter ? "products--filter hide" : "products--filter "
              }
            >
              <button className="close" onClick={() => setHideFilter(true)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
              <Filter />
            </div>
            <div className="products--list">
              <SearchBar
                isLoading={searchBarLoading}
                setIsLoading={setSearchBarLoading}
              />
              <div className="products--list__main">
                {products.map((product, index) => (
                  <Product
                    loading={isLoading}
                    key={index}
                    productItem={product}
                  />
                ))}

                {products.length === 0 && (
                  <div className="products--list_no-product">
                    <p>No announcement found</p>
                  </div>
                )}
              </div>
              {pageCount > 1 && (
                <div className="products--list__pagination">
                  {currentPage > 2 && (
                    <button
                      className="pagination--btn"
                      onClick={() => setCurrentPage(1)}
                    >
                      <i className="fa-solid fa-angle-double-left"></i>
                    </button>
                  )}
                  {currentPage !== 1 && (
                    <button
                      className="pagination--btn"
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      <i className="fa-solid fa-angle-left"></i>
                    </button>
                  )}
                  {currentPage !== 1 && (
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className="prev--page"
                    >
                      {currentPage - 1}
                    </button>
                  )}
                  {<button className="current_page">{currentPage}</button>}
                  {currentPage !== pageCount && (
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="next--page"
                    >
                      {currentPage + 1}
                    </button>
                  )}

                  {currentPage !== pageCount && (
                    <button
                      className="pagination--btn"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      <i className="fa-solid fa-angle-right"></i>
                    </button>
                  )}

                  {currentPage < pageCount - 1 && (
                    <button
                      className="pagination--btn"
                      onClick={() => setCurrentPage(pageCount)}
                    >
                      <i className="fa-solid fa-angle-double-right"></i>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const t = (a) => a;
export default connect(t)(Products);
