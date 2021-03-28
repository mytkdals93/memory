import React from "react";
import styled from "styled-components";
import Category from "./Category";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { auth } from "../firebase";
const Layout = ({ children,currentCategory, setCurrentCategory }) => {
  return (
    <LayoutContainer>
      <HeaderContainer>
        Header 
        <ExitToAppIcon cursor="pointer" onClick={()=>{auth.signOut()}}/>
      </HeaderContainer>
      <MainContainer>
        <Category setCurrentCategory = {setCurrentCategory} />
        {children}
      </MainContainer>

      <FooterContainer>Footer</FooterContainer>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  display: grid;
  grid-template-areas:
    "header header header"
    "main main main"
    "footer footer footer";
`;
const HeaderContainer = styled.header`
  grid-area: header;
  height: 8vh;
  background: orange;
`;
const MainContainer = styled.main`
  grid-area: main;
`;
const FooterContainer = styled.footer`
  grid-area: footer;
`;
