import axios from "axios";

import {
  GET_RESEARCH_FOR_CARD,
  CLEAR_RESEARCH_CARD,
  SEARCH_RESEARCHES,
  CLEAR_SEARCH_RESEARCHES,
  GET_RESEARCH_TYPE,
  GET_PUBLICATION_TYPE,
  GET_FEED,
  CLEAR_FEED,
  ADD_LIKE,
  REMOVE_LIKE,
  CLEAR_LIKES_RESEARCH,
  GET_ALL_RESEARCHES_ADMIN,
  GET_ALL_RESEARCHES_NUMBERS_REPORTS,
  GET_ALL_RESEARCHERS_LISTS_REPORTS,
  GET_COMMENTS,
  ADD_COMMENTS,
  DELETE_COMMENTS,
  ADD_REPLY,
  REMOVE_REPLY,
  COUNT_READS,
  ADD_NEW_RESEARCH,
  EDIT_RESEARCH,
  REMOVE_RESEARCH,
  REMOVE_AUTHOR,
  COUNT_SHARES
} from "./types";

import { RESEARCH_SERVER, RESEARCHER_SERVER } from "../components/utils/misc";

export function getResearchForCard(id, limit, skip) {
  const request = axios
    .get(
      `${RESEARCH_SERVER}/researches_by_id?id=${id}&type=array&sortBy=name&order=asc&limit=${limit}&skip=${skip}`
    )
    .then(response => response.data);

  return {
    type: GET_RESEARCH_FOR_CARD,
    payload: request
  };
}

export function clearResearchCard() {
  return {
    type: CLEAR_RESEARCH_CARD,
    payload: ""
  };
}

export function searchResearches(search) {
  console.log(`${RESEARCH_SERVER}/search?search=${search}`);
  const request = axios
    .post(`${RESEARCH_SERVER}/search?search=${search}`)
    .then(response => response.data);
  return {
    type: SEARCH_RESEARCHES,
    payload: request
  };
}

export function clearSearchResearches() {
  return {
    type: CLEAR_SEARCH_RESEARCHES,
    payload: ""
  };
}

export function getResearchType() {
  const request = axios
    .get(`${RESEARCH_SERVER}/research_types`)
    .then(response => response.data);
  return {
    type: GET_RESEARCH_TYPE,
    payload: request
  };
}

export function getPublicationType() {
  const request = axios
    .get(`${RESEARCH_SERVER}/publication_types`)
    .then(response => response.data);
  return {
    type: GET_PUBLICATION_TYPE,
    payload: request
  };
}

export function getFeed() {
  const request = axios
    .get(`${RESEARCHER_SERVER}/get_feed`)
    .then(response => response.data);
  return {
    type: GET_FEED,
    payload: request
  };
}
export function clearFeed() {
  return {
    type: CLEAR_FEED,
    payload: ""
  };
}



export function addLike(_id) {
  console.log(`${RESEARCH_SERVER}/add_like?researchId=${_id}`)
  const request = axios
    .post(`${RESEARCH_SERVER}/add_like?researchId=${_id}`)
    .then(response => response.data);

  return {
    type: ADD_LIKE,
    payload: request
  };
}

export function removeLike(_id) {
  console.log(`${RESEARCH_SERVER}/remove_like?researchId=${_id}`)
  const request = axios
    .post(`${RESEARCH_SERVER}/remove_like?researchId=${_id}`)
    .then(response => response.data);

  return {
    type: REMOVE_LIKE,
    payload: request
  };
}

export function getComments(id) {

  const request = axios
    .get(`${RESEARCH_SERVER}/researches_by_id/comments?id=${id}`)
    .then(response => response.data);

  return {
    type: GET_COMMENTS,
    payload: request
  };
}

export function addComment(id, userId, comment) {
console.log(`${RESEARCH_SERVER}/add_comment?id=${id}&userId=${userId}&comment=${encodeURIComponent(comment)}`)
  const request = axios
    .post(`${RESEARCH_SERVER}/add_comment?id=${id}&userId=${userId}&comment=${encodeURIComponent(comment)}`)
    .then(response => response.data);

  return {
    type: ADD_COMMENTS,
    payload: request
  };
}

