import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import SplitButton from "./SplitButton";

function Category({ setCurrentCategory }) {
  const [user] = useAuthState(auth);
  const [categories] = useCollection(
    firebase.firestore().collection("category").where("uid", "==", user.uid)
  );
  const [category, setCategory] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    db.collection("category").add({
      uid: user.uid,
      title: category,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  return (
    <div>
      {categories && (
        <>
          <SplitButton list=
          {categories.docs.map(doc=>({id:doc.id, ...doc.data()}))} 
          setCurrentCategory = {setCurrentCategory}
          />

          <span>
            {categories.docs.map((doc) => (
              <React.Fragment key={doc.id}>
                {JSON.stringify(doc.data())},{" "}
                <button
                  onClick={() => {
                    setCurrentCategory({ id: doc.id, ...doc.data() });
                  }}
                >
                  Click
                </button>
              </React.Fragment>
            ))}
          </span>
        </>
      )}
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <button>추가</button>
      </form>
    </div>
  );
}

export default Category;
