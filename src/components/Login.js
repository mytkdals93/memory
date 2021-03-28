import React from 'react'
import styled from 'styled-components'
import firebase from "firebase"
import { provider } from '../firebase';
const login = () => {
    firebase.auth().signInWithPopup(provider)
    .catch(error=>alert(error.message));

  };
function Login() {
    return (
        <Container>
            <button onClick={login}>LOGIN WITH GOOGLE</button>
        </Container>
    )
}

export default Login

const Container = styled.div`
min-width:100vw;
min-height:100vh;
`