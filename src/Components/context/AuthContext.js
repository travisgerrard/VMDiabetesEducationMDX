import createDataContext from './createDataContext';
// import authApi from './api';
import { useRouter } from 'next/router';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload, isLoading: false };
    case 'signin':
      return {
        ...state,
        token: action.payload,
        errorMessage: '',
        isLoading: false,
      };
    case 'disclaimer':
      return { ...state, disclaimer: true, errorMessage: '', isLoading: false };
    case 'clear_error_message':
      return { ...state, errorMessage: '', isLoading: false };
    case 'set_account_details':
      return { ...state, accountDetails: action.payload, isLoading: false };
    case 'signout':
      return { ...state, token: null, errorMessage: '', isLoading: false };
    case 'stopLoading':
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  // const token = localStorage.getItem('token');
  const disclaimer = localStorage.getItem('disclaimer');

  if (disclaimer) {
    // dispatch({ type: 'signin', payload: token });
    dispatch({ type: 'disclaimer' });

    // navigate('Main');
    // } else {
    //   navigate('Auth');
  }
  dispatch({ type: 'stopLoading' });
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: 'clear_error_message' });
};

const agreeToDisclaimer = (dispatch) => async () => {
  await localStorage.setItem('disclaimer', 'true');
  dispatch({ type: 'disclaimer' });
};

const signin = (dispatch) => async (accessCode) => {
  if (!accessCode.accessCode.length) {
    dispatch({
      type: 'add_error',
      payload: 'Acces Code Cannot Be Blank',
    });
    return;
  }

  // const network = await Network.getNetworkStateAsync();
  // if (!network.isConnected) {
  //   dispatch({
  //     type: 'add_error',
  //     payload: 'Not connected to the internet',
  //   });
  //   return;
  // }

  console.log(accessCode.accessCode);

  try {
    // const response = await authApi.post('/', accessCode);

    if (accessCode.accessCode === '12345') {
      await localStorage.setItem('token', accessCode.accessCode);
      dispatch({ type: 'signin', payload: accessCode.accessCode });
    } else {
      dispatch({
        type: 'add_error',
        payload: 'wrong access code',
      });
      return;
    }
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: err.response.data.message,
    });
    return;
  }
};

const signout = (dispatch) => async () => {
  // const router = useRouter();

  await localStorage.removeItem('token');
  dispatch({
    type: 'signout',
  });
  // if (Platform.OS === 'web') {
  //   Router.push('/');
  // } else {
  //   navigate('loginFlow');
  // }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signout,
    clearErrorMessage,
    tryLocalSignin,
    agreeToDisclaimer,
  },
  {
    token: null,
    disclaimer: null,
    errorMessage: '',
    accountDetails: null,
    isLoading: true,
  }
);
