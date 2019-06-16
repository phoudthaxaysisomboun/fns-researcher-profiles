import {
    GET_RESEARCH_FOR_CARD,
    CLEAR_RESEARCH_CARD,
    SEARCH_RESEARCHES,
    CLEAR_SEARCH_RESEARCHES,
    GET_RESEARCH_TYPE,
    GET_PUBLICATION_TYPE
  } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case GET_RESEARCH_FOR_CARD:
                return { ...state, userResearch: action.payload };
        case CLEAR_RESEARCH_CARD:
                return { ...state, userResearch: action.payload };
        case SEARCH_RESEARCHES:
                return { ...state, researchSearchResult: action.payload };
        case CLEAR_SEARCH_RESEARCHES:
                return { ...state, researchSearchResult: action.payload };
        case GET_RESEARCH_TYPE:
                return { ...state, researchType: action.payload };
        case GET_PUBLICATION_TYPE:
                return { ...state, publicationType: action.payload };
        default:
      return state;
    }
}