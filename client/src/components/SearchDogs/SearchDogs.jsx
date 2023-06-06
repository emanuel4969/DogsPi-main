import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterSearchDog, getAllDogs } from "../../Redux/actions/actions";
import { useEffect } from "react";
import style from "./SearchDogs.module.css";

const FilterSearchDog = (props) => {
  const dogs = useSelector((state) => state.dogs);
  const dispatch = useDispatch();
  console.log(dogs);

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);
  
  const onFilterDogs = (e) => {
    props.setCurrentPage(1)
    dispatch(filterSearchDog(e.target.value));
  };

  return (
    <div className={style.div}>
      {dogs.length > 0 && (
        <div>{console.log("La lista de perros no está vacía:", dogs)}</div>
      )}
      <select
        className={style.landingButton}
        onChange={onFilterDogs}
      >
        <option value="All Dogs" key="All Dogs">
          All Dogs
        </option>
        {dogs.map((el) => (
          <option value={el.name} key={el.name}>
            {el.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSearchDog;
