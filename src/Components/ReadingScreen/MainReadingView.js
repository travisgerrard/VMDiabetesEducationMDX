import React, { useContext, useEffect } from 'react';
import { MDXProvider } from '@mdx-js/react';

import styled from 'styled-components';
import Link from 'next/link';
import AccessCodeScreen from '../Authorization/AccessCodeScreen';
import DisclaimerPage from '../Authorization/DisclaimerPage';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as TextContext } from '../context/TextContext';

const BodyContainer = styled.div`
  display: flex;
  background-color: white;
  justify-content: center;
`;

const NavBar = styled.div`
  position: relative;
  background-color: rgb(0, 162, 97);
  width: 100%;
  height: 64px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NavBarText = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 24px;
  font-family: Helvetica Neue, Arial, sans-serif;
  font-weight: 400;
  padding: 0px;
  margin: 0px;
  padding-left: 16px;
  padding-right: 16px;
  line-height: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NavBarButton = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 24px;
  font-family: Helvetica Neue, Arial, sans-serif;
  font-weight: 400;
  padding: 0px;
  margin: 0px;
  padding-left: 16px;
  padding-right: 16px;
  line-height: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-out;
  opacity: ${(props) => (props.grayOutButton ? 0.2 : 1)};
  &:hover {
    opacity: ${(props) => (props.grayOutButton ? 0.2 : 0.6)};
  }
  &:active {
    opacity: ${(props) => (props.grayOutButton ? 0.2 : 0.3)};
  }
`;

const TextContainer = styled.div`
  max-width: 600px;
  padding: 25px;
  /* padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 25px; */
  min-height: 100vh;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  font-family: Helvetica Neue, Arial, sans-serif;
`;

const RegularText = styled.p`
  font-size: ${(props) => props.textSize};
  font-weight: 400;
  font-family: Helvetica Neue, Arial, sans-serif;
`;

const RegularList = styled.li`
  font-size: ${(props) => props.textSize};
  font-weight: 400;
  font-family: Helvetica Neue, Arial, sans-serif;
`;

const QuoteBox = styled.div`
  background-color: lightgray;
  border-radius: 22px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  padding: 8px;
  font-size: 16px;
  font-weight: 400;
  font-family: Helvetica Neue, Arial, sans-serif;
  line-height: 1.2;
  margin-bottom: 16px;
  margin-top: 16px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin: auto;
  display: block;
`;

export default function MainReadingView({ children }) {
  console.log(children);
  const { state, tryLocalSignin } = useContext(AuthContext);
  const {
    state: textState,
    changeTextSize,
    setTextSizeOnLoad,
  } = useContext(TextContext);

  useEffect(() => {
    tryLocalSignin();
    setTextSizeOnLoad();
  }, []);

  const { textSize } = textState;
  const increaseTextSizeGrayOut = textSize === '22px';
  const decreaseTextSizeGrayOut = textSize === '16px';

  const mdComponents = {
    h1: (props) => <Header {...props} />,
    p: (props) => <RegularText textSize={textSize} {...props} />,
    li: (props) => <RegularList textSize={textSize} {...props} />,
    blockquote: (props) => <QuoteBox textSize={textSize} {...props} />,
    img: (props) => <Image {...props} />,
  };

  if (state.isLoading) return null;

  // if (state.token === null) {
  //   return <AccessCodeScreen />;
  // } else {
  if (state.disclaimer === null) {
    return <DisclaimerPage />;
  } else {
    return (
      <>
        <NavBar>
          <NavBarText>
            Aa:{' '}
            <NavBarButton
              onClick={() => changeTextSize({ textSize, isIncrease: true })}
              grayOutButton={increaseTextSizeGrayOut}
            >
              +
            </NavBarButton>{' '}
            /{' '}
            <NavBarButton
              onClick={() => changeTextSize({ textSize, isIncrease: false })}
              grayOutButton={decreaseTextSizeGrayOut}
            >
              -
            </NavBarButton>
          </NavBarText>
          <Link href="/">
            <NavBarButton style={{ cursor: 'pointer' }}>Close</NavBarButton>
          </Link>
        </NavBar>
        <BodyContainer>
          <TextContainer>
            <MDXProvider components={mdComponents}>{children}</MDXProvider>
          </TextContainer>
        </BodyContainer>
      </>
    );
  }
  // }
}
