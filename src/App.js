import React, { useState } from "react";
import Layout from "./components/Layout";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import Login from "./components/Login";
import Question from "./components/Question";

export const CategoryContext = React.createContext("");
function App() {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [currentCategory, setCurrentCategory] = useState(null)
  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
        <Layout 
        currentCategory = {currentCategory}
        setCurrentCategory = {setCurrentCategory}>
          TEST
          <p>Current User: {user.email}</p>
          <p>Current Category: {JSON.stringify(currentCategory).toString()}</p>
          {currentCategory ?
          <Question currentCategory = {currentCategory} /> 
          : <div>{"카테고리를 선택해주세요."}</div>
          }
        </Layout>
    );
  }
  return <Login />;
}
export default App;
