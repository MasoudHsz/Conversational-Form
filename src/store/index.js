import { createStore } from "redux";

const initialState = { data: {} };

const reducer = (state = initialState, action) => {
  if (action.type === "FETCH_DATA") {
    return {
      data: action.response,
    };
  }
  
  return state;
};

const store = createStore(reducer);

export default store;
