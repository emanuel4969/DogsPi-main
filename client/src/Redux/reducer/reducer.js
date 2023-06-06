/* eslint-disable no-fallthrough */
const initialState = {
  dogs: [],
  dogsClean: [],
  dogsDetail: [],
  temperaments: [],
 
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_DOGS":
      return {
        ...state,
        dogs: action.payload,
        dogsClean: action.payload,
      };

    case "GET_BY_NAME":
      return {
        ...state,
        dogs: action.payload,
      };

    case "GET_TEMPERAMENT":
      return {
        ...state,
        temperaments: action.payload,
      };
      
    case "CREATE_DOGS":
      return {
        ...state,
      };

    case "DELETE_DOG":
  return {
    ...state,
    dogsDetail: state.dogs ? state.dogs.filter((dogs) => dogs.id !== action.payload) : [],

  };

    case "GET_DOG_DETAILS":
      return {
        ...state,
        dogsDetail: action.payload,
      };

    case "FILTER_SEARCH_DOGS":
      const allDogs = state.dogsClean;
      const aux20 =
        action.payload === "All Dogs"
          ? allDogs
          : allDogs.filter((e) =>
              e.name?.includes(action.payload) ? e : null
            );
      return {
        ...state,
        dogs: aux20,
      };

    case "FILTER_TEMPERAMENT":
      const dogstemp = state.dogsClean;
      const aux2 =
        action.payload === "All Temperaments"
          ? dogstemp
          : dogstemp.filter((e) =>
              e.temperament?.includes(action.payload) ? e : null
            );
      return {
        ...state,
        dogs: aux2,
      };

    case "ORDER":
      let orderAz = [...state.dogs];
      orderAz = orderAz.sort((a, b) => {
        switch (action.payload) {
          case "A_Z":
            if (a.name < b.name) {
              return -1;
            } else {
              return 1;
            }

          case "Z_A":
            if (a.name > b.name) {
              return -1;
            } else {
              return 1;
            }
          case "WEIGHT_MAX":
            if (a.max_weight < b.max_weight) {
              return -1;
            } else {
              return 1;
            }
          case "WEIGHT_MIN":
            if (a.min_weight < b.min_weight) {
              return -1;
            } else return 1;
          default:
            return 0;
        }
      });

      return { ...state, dogs: orderAz };

    case "FILTER_DOGS":
      const createdFilter =
        action.payload === "dogs of the api"
          ? state.dogsClean.filter((e) => !e.createdInDb)
          : state.dogsClean.filter((e) => e.createdInDb);
      return {
        ...state,
        dogs: action.payload === "all dogs" ? state.dogsClean : createdFilter,
      };
    case "CLEAN":
      return {
        ...state,
        dogsDetail: [],
      };


    default:
      return {
        ...state,
      };
  }
}
