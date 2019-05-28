import axios from "axios";

import {
  LOGIN_USER,
  REGISTER_USER,
  GET_DEPARTMENTS,
  AUTH_USER,
  GET_USER_DETAIL,
  CLEAR_USER_DETAIL,
  LOGOUT_USER,
  GET_FOLLOWING,
  GET_FOLLOWER,
  FOLLOW,
  ADD_FOLLOWER,
  UNFOLLOW,
  REMOVE_FOLLOWER,
  CLEAR_FOLLOWING,
  CLEAR_FOLLOWER,
  GET_FOLLOWER_IN_LOAD_MORE,
  GET_FOLLOWING_IN_LOAD_MORE,
  UPDATE_USER_MOBILE,
  UPDATE_USER_PHONE,
  UPDATE_USER_FAX,
  UPDATE_USER_WEBSITE,
  UPDATE_USER_GENDER,
  UPDATE_USER_ADDRESS,
  UPDATE_USER_FACEBOOK,
  UPDATE_USER_DATE_OF_BIRTH,
  UPDATE_USER_PLACE_OF_BIRTH,
  UPDATE_USER_NATIONALITY,
  UPDATE_USER_MINOR_ETHNICITY
} from "./types";

import { USER_SERVER, RESEARCHER_SERVER } from "../components/utils/misc";

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data)
    .catch(error => {
      console.log(error.response);
    });

  return {
    type: LOGIN_USER,
    payload: request
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/pre-register`, dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request
  };
}

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then(response => response.data);

  return {
    type: AUTH_USER,
    payload: request
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then(response => response.data);

  return {
    type: LOGOUT_USER,
    payload: request
  };
}

export function getProfileDetail(id) {
  const request = axios
    .get(`${RESEARCHER_SERVER}/profiles_by_id?id=${id}&type=single`)
    .then(response => response.data[0]);

  return {
    type: GET_USER_DETAIL,
    payload: request
  };
}

export function clearProfileDetail() {
  return {
    type: CLEAR_USER_DETAIL,
    payload: ""
  };
}

export function clearFollowing() {
  return {
    type: CLEAR_FOLLOWING,
    payload: ""
  };
}

export function clearFollower() {
  return {
    type: CLEAR_FOLLOWER,
    payload: ""
  };
}

export function getFollowing(id, limit, skip) {
  const request = axios
    .get(
      `${RESEARCHER_SERVER}/followings?id=${id}&type=array&sortBy=name&order=asc&limit=${limit}&skip=${skip}`
    )
    .then(response => response.data);

  return {
    type: GET_FOLLOWING,
    payload: request
  };
}

export function getFollower(id, limit, skip) {
  const request = axios
    .get(
      `${RESEARCHER_SERVER}/followers?id=${id}&type=array&sortBy=name&order=asc&limit=${limit}&skip=${skip}`
    )
    .then(response => response.data);

  return {
    type: GET_FOLLOWER,
    payload: request
  };
}

export function getFollowingInLoadMore(id, limit, skip, previousState = []) {
  const request = axios
    .get(
      `${RESEARCHER_SERVER}/followings?id=${id}&type=array&sortBy=name&order=asc&limit=${limit}&skip=${skip}`
    )
    .then(response => {
      let newState = [...previousState, ...response.data];

      return {
        data: newState
      };
    });

  return {
    type: GET_FOLLOWING_IN_LOAD_MORE,
    payload: request
  };
}

export function getFollowerInLoadMore(id, limit, skip, previousState = []) {
  const request = axios
    .get(
      `${RESEARCHER_SERVER}/followers?id=${id}&type=array&sortBy=name&order=asc&limit=${limit}&skip=${skip}`
    )
    .then(response => {
      let newState = [...previousState, ...response.data];

      return {
        data: newState
      };
    });

  return {
    type: GET_FOLLOWER_IN_LOAD_MORE,
    payload: request
  };
}

export function follow(_id) {
  const request = axios
    .post(`${RESEARCHER_SERVER}/follow?userId=${_id}`)
    .then(response => response.data);

  return {
    type: FOLLOW,
    payload: request
  };
}

export function addFollower(_id) {
  const request = axios
    .post(`${RESEARCHER_SERVER}/addFollower?userId=${_id}`)
    .then(response => response.data);

  return {
    type: ADD_FOLLOWER,
    payload: request
  };
}

export function unfollow(_id) {
  const request = axios
    .post(`${RESEARCHER_SERVER}/unfollow?userId=${_id}`)
    .then(response => response.data);

  return {
    type: UNFOLLOW,
    payload: request
  };
}

export function removeFollower(_id) {
  const request = axios
    .post(`${RESEARCHER_SERVER}/removeFollower?userId=${_id}`)
    .then(response => response.data);

  return {
    type: REMOVE_FOLLOWER,
    payload: request
  };
}

//====================================
//             AFFILIATION
//====================================

export function getDepartments() {
  const request = axios
    .get(`${USER_SERVER}/departments`)
    .then(response => response.data);

  return {
    type: GET_DEPARTMENTS,
    payload: request
  };
}

export function updateMobile(_id, mobile) {
  const request = axios
    .post(`${RESEARCHER_SERVER}/update_mobile?userId=${_id}&mobile=${mobile}`)
    .then(response => response.data);

  return {
    type: UPDATE_USER_MOBILE,
    payload: request
  };
}

export function updatePhone(_id, phone) {
  const request = axios
    .post(`${RESEARCHER_SERVER}/update_phone?userId=${_id}&phone=${phone}`)
    .then(response => response.data);

  return {
    type: UPDATE_USER_PHONE,
    payload: request
  };
}

export function updateFax(_id, fax) {
  const request = axios
    .post(`${RESEARCHER_SERVER}/update_fax?userId=${_id}&fax=${fax}`)
    .then(response => response.data);

  return {
    type: UPDATE_USER_FAX,
    payload: request
  };
}

export function updateWebsite(_id, website) {
  const request = axios
    .post(
      `${RESEARCHER_SERVER}/update_website?userId=${_id}&website=${website}`
    )
    .then(response => response.data);

  return {
    type: UPDATE_USER_WEBSITE,
    payload: request
  };
}

export function updateGender(_id, gender) {
  const request = axios
    .post(
      `${RESEARCHER_SERVER}/update_gender?userId=${_id}&gender=${gender}`
    )
    .then(response => response.data);

  return {
    type: UPDATE_USER_GENDER,
    payload: request
  };
}

export function updateAddress(_id, village, district, province) {
  const request = axios
    .post(
      `${RESEARCHER_SERVER}/update_address?userId=${_id}&village=${village}&district=${district}&province=${province}`
    )
    .then(response => response.data);

  return {
    type: UPDATE_USER_ADDRESS,
    payload: request
  };
}

export function updateFacebook(_id, name, url) {
  const request = axios
    .post(
      `${RESEARCHER_SERVER}/update_facebook?userId=${_id}&name=${name}&url=${url}`
    )
    .then(response => response.data);

  return {
    type: UPDATE_USER_FACEBOOK,
    payload: request
  };
}

export function updateDateOfBirth(_id, dateOfBirth) {
  const request = axios
    .post(
      `${RESEARCHER_SERVER}/update_date_of_birth?userId=${_id}&dateOfBirth=${dateOfBirth}`
    )
    .then(response => response.data);

  return {
    type: UPDATE_USER_DATE_OF_BIRTH,
    payload: request
  };
}

export function updatePlaceOfBirth(_id, village, district, province, country) {
  const request = axios
    .post(
      `${RESEARCHER_SERVER}/update_place_of_birth?userId=${_id}&village=${village}&district=${district}&province=${province}&country=${country}`
    )
    .then(response => response.data);

  return {
    type: UPDATE_USER_PLACE_OF_BIRTH,
    payload: request
  };

}
export function updateNationality(_id, nationality) {
  console.log(`${RESEARCHER_SERVER}/update_nationality?userId=${_id}&nationality=${nationality}`)
  const request = axios
    .post(
      `${RESEARCHER_SERVER}/update_nationality?userId=${_id}&nationality=${nationality}`
    )
    .then(response => response.data);

  return {
    type: UPDATE_USER_NATIONALITY,
    payload: request
  };
}

export function updateMinorEthnicity(_id, minor_ethnicity) {
  console.log(`${RESEARCHER_SERVER}/update_minor_ethnicity?userId=${_id}&minor_ethnicity=${minor_ethnicity}`)
  const request = axios
    .post(
      `${RESEARCHER_SERVER}/update_minor_ethnicity?userId=${_id}&minor_ethnicity=${minor_ethnicity}`
    )
    .then(response => response.data);

  return {
    type: UPDATE_USER_MINOR_ETHNICITY,
    payload: request
  };
}