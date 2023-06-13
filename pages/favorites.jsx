import Header from "./Header";
import { doc, getDoc } from "firebase/firestore";
import Card from "./Card";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { subscribeToUserData } from "./utils";
const FavoritesPage = () => {
  const { data: session, status } = useSession();
  const user = session?.user?.email;
  const [userData, setUserData] = useState(null);
  //fetch favorites list
  useEffect(() => {
    const unsubscribe = subscribeToUserData(user, db, setUserData);

    return () => {
      unsubscribe();
    };
  }, [session, db, user, setUserData]);
  return (
    <div>
      <Header />
      {userData?.stock?.map((x, i) => (
        <Card
          x={x}
          i={i}
          user={user}
          list={userData?.stock}
          info={userData}
          comments={userData?.comments
            ?.map((item) => item.stock == x && item.info)
            .filter(Boolean)}
        />
      ))}
    </div>
  );
};

export default FavoritesPage;
