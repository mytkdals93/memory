import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import CategoryAddForm from "./CategoryAddForm";
import SplitButton from "./SplitButton";

function Category({ setCurrentCategory }) {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [categories] = useCollection(
    firebase.firestore().collection("category")
    .where("uid", "==", user.uid)
  )
  const [category, setCategory] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    db.collection("category").add({
      uid: user.uid,
      title: category,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(
      setOpen(false)
    );
  };
  return (
    <Container>
      {categories && (
        <>
          <SplitButton list=
          {categories.docs.map(doc=>({id:doc.id, ...doc.data()}))} 
          setCurrentCategory = {setCurrentCategory}
          />
        </>
      )}
      <Button variant="contained" color="primary" onClick= {()=>{setOpen(true)}}>ADD</Button>
      <CategoryAddForm 
      submitHandler={submitHandler}
      open = { open }
      handleClose = {()=>{setOpen(false)}}
      cateogry = {category}
      setCategory = {setCategory}
      />
    </Container>
  );
}

export default Category;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  > Button {
    margin: 12px;
  }
`