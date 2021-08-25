import * as actionTypes from './actions';
import axios from 'axios';

export const authStart = () => {
   return {
      type: actionTypes.AUTH_START
   }
}

export const authSuccess = (token, userId) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      idToken: token,
      userId: userId
   }
}

export const authFail = (error) => {
   return {
      type: actionTypes.AUTH_FAIL,
      error: error
   }
}

export const logout = () => {
   localStorage.removeItem('token');
   localStorage.removeItem('expirationDate');
   localStorage.removeItem('userId');
   return {
      type: actionTypes.AUTH_LOGOUT
   }
}

export const checkAuthTimeout = (expirationTime) => {
   return dispatch => {
      setTimeout(() => {
         dispatch(logout())
      }, expirationTime * 1000)
   }
}  

export const auth = (email, password, isSignUp) => {
   return dispatch => {
      dispatch(authStart())

      const authData = {
         email: email,
         password: password,
         returnSecureToken: true
      }

      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUH3dNmHzFsliF3Ktp4WFiJ5XYErzNfY0';

      if (!isSignUp) {
         url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUH3dNmHzFsliF3Ktp4WFiJ5XYErzNfY0';
      }

      axios.post(url, authData)
         .then(response => {
            console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
         })
         .catch(err => {
            console.log(err)
            dispatch(authFail(err.response.data.error))
         });
   }
}

export const setAuthRedirectPath = (path) => {
   return {
      type: actionTypes.SET_AUTH_REDIRECT_PATH,
      path: path
   }
}

export const authCheckState = () => {
   return dispatch => {
      const token = localStorage.getItem('token');
      if(!token){
         return dispatch(logout());
      }else{
         const expirationDate = new Date(localStorage.getItem('expirationDate'));
         const userId = localStorage.getItem('userId');
         if(expirationDate <= new Date()){
            dispatch(logout())
         }
         else{
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
         }
      }
   }
}