import React, { useContext, useEffect } from 'react';
import VerticalHalfPaginator from '../src/Components/MainScreen/VerticalHalfPaginator';
import AccessCodeScreen from '../src/Components/Authorization/AccessCodeScreen';
import DisclaimerPage from '../src/Components/Authorization/DisclaimerPage';
import { Context as AuthContext } from '../src/Components/context/AuthContext';

export default function Index() {
  const { state, tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  console.log(state.disclaimer);
  if (state.isLoading) return null;

  // if (state.token === null) {
  //   return <AccessCodeScreen />;
  // } else {
  if (state.disclaimer === null) {
    return <DisclaimerPage />;
  } else {
    return <VerticalHalfPaginator />;
  }
  // }
}
