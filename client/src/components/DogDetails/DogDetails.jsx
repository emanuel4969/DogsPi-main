/* eslint-disable no-undef */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import DeleteDogs from "../DeleteDogs/DeleteDogs"
import { getDogId, clean } from "../../Redux/actions/actions";
import styles from "./DogDetails.module.css";



const image = "";
const DogsDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const allDogs = useSelector((state) => state.dogsDetail);
  
    useEffect(() => {
    dispatch(getDogId(id));
    dispatch(clean());
  }, [dispatch, id]);

  return (
    <div className={styles.dogsDetailContainer}>
      <Link to="/Home">
        <button className={styles.select}>Back Home </button>
      </Link>
       <DeleteDogs />

      
      <div className={styles.dogCard}>
        {allDogs.length === 0 ? (
          <div></div>
        ) : (
          <>
            <img
              className={styles.dogImage}
              src={allDogs.image ? allDogs.image : image}
              alt={`img-${allDogs.name}`}
            />
            <section>
              <div className={styles.dogInfo}>
                <h1 className={styles.dogName}>{allDogs.name}</h1>
                {allDogs.temperament ? (
                  <p>
                    <b>Temperament: </b> {allDogs.temperament}
                  </p>
                ) : (
                  <p>
                    <b>Temperament:</b> not found
                  </p>
                )}
                <p>
                  <b>Min height:</b> {allDogs.min_height} cm
                </p>
                <p>
                  <b>Max height:</b> {allDogs.max_height} cm
                </p>
                <p>
                  <b>Min weight:</b> {allDogs.min_weight} kg
                </p>
                <p>
                  <b>Max weight:</b> {allDogs.max_weight} kg
                </p>
                <p>
                  <b>Life span (years):</b> {allDogs.life_span}
                </p>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default DogsDetail;
