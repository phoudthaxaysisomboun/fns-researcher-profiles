import { LOGIN_USER, GET_DEPARTMENTS, REGISTER_USER } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      case REGISTER_USER:
      return {...state, register: action.payload}
    case GET_DEPARTMENTS:
      return { ...state, departments: action.payload };
    default:
      return state;
  }
}
