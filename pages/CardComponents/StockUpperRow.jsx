// StockUpperRow.jsx

import React from "react";
import { AiFillStar } from "react-icons/ai";
import { WiTime7 } from "react-icons/wi";
import { TbChartDots3 } from "react-icons/tb";

const StockUpperRow = ({
  x,
  list,
  user,
  addToFavorites,
  timeFrame,
  setTimeFrame,
  toggole,
  setToggole,
}) => {
  const handleAddToFavorites = () => {
    if (user) {
      addToFavorites(x);
    } else {
      toast.error(`Login To Add ${x} To Favorites`);
    }
  };

  return (
    <div className={`stockUpperRow items-center flex ${x}`}>
      <div
        className={`w-32 flex justify-center items-center h-12 hover:scale-105 ${
          !list?.includes(x) ? "text-gray-700" : "text-yellow-400"
        }`}
        onClick={handleAddToFavorites}
      >
        <AiFillStar className="w-10 h-10" />
      </div>

      <div
        className="tooltip tooltip-primary tooltip-right"
        data-tip="Click to Open in TradingView"
      >
        <a
          className="text-lg w-32 flex justify-center h-12 items-center text-blue-600 hover:text-gray-900 hover:scale-105"
          target="_blank"
        >
          {x}
        </a>
      </div>
      <div className="flex text-gray-700 space-x-2 rounded-lg h-12 justify-around w-32 items-center">
        <WiTime7
          className={`${
            timeFrame ? "" : "text-gray-50 bg-blue-500"
          } h-8 w-8 border-[1px] p-1 hover:text-gray-50 hover:bg-blue-500 hover:shadow-lg rounded-lg`}
          onClick={() => setTimeFrame(!timeFrame)}
        />
        <TbChartDots3
          className={`${
            toggole ? "text-gray-50 bg-blue-500" : ""
          } h-8 w-8 border-[1px] p-1 hover:text-gray-50 hover:bg-blue-500 hover:shadow-lg rounded-lg`}
          onClick={() => setToggole(!toggole)}
        />
      </div>
    </div>
  );
};

export default StockUpperRow;
