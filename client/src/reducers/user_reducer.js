import { LOGIN_USER, GET_DEPARTMENTS, REGISTER_USER, AUTH_USER, GET_USER_DETAIL, CLEAR_USER_DETAIL, LOGOUT_USER, GET_FOLLOWING, GET_FOLLOWER, FOLLOW, ADD_FOLLOWER, UNFOLLOW, REMOVE_FOLLOWER } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      case REGISTER_USER:
      return {...state, register: action.payload}
      case AUTH_USER:
      return {...state, userData: action.payload}
    case GET_DEPARTMENTS:
      return { ...state, departments: action.payload };
    case GET_USER_DETAIL:
      return { ...state, userDetail: action.payload }
    case CLEAR_USER_DETAIL:
      return { ...state, userDetail: action.payload }
    case LOGOUT_USER:
      return { ...state }
    case GET_FOLLOWING:
      return {...state, following: action.payload }
    case GET_FOLLOWER:
      return {...state, follower: action.payload }
    case FOLLOW:
      return {...state, userData: {
        ...state.userData,
        following: action.payload
      }
    }
    case ADD_FOLLOWER:
      return {...state}
    case UNFOLLOW:
      return {...state, userData: {
        ...state.userData,
        following: action.payload
      }
    }
    case REMOVE_FOLLOWER:
      return {...state}
    default:
      return state;
  }
}
