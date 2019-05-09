import axios from "axios";

import { LOGIN_USER, REGISTER_USER, GET_DEPARTMENTS, AUTH_USER, GET_USER_DETAIL, CLEAR_USER_DETAIL, LOGOUT_USER, GET_FOLLOWING, GET_FOLLOWER, FOLLOW, ADD_FOLLOWER, UNFOLLOW, REMOVE_FOLLOWER, CLEAR_FOLLOWING, CLEAR_FOLLOWER, GET_FOLLOWER_IN_LOAD_MORE, GET_FOLLOWING_IN_LOAD_MORE } from "./types";

import { USER_SERVER, RESEARCHER } from "../components/utils/misc";

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data)
    .catch(error => {
      console.log(error.response)
  })

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

export function clearFollowing() {
  return {
    type: CLEAR_FOLLOWING,
    payload: ''
  }
}

export function clearFollower() {
  return {
    type: CLEAR_FOLLOWER,
    payload: ''
  }
}

export function getFollowing(id, limit, skip) {
  const request = axios.get(`${RESEARCHER}/followings?id=${id}&type=array&sortBy=name&order=asc&limit=${limit}&skip=${skip}`).then(response => response.data)

  return {
    type: GET_FOLLOWING,
    payload: request
  }
}

export function getFollower(id, limit, skip) {
  const request = axios.get(`${RESEARCHER}/followers?id=${id}&type=array&sortBy=name&order=asc&limit=${limit}&skip=${skip}`).then(response => response.data)

  return {
    type: GET_FOLLOWER,
    payload: request
  }
}

export function getFollowingInLoadMore(id, limit, skip, previousState = []) {
  const request = axios.get(`${RESEARCHER}/followings?id=${id}&type=array&sortBy=name&order=asc&limit=${limit}&skip=${skip}`).then(response => {
    let newState = [
      ...previousState,
      ...response.data
    ]

    return {
      data: newState
    }
  })

  return {
    type: GET_FOLLOWING_IN_LOAD_MORE,
    payload: request
  }
}


export function getFollowerInLoadMore(id, limit, skip, previousState = []) {
  
  const request = axios.get(`${RESEARCHER}/followers?id=${id}&type=array&sortBy=name&order=asc&limit=${limit}&skip=${skip}`).then(response => {
    let newState = [
      ...previousState,
      ...response.data
    ]
    
    return {
      data: newState
    }
  })

  return {
    type: GET_FOLLOWER_IN_LOAD_MORE,
    payload: request
  }
}

export function follow(_id) {
  
  const request = axios.post(`${RESEARCHER}/follow?userId=${_id}`).
  then(response => response.data)

  return {
    type: FOLLOW,
    payload: request
  }
}

export function addFollower(_id) {
  
  const request = axios.post(`${RESEARCHER}/addFollower?userId=${_id}`).
  then(response => response.data)

  return {
    type: ADD_FOLLOWER,
    payload: request
  }
}

export function unfollow(_id) {
  
  const request = axios.post(`${RESEARCHER}/unfollow?userId=${_id}`).
  then(response => response.data)

  return {
    type: UNFOLLOW,
    payload: request
  }
}

export function removeFollower(_id) {
  
  const request = axios.post(`${RESEARCHER}/removeFollower?userId=${_id}`).
  then(response => response.data)

  return {
    type: REMOVE_FOLLOWER,
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