import React, { useContext } from "react";
import { StoreContext } from "./Store";

const DarkModeSwitch = () => {
  const { state, dispatch } = useContext(StoreContext);

  const toggleDarkMode = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  };
  return (
    <div>
      <label>
        Dark Mode:
        <input
          type="checkbox"
          checked={state.darkMode}
          onChange={toggleDarkMode}
        />
      </label>
    </div>
  );
};

export default DarkModeSwitch;
