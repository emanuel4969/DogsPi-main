/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDogs, getAllTemperament } from "../../Redux/actions/actions";
import style from "./CreateDogs.module.css";
import { Link } from "react-router-dom";
import Image from "../Image/corgi.jpg";
import { useHistory } from "react-router-dom";


export default function CreateDogs() {
  const [name, setName] = useState("");
  const [minHeight, setMinHeight] = useState("");
  const [maxHeight, setMaxHeight] = useState("");
  const [minWeight, setMinWeight] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [lifeSpan, setLifeSpan] = useState("");
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);

  const [dogCreated, setDogCreated] = useState(false);
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const history = useHistory();


  useEffect(() => {
    dispatch(getAllTemperament());
   
  }, [dispatch]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMinHeightChange = (event) => {
    setMinHeight(event.target.value);
  };

  const handleMaxHeightChange = (event) => {
    setMaxHeight(event.target.value);
  };

  const handleMinWeightChange = (event) => {
    setMinWeight(event.target.value);
  };

  const handleMaxWeightChange = (event) => {
    setMaxWeight(event.target.value);
  };

  const handleLifeSpanChange = (event) => {
    setLifeSpan(event.target.value);
  };

  const handleTemperamentChange = (event) => {
    const selectedTemperament = event.target.value;
    if (!selectedTemperaments.includes(selectedTemperament)) {
      setSelectedTemperaments([...selectedTemperaments, selectedTemperament]);
    }
  };

  const removeSelectedTemperament = (temperamentToRemove) => {
    setSelectedTemperaments(
      selectedTemperaments.filter((t) => t !== temperamentToRemove)
    );
  };
  const validateWeight = () => {
    if (maxWeight <= minWeight) { // kg
      alert("maxWeight must be greater than minWeight.")
      return false;
    }
    return true;
  };
  
  const validateHeight = () => {
    if (maxHeight <= minHeight) {// cm
      alert("maxHeight must be greater than minHeight.")
      return false;
    }
    return true;
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedTemperaments.length === 0) {
      alert("Please select at least one temperament.");  
    } 
    if (!validateWeight()) {
     
      return;
    }
  
    if (!validateHeight()) {
      
      return;
    } else {
      const dog = {
        name,
        min_height: minHeight,
        max_height: maxHeight,
        min_weight: minWeight,
        max_weight: maxWeight,
        life_span: lifeSpan,
        image: image ? image : Image,
        temperament: selectedTemperaments,
        createdInDb: true,
      };
      dispatch(createDogs(dog))
        .then(() => {
          setDogCreated(true);
          alert("Dog created successfully!"); 
          history.push("/home");
       
          
         // Update state to true once the dog has been successfully created
        })
        .catch((error) => {
          console.error("Error creating dog:", error);
        });
    }
    
   };
  return (
    <div className={style.createdog}>
      <Link to="/Home">
        <button className={style.landingButtonn}>
          <b>Go Home</b>
        </button>
      </Link>
      <h1 className={style.landingButton}>Create Dog</h1>
      {dogCreated ? (
        <p className={style.select}>Dog created successfully!</p> 
        // Mostrar mensaje si el perro se ha creado con éxito
      ) : null}
      <form onSubmit={handleSubmit}>
        <label>Image: </label>
        <input
          className={style.input}
          type="text"
          name="image"
          placeholder="Url..."
          value={image}
          autoComplete={"off"}
          onChange={(e) => setImage(e.target.value)}
        />

        <label htmlFor="name" className={style.label}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          required
          className={style.input}
          pattern="[A-Za-z]+(\s+[A-Za-z]+)*"
          title="Please enter only letters"
        />

        <label htmlFor="min-height" className={style.label}>
          Min Height (cm):
        </label>
        <input
          type="number"
          id="min-height"
          value={minHeight}
          onChange={handleMinHeightChange}
          required
          className={style.input}
          min="0"
        />

        <label htmlFor="max-height" className={style.label}>
          Max Height (cm):
        </label>
        <input
          type="number"
          id="max-height"
          value={maxHeight}
          onChange={handleMaxHeightChange}
          required
          className={style.input}
          min="0"
        />

        <label htmlFor="min-weight" className={style.label}>
          Min Weight (kg):
        </label>
        <input
          type="number"
          id="min-weight"
          value={minWeight}
          onChange={handleMinWeightChange}
          required
          className={style.input}
          min="0"
        />

        <label htmlFor="max-weight" className={style.label}>
          Max Weight (kg):
        </label>
        <input
          type="number"
          id="max-weight"
          value={maxWeight}
          onChange={handleMaxWeightChange}
          required
          className={style.input}
          min="0"
        />

        <label htmlFor="life-span" className={style.label}>
          Life Span (years):
        </label>
        <input
          type="text"
          id="life-span"
          value={lifeSpan}
          onChange={handleLifeSpanChange}
          required
          className={style.input}
        />
       
        <div>
          <label htmlFor="temperament" className={style.label}>
            Temperament:
          </label>

          <select id="temperament" onChange={handleTemperamentChange} required>
            <option value="">Select Temperament</option>
            {temperaments.length > 0 &&
              temperaments.map((temperament) => (
                <option value={temperament.name} key={temperament.id}>
                  {temperament.name}
                </option>
              ))}
          </select>
          <div>
            {selectedTemperaments.map((temperament) => (
              <span key={temperament}>
                {temperament}
               
                <button onClick={() => removeSelectedTemperament(temperament)}>
                X
                </button>
               
              </span>
            ))}
          </div>
        </div>
      

        <p>
        <button type="submit" className={style.CREATE}>
          CREATE!
        </button>
        </p>
      </form>
    </div>
  );
}

