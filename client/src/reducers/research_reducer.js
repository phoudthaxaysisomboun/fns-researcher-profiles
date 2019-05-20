import {
    GET_RESEARCH_FOR_CARD
  } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case GET_RESEARCH_FOR_CARD:
                return { ...state, userResearch: action.payload };
        default:
      return state;
    }
}