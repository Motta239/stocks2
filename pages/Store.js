import React, { createContext, useReducer } from "react";

const initialState = {
  darkMode: false,
  count: 0,
  search: "",
  value: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    case "INCREMENT_COUNT":
      return { ...state, count: state.count + 1 };
    case "VALUE":
      return { ...state, value: action.payload };
    case "DECREMENT_COUNT":
      return { ...state, count: state.count - 1 };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    default:
      return state;
  }
};

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
