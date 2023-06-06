import axios from "axios";

export const getAllDogs = () => async (dispatch) => {
  const response = await axios.get("/dogs");
  return dispatch({
    type: "GET_ALL_DOGS",
    payload: response.data,
  });
};

export const getAllTemperament = () => async (dispatch) => {
  const response = await axios.get("/temperaments");
  return dispatch({
    type: "GET_TEMPERAMENT",
    payload: response.data,
  });
};

export const getByName = (name) => async (dispatch) => {
  const response = await axios.get(`/dogs?name=` + name);
  return dispatch({
    type: "GET_BY_NAME",
    payload: response.data,
  });
};


export const getDogId = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`/dogs/${id}`);
    return dispatch({
      type: "GET_DOG_DETAILS",
      payload: response.data,
    });
  };
};

export const createDogs = (payload) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("/dogs", payload);
      console.log(response.data);
      return dispatch({
        type: "CREATE_DOGS",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};


export const deleteDog = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/dogs/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        dispatch({
          type: "DELETE_DOG",
          payload: id,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};


export const filterDogs = (payload) => {
  return {
    type: "FILTER_DOGS",
    payload,
  };
};

export const filterSearchDog = (payload) => {
  return {
    type: "FILTER_SEARCH_DOGS",
    payload,
  };
};

export const filterTemperament = (payload) => {
  return {
    type: "FILTER_TEMPERAMENT",
    payload,
  };
};

export const orderBy = (payload) => {
  return {
    type: "ORDER",
    payload,
  };
};

export const clean = (payload) => {
  return {
    type: "CLEAN",
    payload,
  };
};
