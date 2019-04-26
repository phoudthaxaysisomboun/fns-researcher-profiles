import axios from "axios";

import { LOGIN_USER, REGISTER_USER, GET_DEPARTMENTS, AUTH_USER, GET_USER_DETAIL, CLEAR_USER_DETAIL, LOGOUT_USER } from "./types";

import { USER_SERVER, RESEARCHER } from "../components/utils/misc";

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

export function auth(){
  const request = axios.get(`${USER_SERVER}/auth`)
  .then(response =>response.data)

  return {
    type: AUTH_USER,
    payload: request
  }
}

export function logoutUser() {
  const request = axios.get(`${USER_SERVER}/logout`)
  .then(response => response.data)

  return {
    type: LOGOUT_USER,
    payload: request
  }
}

export function getProfileDetail(id) {
  const request = axios.get(`${RESEARCHER}/profiles_by_id?id=${id}&type=single`).then(response => response.data[0])

  return {
    type: GET_USER_DETAIL,
    payload: request
  }
}

export function clearProfileDetail() {
  return {
    type: CLEAR_USER_DETAIL,
    payload: ''
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