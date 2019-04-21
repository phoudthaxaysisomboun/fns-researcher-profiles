import axios from "axios";

import { LOGIN_USER, GET_DEPARTMENTS } from "./types";

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