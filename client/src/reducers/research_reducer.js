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
  GET_ALL_RESEARCHERS_LISTS_REPORTS
} from "../actions/types";

import mergeByKey from "array-merge-by-key";

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
    case GET_FEED:
      console.log(action.payload);
      return { ...state, feed: action.payload };
    case CLEAR_FEED:
      return { ...state, feed: action.payload };
    case ADD_LIKE:
      return {
        ...state,
        addLikeSuccess: action.payload.success
      };
    case REMOVE_LIKE:
      return {
        ...state,
        removeLikeSuccess: action.payload.success
        // researchSearchResult: {
        //   ...state.researchSearchResult,
        //   ...action.payload
        // },
        // feed: {
        //   ...state.feed,
        //   ...action.payload
        // }
      };
    case CLEAR_LIKES_RESEARCH:
      return {
        ...state,
        clearLikeSuccess: action.payload.success
      };
    case GET_ALL_RESEARCHES_ADMIN:
      var allResearches = action.payload.allResearches.map(function(el, index) {
        var o = Object.assign({}, el);
        o.uploaderName = o["uploader"].name;
        o.researchTypeName = o["researchType"].name
        o.publicationTypeName = o["publicationType"].name
        
        return o;
      });

      return {
        ...state,
        allResearches,
        allResearchesCount: action.payload.size
      };
      case GET_ALL_RESEARCHES_NUMBERS_REPORTS:
      console.log(action.payload);

      if (action.payload.allResearchesListsReports) {
        var allResearchesListsReports = action.payload.allResearchesListsReports.map(
          function(el, index, array) {
            var o = Object.assign({}, el);

            console.log(array.length - 1);
            console.log(index);
            if (o["name"] === "ລວມ") {
              if (index !== array.length - 1) {
                o["no"] = index + 1;
              } else {
                o["no"] = "";
              }
            } else {
              o["no"] = index + 1;
            }

            return o;
          }
        );
      }

      return {
        ...state,
        allResearchesListsReports
      };
      case GET_ALL_RESEARCHERS_LISTS_REPORTS:
      console.log(action.payload);

      if (action.payload.allResearchesListReports) {
        var listResearchesListReports = action.payload.allResearchesListReports.map(
          function(el, index, array) {
            var o = Object.assign({}, el);
            let author = ""
            o["researchType"] = o["researchType"].name
            o["publicationType"] = o["publicationType"].name
            o["likes"] = o["likes"].length
            o["author"] = o["author"].map((value, index)=>{
              return null
            })

            if (o["name"] === "ລວມ") {
              if (index !== array.length - 1) {
                o["no"] = index + 1;
              } else {
                o["no"] = "";
              }
            } else {
              o["no"] = index + 1;
            }
            console.log(o)
            return o;
            
          }
        );

        
      }

      return {
        ...state,
        listResearchesListReports,
        listResearchesListReportsCount: action.payload.size
      };
    default:
      return state;
  }
}
