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
  UPDATE_USER_MINOR_ETHNICITY,
  GET_PROVINCE,
  GET_DISTRICT,
  GET_COUNTRY,
  ADD_EDUCATION,
  UPDATE_EDUCATION,
  REMOVE_EDUCATION,
  GET_PROFILE_RESEARCH_COUNT,
  SEARCH_PROFILES,
  CLEAR_SEARCH_PROFILES,
  LIKE,
  UNLIKE,
  CLEAR_LIKES_USER,
  GET_ALL_RESEARCHERS,
  CLEAR_ALL_RESEARCHERS,
  REMOVE_RESEARCHERS,
  GET_DEGRESS,
  GET_REQUEST_USER,
  CONFIRM_USER,
  DELETE_USER,
  GET_REQUEST_USER_COUNT,
  CANCEL_USER,
  GET_OUTSTANDING_RESEARCHER,
  GET_NEW_RESEARCHER,
  ADD_OUTSTANDING_RESEARCHER,
  REMOVE_OUTSTANDING_RESEARCHER,
  ADD_NEW_RESEARCHER,
  REMOVE_NEW_RESEARCHER,
  GET_NOT_OUTSTANDING_RESEARCHER,
  GET_NOT_NEW_RESEARCHER,
  GET_ALL_RESEARCHERS_REPORTS,
  CLEAR_ALL_RESEARCHERS_REPORTS,
  GET_ALL_RESEARCHERS_LISTS_REPORTS,
  CLEAR_ALL_RESEARCHERS_LISTS_REPORTS,
  GET_OUTSTANDING_REPORTS,
  GET_NEWCOMER_REPORTS,
  UPDATE_PROFILE_DESCRIPTION,
  GET_RESEARCH_AREA,
  UPDATE_RESEARCHER_RESEARCH_AREA,
  GET_AUTHOR_SUGGESTIONS,
  ADD_NEW_RESEARCH,
  GET_COMMENTS,
  UPDATE_NAME,
  UPDATE_DEGREE,
  UPDATE_AFFILIATION
} from "./types";

import {
  USER_SERVER,
  RESEARCHER_SERVER,
  RESEARCHER_PROFILES_SERVER,
  RESEARCH_SERVER
} from "../components/utils/misc";

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

