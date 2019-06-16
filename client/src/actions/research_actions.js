import axios from "axios";

import {
    GET_RESEARCH_FOR_CARD,
    CLEAR_RESEARCH_CARD,
    SEARCH_RESEARCHES,
    CLEAR_SEARCH_RESEARCHES
  } from "./types";

import { RESEARCH_SERVER } from "../components/utils/misc";

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
console.log(`${RESEARCH_SERVER}/search?search=${search}`)
    const request = axios
      .post(
        `${RESEARCH_SERVER}/search?search=${search}`
      )
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