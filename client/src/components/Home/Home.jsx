/* eslint-disable no-unused-vars */
import { getAllDogs, clean } from "../../Redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import SearchDogs from "../SearchDogs/SearchDogs";
import FilterTemperaments from "../FilterTemperaments/FilterTemperaments";
import Search from "../Search/Search";
import OrderByDogs from "../OrderByDogs/OrderByDogs";


export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(clean());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllDogs());
    setSearchResults([]);
    
  }
 // cuando divide la cantidad de pag ceil las redondea hacia arriba
 //  first: primero() - Last: ultimo( contiene las 8 pag)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (searchResults.length > 0
    ? searchResults
    : allDogs
  ).slice(indexOfFirstItem, indexOfLastItem);//slice: devuelve un nuevo array que contiene los elementos extraídos
  const totalPages = Math.ceil(// redondea hacia arriba 
    (searchResults.length > 0 ? searchResults : allDogs).length / itemsPerPage
  );

  function handlePageClick(event, pageNumber) {
    event.preventDefault();
    setCurrentPage(pageNumber);
  }

  function handlePrevClick() {
    setCurrentPage((prev) => prev - 1);
  }

  function handleNextClick() {
    setCurrentPage((prev) => prev + 1);
  }

  return (
    <div className={styles.landingSection}>
    <Link to="/home">
        <button className={styles.landingButton} onClick={handleClick}>ALL DOGS</button>
        </Link>
     
      <Link to="/createdogs"><button className={styles.landingButton}>CREATE DOGS</button></Link>
     
      {/* <div className={styles.paginationButton}>
        <button
          disabled={currentPage === 1}
          onClick={handlePrevClick}
          className={styles.landingButton}
        >
          Prev
        </button>
        {Array.from(Array(totalPages), (e, i) => {
          return (
            <button
              key={i}
              onClick={(e) => handlePageClick(e, i + 1)}
              className={`${styles.select} ${currentPage === i + 1 ? styles.active : ''}`}
            >
              {i + 1}
            </button>
          );
        })}
        <button
          disabled={currentPage === totalPages}
          onClick={handleNextClick}
          className={styles.landingButton}
        >
          Next
        </button>
      </div> */}
      <div className={styles.search}>
  
       
      <SearchDogs setCurrentPage={setCurrentPage}/>
       <FilterTemperaments setCurrentPage={setCurrentPage}/>
        <OrderByDogs setCurrentPage={setCurrentPage} />
        <Search setCurrentPage={setCurrentPage}/>
      </div>
      {(searchResults.length > 0 ? searchResults : currentItems).map((dog) => (
        <div key={dog.id} className={styles.card}>
          <Link to={`/detail/${dog.id}`} style={{ textDecoration: "none" }}>
            <img src={dog.image} alt={dog.name} />
            <p className={styles.cardInfo}>Name: {dog.name}</p>
            <p className={styles.cardInfo}>Weight max: {dog.max_weight} kg</p>
            <p className={styles.cardInfo}>Weight min: {dog.min_weight} kg</p>
            <p className={styles.cardInfo}>Temperament: {dog.temperament}</p>
         
          </Link>
        </div>
      ))}
        <div className={styles.paginationButton}>
        <button
          disabled={currentPage === 1}
          onClick={handlePrevClick}
          className={styles.landingButton}
        >
          Prev
        </button>
        {Array.from(Array(totalPages), (e, i) => {
          return (
            <button
              key={i}
              onClick={(e) => handlePageClick(e, i + 1)}
              className={`${styles.select} ${
                currentPage === i + 1 ? styles.active : ""
              }`}
            >
              {i + 1}
            </button>
          );
        })}
        <button
          disabled={currentPage === totalPages}
          onClick={handleNextClick}
          className={styles.landingButton}
        >
          Next
        </button>
      </div>
    </div>
  );
} 
     