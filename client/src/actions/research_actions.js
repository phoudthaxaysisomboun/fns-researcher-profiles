import axios from "axios";

import {
    GET_RESEARCH_FOR_CARD
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