import React, { useContext } from "react";
import { db } from "../firebaseConfig";
import { useState, useRef, useEffect } from "react";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import StockComments from "./CardComponents/StockComments";
import Image from "next/image";
import FormComponent from "./CardComponents/FormComponent";
import CheckboxGroup from "./CardComponents/CheckedboxGroup";
import StockUpperRow from "./CardComponents/StockUpperRow";
import generateStockUrl from "./Helper";
import {
  addToFavorites,
  fetchData,
  handleCheckboxChange,
  handleSubmit,
} from "./utils";
function Card({ x, i, list, user, comments }) {
  const [inputValue, setInputValue] = useState("");
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [timeFrame, setTimeFrame] = useState(true);
  const [toggole, setToggole] = useState(false);
  const [color, setColor] = useState("");
  const inputRef = useRef(null);
  const finvizStockUrl = generateStockUrl(x, timeFrame, toggole);

  const handleChange = () => {
    setInputValue(inputRef.current.value);
  };

  const handleAddToFavorites = async () => {
    try {
      await addToFavorites(db, user, x, list, toast);
    } catch (error) {
      console.error("Error calling addToFavorites:", error);
      toast.error("An error occurred");
    }
  };

  const handleFormSubmit = async (event) => {
    await handleSubmit(
      event,
      db,
      user,
      inputValue,
      inputRef,
      x,
      comments,
      setInputValue
    );
  };
  const handleCheckboxChangeWrapper = (e) => {
    handleCheckboxChange(e, inputValue, setInputValue);
  };

  useEffect(() => {
    if (inputValue.length === 0) {
      setCheckedInputs(checkedInputs);
    }
  }, [inputValue]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  async function fetchInitialData() {
    const responseData = await fetchData("/api/data2");
    if (responseData) {
      setCheckedInputs(responseData);
    }
  }

  return (
    <div
      key={x}
      className={`stockCard ${x} py-5   space-y-4 bg-white border-[#709eff2b]  `}
    >
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className={`stockImgRow ${x} `}>
        <Image
          width={600}
          height={500}
          loading="lazy"
          key={i}
          src={finvizStockUrl}
          alt="stock"
          className="w-full"
        />
      </div>
      <div>
        <StockUpperRow
          x={x}
          list={list}
          user={user}
          addToFavorites={handleAddToFavorites}
          timeFrame={timeFrame}
          setTimeFrame={setTimeFrame}
          toggole={toggole}
          setToggole={setToggole}
        />
      </div>
      <div
        className={`flex flex-wrap  items-center  justify-center  text-[10px] md:text-[12px] space-x-1 md:space-x-3`}
      >
        <CheckboxGroup
          checkedInputs={checkedInputs}
          inputValue={inputValue}
          handleCheckboxChange={handleCheckboxChangeWrapper}
          setColor={setColor}
        />
      </div>
      <div>
        <FormComponent
          inputValue={inputValue}
          setInputValue={setInputValue}
          inputRef={inputRef}
          handleChange={handleChange}
          handleSubmit={handleFormSubmit}
          x={x}
        />
      </div>
      <div className="flex-wrap flex  space-x-1  text-[10px] md:text-[15px]  md:space-x-3 ">
        {comments &&
          comments.map((item, i) => (
            <StockComments item={item} i={i} user={user} />
          ))}
      </div>
    </div>
  );
}

export default Card;
