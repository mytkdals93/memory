import React, { useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";

function CategoryForm({ user }) {
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

export default CategoryForm;
