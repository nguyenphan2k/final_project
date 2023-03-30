import React from 'react'
import {
     LOGIN,
     LOGIN_FAIL,
     LOGIN_SUCCESS,
     LOGOUT,
     LOGOUT_FAIL,
     LOGOUT_SUCCESS,
} from '../constants/auth'

const initState = {
     isLoading: false,
     accessToken: "",
     userId: "",
     err: false,
}
export default function authReducer(state = initState, action) {
     switch (action.type) {
          case LOGIN:
               return {
                    ...state,
                    isLoading: true
               }
          case LOGIN_SUCCESS:
               return {
                    ...state,
                    isLoading: false,
                    err: false,
                    accessToken: action.payload.accessToken,
                    userId: action.payload.userId,
               }
          case LOGIN_FAIL:
               return {
                    ...state,
                    isLoading: false,
                    accessToken: action.payload,
                    userId: "",
                    err: true,
                    isAdmin: false,
               }
          default:
               return state
     }
}