export function addReply(id, userId,reply, commentId) {

  const request = axios
    .post(`${RESEARCH_SERVER}/add_reply?id=${id}&userId=${userId}&reply=${encodeURIComponent(reply)}&commentId=${commentId}`)
    .then(response => response.data);

  return {
    type: ADD_REPLY,
    payload: request
  };
}

export function removeComment(id, commentId) {

  const request = axios
    .post(`${RESEARCH_SERVER}/remove_comment?id=${id}&commentId=${commentId}`)
    .then(response => response.data);

  return {
    type: DELETE_COMMENTS,
    payload: request
  };
}

export function removeReply(id, commentId, replyId) {
console.log(`${RESEARCH_SERVER}/remove_reply?id=${id}&commentId=${commentId}&replyId=${replyId}`)
  const request = axios
    .post(`${RESEARCH_SERVER}/remove_reply?id=${id}&commentId=${commentId}&replyId=${replyId}`)
    .then(response => response.data);

  return {
    type: REMOVE_REPLY,
    payload: request
  };
}



export function getAllResearches() {
  const request = axios
    .get(`${RESEARCH_SERVER}/all_researches`)
    .then(response => response.data);

  return {
    type: GET_ALL_RESEARCHES_ADMIN,
    payload: request
  };
}

export function addCountToResearch(researchId, userId) {
  const request = axios
    .post(`${RESEARCH_SERVER}/count_reads?&researchId=${researchId}&userId=${userId}`)
    .then(response => response.data);

  return {
    type: COUNT_READS,
    payload: request
  };
}

export function addShareCount(researchId, userId) {
  const request = axios
    .post(`${RESEARCH_SERVER}/count_shares?&researchId=${researchId}&userId=${userId}`)
    .then(response => response.data);

  return {
    type: COUNT_SHARES,
    payload: request
  };


}

export function clearLikeResearch() {
  return {
    type: CLEAR_LIKES_RESEARCH,
    payload: ''
  };
}


export function getAllResearchesNumbersReports(department, from, to, by) {

  const request = axios
    .post(
      `${RESEARCH_SERVER}/reports/number?department=${department}&from=${from}&to=${to}&by=${by}`
    )
    .then(response => response.data);
  return {
    type: GET_ALL_RESEARCHES_NUMBERS_REPORTS,
    payload: request
  }
}
export function getAllResearchesListsReports(department, from, to, researchType, publicationType, order, sortby) {
console.log( `${RESEARCH_SERVER}/reports/list?department=${department}&from=${from}&to=${to}&researchType=${researchType}&publicationType=${publicationType}&order=${order}&sortby=${sortby}`)
  const request = axios
    .post(
      `${RESEARCH_SERVER}/reports/list?department=${department}&from=${from}&to=${to}&researchType=${researchType}&publicationType=${publicationType}&order=${order}&sortby=${sortby}`
    )
    .then(response => response.data);
  return {
    type: GET_ALL_RESEARCHERS_LISTS_REPORTS,
    payload: request
  }
}

export function addNewResearch(dataToSubmit) {
console.log(dataToSubmit)
  const request = axios
    .post(`${RESEARCH_SERVER}/add_research`, dataToSubmit)
    .then(response => response.data);

  return {
    type: ADD_NEW_RESEARCH,
    payload: request
  };
}

export function updateResearch(dataToSubmit) {
console.log(dataToSubmit)
  const request = axios
    .post(`${RESEARCH_SERVER}/update_research`, dataToSubmit)
    .then(response => response.data);

  return {
    type: EDIT_RESEARCH,
    payload: request
  };
}

export function removeResearch(researchId) {
  const request = axios
    .post(`${RESEARCH_SERVER}/remove_research?researchId=${researchId}`)
    .then(response => response.data);

  return {
    type: REMOVE_RESEARCH,
    payload: request
  };
}

export function removeAuthor(researchId, userId) {
  const request = axios
    .post(`${RESEARCH_SERVER}/remove_author?researchId=${researchId}&userId=${userId}`)
    .then(response => response.data);

  return {
    type: REMOVE_LIKE,
    payload: request
  };
}


// encodeURIComponent(value)