import React from 'react'
import QuestionButtons from "./QuestionButtons";
import styled from "styled-components";
const Question = ({currentCategory}) => {
    return (
        <Container>
            <div className="btnContainer">
            <QuestionButtons/>
            </div>
        </Container>
    )
}

export default Question

const Container = styled.div`
    position:relative;
    width:100%;
    min-height:600px;
    .btnContainer{
        position:absolute;
        bottom: 20px;
        right: 40px;
    }
`