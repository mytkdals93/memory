import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

function Form({currentCategory}) {
  const [user] = useAuthState(firebase.auth());
  // const [categories] = useCollection(
  //   firebase.firestore().collection("category").where("uid", "==", user.uid)
  // );
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  function fileUpload(){
    const storageRef = firebase.storage().ref();
    let imagePromise;
    let filePromise;
    if (imageFile) {
      imagePromise = storageRef
        .child(new Date().getTime() + `.${imageFile.name.split(".")[1]}`)
        .put(imageFile);
    }
    if (audioFile) {
      filePromise = storageRef
        .child(new Date().getTime() + `.${audioFile.name.split(".")[1]}`)
        .put(audioFile);
    }
    const upload = Promise.all([imagePromise, filePromise]).then((data) => {
      const result = [
        data[0] ? data[0].ref.getDownloadURL() : null,
        data[1] ? data[1].ref.getDownloadURL() : null,
      ];
      return Promise.all(result);
    });
    return upload
  }
  
  const submitHandler = (e) => {
      e.preventDefault();
        fileUpload().then((data) => {
        db.collection("question")
        .add({
          categoryId: currentCategory.id,
          uid: user.uid,
          question,
          answer,
          imageUrl:data[0],
          audioUrl:data[1],
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          lastTestAt: null,
          nextTextAt: null,
          count: 0,
          cycle: null,
        });
    });
  };
  if (!user) {
    return <div>!</div>;
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        <input
          type="text"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
        <input
          type="file"
          onChange={(e) => {
            setAudioFile(e.target.files[0]);
          }}
        />
        <input
          type="file"
          onChange={(e) => {
            setImageFile(e.target.files[0]);
          }}
        />
        <button>등록</button>
      </form>
    </div>
  );
}

export default Form;
