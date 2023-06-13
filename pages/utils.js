import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { updateDoc, arrayRemove } from "firebase/firestore";

// Function to subscribe to user data changes
export const subscribeToUserData = (user, db, setInfo) => {
  return onSnapshot(doc(db, "users", `${user}`), (doc) => {
    setInfo(doc.data());
  });
};

// Function to filter data based on search input
export const filterData = (data, search, setFilteredItems) => {
  const filtered = data
    .filter((item, index) => data.indexOf(item) === index)
    .filter((item) => item.toLowerCase().startsWith(search.toLowerCase()));
  setFilteredItems(filtered);
};
// Function to Fetch data from local API
export async function fetchData(path) {
  try {
    const response = await fetch(path);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
//add stock to favorites list
export const addToFavorites = async (db, user, x, list, toast) => {
  try {
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(doc(db, "users", user), {
        stock: arrayUnion(x),
      });

      if (list?.includes(x)) {
        await updateDoc(doc(db, "users", user), {
          stock: arrayRemove(x),
        });
      }
    } else {
      await setDoc(doc(db, "users", user), {
        stock: arrayUnion(x),
      });
    }

    const message = !list?.includes(x) ? `${x} Added` : `${x} Removed`;
    toast.success(message);
  } catch (error) {
    console.error("Error adding to favorites:", error);
    toast.error("An error occurred");
  }
};
//add comment to a stock
export const handleSubmit = async (
  event,
  db,
  user,
  inputValue,
  inputRef,
  x,
  setComments,
  setInputValue
) => {
  event.preventDefault();

  if (inputValue.length === 0) {
    inputRef.current.focus();
    return;
  }

  const comment = {
    info: inputValue,
    stock: x,
  };

  try {
    const userRef = doc(db, "users", user);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      await updateDoc(userRef, {
        comments: arrayUnion(comment),
      });
    } else {
      await setDoc(userRef, {
        comments: [comment],
      });
    }

    console.log("Comment added successfully");
    setInputValue("");
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};
//handles to function of inputs to regestir to comment
export const handleCheckboxChange = (e, inputValue, setInputValue) => {
  const { value, checked } = e.target;

  if (!inputValue.includes(value)) {
    setInputValue([...inputValue, value]);
  } else {
    setInputValue(inputValue.filter((item) => item !== value));
  }

  e.target.checked = false;
};
