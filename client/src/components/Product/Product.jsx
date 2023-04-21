import React, { useEffect, useState } from "react";
import "./product.scss";

const Product = (props) => {
  const { loading, productItem } = props;

  return (
    <div className={loading ? "product_item loading" : "product_item"}>
      <div className="product_item--image">
        <img src={productItem.photoUrl} alt="" />
      </div>
      <div className="product_item--description">
        <h4>{!loading && productItem.title}</h4>
        <span className="location">
          <i className="fa-solid fa-location-dot"></i>{" "}
          {!loading && productItem.location}
        </span>
        <p>
          {!loading &&
            productItem.slaapkamers +
              " Slaapkamers • " +
              productItem.badkamers +
              " Badkamers"}
        </p>
        <p className="price">{!loading && "€ " + productItem.price}</p>
      </div>
    </div>
  );
};

export default Product;
