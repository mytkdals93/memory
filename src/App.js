import Layout from "./components/Layout";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import Login from "./components/Login";
import QuestionForm from "./components/QuestionForm";
import React, { useState } from "react";

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
        <Layout setCurrentCategory = {setCurrentCategory}>
          TEST
          <p>Current User: {user.email}</p>
          <p>Current Category: {JSON.stringify(currentCategory).toString()}</p>
          <QuestionForm currentCategory = {currentCategory} />
        </Layout>
    );
  }
  return <Login />;
}
export default App;