export function getDegrees() {
  const request = axios
    .get(`${USER_SERVER}/degrees`)
    .then(response => response.data);

  return {
    type: GET_DEGRESS,
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

export function updateProfileDescription(_id, profileDescription) {
  const request = axios
    .post(`${RESEARCHER_SERVER}/update_introduction?userId=${_id}&profileDescription=${profileDescription}`)
    .then(response => response.data);

  return {
    type: UPDATE_PROFILE_DESCRIPTION,
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
    .post(`${RESEARCHER_SERVER}/update_gender?userId=${_id}&gender=${gender}`)
    .then(response => response.data);

  return {
    type: UPDATE_USER_GENDER,
    payload: request
  };
}

export function updateAddress(_id, village, district, province) {
  console.log(
    `${RESEARCHER_SERVER}/update_address?userId=${_id}&village=${village}&district=${district}&province=${province}`
  );
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
export function addEducation(
  userId,
  institution,
  fieldOfStudy,
  degree,
  start,
  end,
  city,
  country
) {
  const request = axios
    .post(
      `${RESEARCHER_SERVER}/addEducation?userId=${userId}&institution=${institution}&fieldOfStudy=${fieldOfStudy}&degree=${degree}&start=${start}&end=${end}&city=${city}&country=${country}`
    )
    .then(response => response.data);

  return {
    type: ADD_EDUCATION,
    payload: request
  };
}

export function editEducation(
  userId,
  institution,
  fieldOfStudy,
  degree,
  start,
  end,
  city,
  country,
  id
) {
  const request = axios
    .post(
      `${RESEARCHER_SERVER}/updateEducation?userId=${userId}&institution=${institution}&fieldOfStudy=${fieldOfStudy}&degree=${degree}&start=${start}&end=${end}&city=${city}&country=${country}&id=${id}`
    )
    .then(response => response.data);

  return {
    type: UPDATE_EDUCATION,
    payload: request
  };
}

export function removeEducation(userId, id) {
  const request = axios
    .post(`${RESEARCHER_SERVER}/removeEducation?userId=${userId}&id=${id}`)
    .then(response => response.data);
  console.log(`${RESEARCHER_SERVER}/removeEducation?userId=${userId}&id=${id}`);
  return {
    type: REMOVE_EDUCATION,
    payload: request
  };
}

export function updateNationality(_id, nationality) {
  //console.log(`${RESEARCHER_SERVER}/update_nationality?userId=${_id}&nationality=${nationality}`)
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

export function updateName(dataToSubmit) {
  const request = axios
    .post(
      `${RESEARCHER_SERVER}/update_name`, dataToSubmit
    )
    .then(response => response.data);

  return {
    type: UPDATE_NAME,
    payload: request
  };
}

export function updateAffiliation(dataToSubmit) {
  const request = axios
    .post(
      `${RESEARCHER_SERVER}/update_affiliation`, dataToSubmit
    )
    .then(response => response.data);

  return {
    type: UPDATE_AFFILIATION,
    payload: request
  };
}

export function updateDegree(dataToSubmit) {
  const request = axios
    .post(
      `${RESEARCHER_SERVER}/update_degree`, dataToSubmit
    )
    .then(response => response.data);

  return {
    type: UPDATE_DEGREE,
    payload: request
  };
}

export function getProvince() {
  console.log(`${USER_SERVER}/provinces`);
  const request = axios
    .get(`${USER_SERVER}/provinces`)
    .then(response => response.data);

  return {
    type: GET_PROVINCE,
    payload: request
  };
}

export function getDistrict(provinceId) {
  console.log(`${USER_SERVER}/districts_by_province?province=${provinceId}`);
  const request = axios
    .get(`${USER_SERVER}/districts_by_province?province=${provinceId}`)
    .then(response => response.data);

  return {
    type: GET_DISTRICT,
    payload: request
  };
}

export function getCountry() {
  const request = axios
    .get(`${USER_SERVER}/countries`)
    .then(response => response.data);

  console.log(`${USER_SERVER}/countries`);

  return {
    type: GET_COUNTRY,
    payload: request
  };
}

export function getProfileAndResearchCount() {
  const request = axios
    .get(`${RESEARCHER_PROFILES_SERVER}/count`)
    .then(response => response.data);
  return {
    type: GET_PROFILE_RESEARCH_COUNT,
    payload: request
  };
}

export function searchProfiles(search) {
  const request = axios
    .post(`${RESEARCHER_SERVER}/search?search=${search}`)
    .then(response => response.data);
  return {
    type: SEARCH_PROFILES,
    payload: request
  };
}

export function clearSearchProfiles() {
  return {
    type: CLEAR_SEARCH_PROFILES,
    payload: ""
  };
}

export function like(_id) {
  console.log(`${RESEARCHER_SERVER}/like?researchId=${_id}`);
  const request = axios
    .post(`${RESEARCHER_SERVER}/like?researchId=${_id}`)
    .then(response => response.data);

  return {
    type: LIKE,
    payload: request
  };
}

export function unlike(_id) {
  console.log(`${RESEARCHER_SERVER}/unlike?researchId=${_id}`);
  const request = axios
    .post(`${RESEARCHER_SERVER}/unlike?researchId=${_id}`)
    .then(response => response.data);

  return {
    type: UNLIKE,
    payload: request
  };
}

export function clearLike() {
  return {
    type: CLEAR_LIKES_USER,
    payload: ""
  };
}

export function getAllResearchers() {
  const request = axios
    .post(`${RESEARCHER_SERVER}/researchers`)
    .then(response => response.data);

  return {
    type: GET_ALL_RESEARCHERS,
    payload: request
  };
}

export function getRequestUser() {
  const request = axios
    .post(`${USER_SERVER}/register_requests`)
    .then(response => response.data);
  console.log(request);
  return {
    type: GET_REQUEST_USER,
    payload: request
  };
}

export function getOutstandingResearcher() {
  const request = axios
    .get(`${RESEARCHER_SERVER}/outstanding_researchers`)
    .then(response => response.data);
  console.log(request);
  return {
    type: GET_OUTSTANDING_RESEARCHER,
    payload: request
  };
}
export function getNotOutstandingResearcher() {
  const request = axios
    .get(`${RESEARCHER_SERVER}/not_outstanding_researchers`)
    .then(response => response.data);
  console.log(request);
  return {
    type: GET_NOT_OUTSTANDING_RESEARCHER,
    payload: request
  };
}
export function getNotNewResearcher() {
  const request = axios
    .get(`${RESEARCHER_SERVER}/not_new_researchers`)
    .then(response => response.data);
  console.log(request);
  return {
    type: GET_NOT_NEW_RESEARCHER,
    payload: request
  };
}

export function getNewResearcher() {
  const request = axios
    .get(`${RESEARCHER_SERVER}/new_researchers`)
    .then(response => response.data);
  console.log(request);
  return {
    type: GET_NEW_RESEARCHER,
    payload: request
  };
}

export function getRequestUserCount() {
  const request = axios
    .get(`${USER_SERVER}/register_requests_count`)
    .then(response => response.data);
  return {
    type: GET_REQUEST_USER_COUNT,
    payload: request
  };
}

export function getAllResearchersReports(department, from, to) {

  const request = axios
    .post(
      `${RESEARCHER_SERVER}/reports/all_researchers?department=${department}&from=${from}&to=${to}`
    )
    .then(response => response.data);
  return {
    type: GET_ALL_RESEARCHERS_REPORTS,
    payload: request
  };
}

export function getAllResearchersListsReports(sortBy, order, department, from, to) {

  const request = axios
    .post(
      `${RESEARCHER_SERVER}/reports/all_researchers_lists?sortBy=${sortBy}&order=${order}&department=${department}&from=${from}&to=${to}`
    )
    .then(response => response.data);
  return {
    type: GET_ALL_RESEARCHERS_LISTS_REPORTS,
    payload: request
  };
}


export function getOutstandingReports(sortBy, order, department, from, to) {

  const request = axios
    .post(
      `${RESEARCHER_SERVER}/reports/outstanding?sortBy=${sortBy}&order=${order}&department=${department}&from=${from}&to=${to}`
    )
    .then(response => response.data);
  return {
    type: GET_OUTSTANDING_REPORTS,
    payload: request
  };
}

export function getNewResearcherReports(sortBy, order, department, from, to) {

  const request = axios
    .post(
      `${RESEARCHER_SERVER}/reports/new_researcher`
    )
    // .post(
    //   `${RESEARCHER_SERVER}/reports/new_researcher?sortBy=${sortBy}&order=${order}&department=${department}&from=${from}&to=${to}`
    // )
    .then(response => response.data);
  return {
    type: GET_NEWCOMER_REPORTS,
    payload: request
  };
}

export function clearAllResearchersListsReports() {
  return {
    type: CLEAR_ALL_RESEARCHERS_LISTS_REPORTS,
    payload: ""
  };
}

export function clearAllResearchersReports() {
  return {
    type: CLEAR_ALL_RESEARCHERS_REPORTS,
    payload: ""
  };
}
export function confirmUser(id) {
  const request = axios
    .post(`${USER_SERVER}/accept_registers?id=${id}`)
    .then(response => response.data);
  return {
    type: CONFIRM_USER,
    payload: request
  };
}

export function removeUser(id) {
  const request = axios
    .post(`${USER_SERVER}/remove_users?id=${id}`)
    .then(response => response.data);
  return {
    type: DELETE_USER,
    payload: request
  };
}

export function addNewcomerResearcher(id, date, description) {
  const request = axios
    .post(
      `${RESEARCHER_SERVER}/add_new_researchers?id=${id}&date=${date}&description=${description}`
    )
    .then(response => response.data);
  return {
    type: ADD_NEW_RESEARCHER,
    payload: request
  };
}

export function addOutstandingResearcher(id, date, description) {
  const request = axios
    .post(
      `${RESEARCHER_SERVER}/add_outstanding_researchers?id=${id}&date=${date}&description=${description}`
    )
    .then(response => response.data);
  return {
    type: ADD_OUTSTANDING_RESEARCHER,
    payload: request
  };
}

export function removeOutstandingResearcher(id) {
  const request = axios
    .post(`${RESEARCHER_SERVER}/remove_outstanding_researchers?id=${id}`)
    .then(response => response.data);
  return {
    type: REMOVE_OUTSTANDING_RESEARCHER,
    payload: request
  };
}
export function removeNewcomerResearcher(id) {
  const request = axios
    .post(`${RESEARCHER_SERVER}/remove_new_researchers?id=${id}`)
    .then(response => response.data);
  return {
    type: REMOVE_NEW_RESEARCHER,
    payload: request
  };
}

export function clearAllResearchers() {
  return {
    type: CLEAR_ALL_RESEARCHERS,
    payload: ""
  };
}

export function removeResearchers(id) {
  // console.log(`${RESEARCHER_SERVER}/like?researchId=${_id}`)
  const request = axios
    .post(`${RESEARCHER_SERVER}/remove_researchers?id=${id}`)
    .then(response => response.data);

  return {
    type: REMOVE_RESEARCHERS,
    payload: request
  };
}

export function cancelUsers(id) {
  // console.log(`${RESEARCHER_SERVER}/like?researchId=${_id}`)
  const request = axios
    .post(`${RESEARCHER_SERVER}/cancel_registeration?id=${id}`)
    .then(response => response.data);

  return {
    type: CANCEL_USER,
    payload: request
  };
}

export function getResearchArea() {
  // console.log(`${RESEARCHER_SERVER}/like?researchId=${_id}`)
  const request = axios
    .get(`${RESEARCH_SERVER}/research_areas`)
    .then(response => response.data);

  return {
    type: GET_RESEARCH_AREA,
    payload: request
  };
}

export function updateResearchArea(userId, researchArea) {
  // console.log(`${RESEARCHER_SERVER}/like?researchId=${_id}`)
  const queryString = require('query-string');
  let parsed = []
  researchArea.map((value)=>{
    parsed.push(encodeURIComponent(value))
    return null
  })
  
console.log(parsed);
  const request = axios
    .post(`${RESEARCHER_SERVER}/addResearchArea?userId=${userId}&researchArea=${parsed}`)
    .then(response => response.data);

  return {
    type: UPDATE_RESEARCHER_RESEARCH_AREA,
    payload: request
  };
}


export function getAuthorSuggestions() {

  const request = axios
    .get(`${RESEARCHER_SERVER}/list_for_suggestions`)
    .then(response => response.data);

  return {
    type: GET_AUTHOR_SUGGESTIONS,
    payload: request
  };
}


