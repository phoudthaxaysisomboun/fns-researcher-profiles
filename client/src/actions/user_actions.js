import axios from "axios";

import { LOGIN_USER, REGISTER_USER, GET_DEPARTMENTS } from "./types";

import { USER_SERVER } from "../components/utils/misc";

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request
  };
}


export function registerUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/pre-register`, dataToSubmit).then(response => response.data)

  return {
    type: REGISTER_USER,
    payload: request
  }
}

//====================================
//             AFFILIATION
//====================================

export function getDepartments () {
  const request = axios.get(`${USER_SERVER}/departments`).then(response => response.data)

  return {
    type: GET_DEPARTMENTS,
    payload: request
  }
}