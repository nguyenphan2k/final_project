import {
     LOGIN,
     LOGIN_SUCCESS,
     LOGIN_FAIL
} from '../constants/auth'

export const login = () => {
     return{
          type: 'LOGIN',
     }
}
export const loginSuccess = (payload) => {
     return {
          type: 'LOGIN_SUCCESS',
          payload,
     }
}
export const loginFail = (payload) => {
     return {
          type: 'LOGIN_FAIL',
          payload,
     }
}