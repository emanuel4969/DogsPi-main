import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteDog } from '../../Redux/actions/actions';
import { useParams } from 'react-router-dom';
import styles from "./DeleteDogs.module.css"

const DogItemDelete = ({ dogs, setDogs }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [message, setMessage] = useState([]);

  const handleDelete = async () => {
    if (id.length < 5) {
      alert("The dog cannot be deleted.");
      return;
    }
    const confirmDelete = window.confirm("Are you sure you want to delete this dog?");// window indica que se está llamando a una función global disponible en el objeto global window//hace referencia al objeto global del navegador que contiene toda la información sobre la ventana del navegador, incluyendo la URL actual, los objetos DOM, los scripts cargados y otros recursos.
    if (confirmDelete) { // window.confrim() muestra el cuadro de diálogo y la función devuelve true si el usuario hizo clic en "Aceptar" o false si el usuario hizo clic en "Cancelar"
      try {
        const data = await dispatch(deleteDog(id));
        if (data.success) {
          setMessage("The dog has been deleted.");
          setDogs(dogs.filter(dogs => dogs.id !== id));
        } else {
          console.error(data.error);  
        }
      } catch (error) {
        console.error(error);   
      }
    }
  };

  return (
    <div className={styles.dogsDetailContaine}>
      <span>{dogs}</span>
      <div>
        <button className={styles.select} onClick={handleDelete}>DELETE DOG</button>
        <span className={styles.message}>("Only the dog created in the form can be deleted")</span>
        <p>{message}</p>
      </div>
    </div>
  );
  
};
export default DogItemDelete;