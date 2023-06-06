import React from "react";
import { orderBy } from "../../Redux/actions/actions";
import { useDispatch } from "react-redux";

import style from "./OrderByDogs.module.css";

const Order = (props) => {
  const dispatch = useDispatch();

  function onSelectChange(e) {
    props.setCurrentPage(1)
    e.preventDefault();
    dispatch(orderBy(e.target.value));
  }
  
  return (
    <div className={style.div}>
      <select className={style.landingButton} onChange={(e) => onSelectChange(e)}>
        <option value="all">Filter By Order</option>
        <option value="A_Z">Order A - Z</option>
        <option value="Z_A">Order Z - A</option>
        <option value="WEIGHT_MAX">Weight Max</option>
        <option value="WEIGHT_MIN">Weight Min</option>
      </select>
    </div>
  );
};
export default Order;
