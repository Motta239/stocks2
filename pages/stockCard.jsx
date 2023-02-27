import React from "react";
import { db } from "../firebaseConfig";
import { useState, useRef } from "react";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { AiFillStar } from "react-icons/ai";
import { BsFillEraserFill } from "react-icons/bs";
BsFillEraserFill;
function stockCard({ x, i, frame, list, user, comments }) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const [toggole, setToggole] = useState(false);
  const tradingViewURL = `https://www.tradingview.com/chart/oMvKxzcu/?symbol=${x}`;
  const finvizStockUrl = `https://charts2-node.finviz.com/chart.ashx?cs=l&t=${x}&tf=${
    frame ? "d" : "w"
  }&s=linear&ct=candle_stick${
    toggole
      ? "&o[0][ot]=sma&o[0][op]=50&o[0][oc]=FF8F33C6&o[1][ot]=sma&o[1][op]=200&o[1][oc]=DCB3326D&o[2][ot]=sma&o[2][op]=20&o[2][oc]=DC32B363&o[3][ot]=patterns&o[3][op]=&o[3][oc]=000"
      : ""
  }`;
  const checkedInputs = [
    " Long ",
    " Short ",
    " Double Top ",
    " Fib ",
    " Upside Break ",
    " Downside Break ",
    " Double Bottom ",
    " Bear Flag ",
    " Bullish Flag ",
  ];
  const handleChange = () => {
    setInputValue(inputRef.current.value);
  };
  const addToFavorites = async () => {
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);
    console.log("object");
    if (docSnap.exists()) {
      await updateDoc(doc(db, "users", `${user}`), {
        stock: arrayUnion(x),
      });
      list?.includes(x) &&
        (await updateDoc(doc(db, "users", user), {
          stock: arrayRemove(x),
        }));
    } else {
      await setDoc(doc(db, "users", `${user}`), {
        stock: arrayUnion(x),
      });
    }
  };
  const handleSubmit = async (event) => {
    const docRef = doc(db, "users", user);
    event.preventDefault();
    const docSnap = await getDoc(docRef);
    console.log("object");
    if (docSnap.exists()) {
      inputValue.length == 0
        ? inputRef.current.focus()
        : await updateDoc(doc(db, "users", user), {
            comments: arrayUnion({
              info: inputValue,
              stock: x,
              createdAt: Timestamp.now(),
            }),
          });
      setInputValue("");
    } else {
      await setDoc(doc(db, "users", user), {
        comments: arrayUnion({
          info: inputValue,
          stock: x,
          createdAt: Timestamp.now(),
        }),
      });
    }
  };
  function handleCheckboxChange(e) {
    const { value, checked } = e.target;
    checked && setInputValue([...inputValue, value]);
    e.target.checked = 0;
  }
  console.log(comments);
  return (
    <div key={i} className={`stockCard ${x} `}>
      <div className={`stockImgRow ${x} `}>
        <div className={`stockUpperRow ${x} `}>
          <div
            className={` hover:scale-105 ${
              !list?.includes(x) ? "text-black" : "text-yellow-400"
            }  `}
            onClick={() => addToFavorites(x)}
          >
            <AiFillStar className={`w-10 h-10`} />
          </div>

          <a
            className="text-gray-400 text-md items-center flex justify-center  hover:text-gray-900 hover:scale-105 "
            href={tradingViewURL}
            target="_blank"
          >
            {x}
          </a>

          <label className=" ">
            <input
              checked={toggole}
              type="checkbox"
              value="Add Technicals"
              onChange={() => setToggole(!toggole)}
            />
            Add Technicals
          </label>
        </div>

        <img className="w-full " key={i} src={finvizStockUrl} alt="A picture" />
      </div>
      <div
        className={`flex flex-wrap items-center mt-4 justify-center text-[10px] md:text-[15px] space-x-1 md:space-x-3`}
      >
        {checkedInputs.map((item) => (
          <label className="cbtn">
            <input
              type="checkbox"
              value={item}
              onChange={handleCheckboxChange}
            />
            {item}
          </label>
        ))}
      </div>
      {
        <form
          className="flex m-6 items-center  justify-center space-x-2"
          onSubmit={handleSubmit}
        >
          {inputValue.length > 0 && (
            <BsFillEraserFill
              onClick={() => setInputValue("")}
              className={`w-6 h-6 text-blue-500 hover:text-red-500 transition-all ease-in duration-300 `}
            />
          )}
          <input
            className=" border-2 px-2  shadow-2xl h-10  w-1/2 rounded-3xl focus:border-blue-500  "
            type="text"
            ref={inputRef}
            onChange={handleChange}
            value={inputValue}
            placeholder={`Write Comments About ${x}`}
          />
          <button
            className=" rounded-full px-3  border hover:bg-blue-500 hover:text-white  bg-white text-blue-500"
            type="submit"
          >
            Send
          </button>
        </form>
      }
      <div className="flex-wrap flex m-3 justify-center text-[10px] md:text-[15px]  md:space-x-3 ">
        {comments &&
          comments.map((item) => <div className="comment">{item}</div>)}
      </div>
    </div>
  );
}

export default stockCard;
