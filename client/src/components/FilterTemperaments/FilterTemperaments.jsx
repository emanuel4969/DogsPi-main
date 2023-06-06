import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clean,
  filterTemperament,
  getAllTemperament   
} from "../../Redux/actions/actions";
import { useEffect } from "react";
import style from "./FilterTemperaments.module.css";

const FilterTemperament = (props) => {

  const temperament = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTemperament());
    dispatch(clean());
  }, [dispatch]);

  const onFilterTemperament = (e) => {
    props.setCurrentPage(1)
    e.preventDefault();
    dispatch(filterTemperament(e.target.value));
  };

  return (
    <div className={style.div}>
      <select className={style.landingButton} onChange={onFilterTemperament}>
        <option value="All Temperaments" key="All Temperaments">
          All Temperaments
        </option>
        {temperament.length > 0 &&
          temperament.map((el) => (
            <option value={el.name} key={el.name}>
              {el.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default FilterTemperament;
