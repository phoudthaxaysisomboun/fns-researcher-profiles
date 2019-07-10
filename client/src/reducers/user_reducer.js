import {
  LOGIN_USER,
  GET_DEPARTMENTS,
  REGISTER_USER,
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
  UPDATE_PROFILE_DESCRIPTION
} from "../actions/types";

import moment from "moment";

export default function(state = {}, action) {
  var flattenObject = function(ob) {
    var toReturn = {};

    for (var i in ob) {
      if (!ob.hasOwnProperty(i)) continue;

      if (typeof ob[i] == "object") {
        var flatObject = flattenObject(ob[i]);
        for (var x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;
          toReturn[i + "." + x] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  };

  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case GET_DEPARTMENTS:
      return { ...state, departments: action.payload };
    case GET_DEGRESS:
      return { ...state, degrees: action.payload };
    case GET_USER_DETAIL:
      return { ...state, userDetail: action.payload };
    case CLEAR_USER_DETAIL:
      return { ...state, userDetail: action.payload };
    case LOGOUT_USER:
      return { ...state };
    case GET_FOLLOWING:
      return { ...state, following: action.payload };
    case CLEAR_FOLLOWING:
      return { ...state, following: action.payload };
    case CLEAR_FOLLOWER:
      return { ...state, follower: action.payload };
    case GET_FOLLOWER:
      return { ...state, follower: action.payload };
    case GET_FOLLOWER_IN_LOAD_MORE:
      return { ...state, followerInLoadMore: action.payload.data };
    case GET_FOLLOWING_IN_LOAD_MORE:
      return { ...state, followingInLoadMore: action.payload.data };
    case FOLLOW:
      return {
        ...state,
        userData: {
          ...state.userData,
          following: action.payload
        }
      };
    case ADD_FOLLOWER:
      return { ...state };
    case UNFOLLOW:
      return {
        ...state,
        userData: {
          ...state.userData,
          following: action.payload
        }
      };
    case REMOVE_FOLLOWER:
      return { ...state };
    case UPDATE_USER_MOBILE:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          mobile: action.payload.mobile
        }
      };
    case UPDATE_USER_PHONE:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          phone: action.payload.phone
        }
      };
    case UPDATE_PROFILE_DESCRIPTION:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          profileDescription: action.payload.profileDescription
        }
      };
    case UPDATE_USER_FAX:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          fax: action.payload.fax
        }
      };
    case UPDATE_USER_WEBSITE:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          website: action.payload.website
        }
      };
    case UPDATE_USER_DATE_OF_BIRTH:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          dateOfBirth: action.payload.dateOfBirth
        }
      };
    case UPDATE_USER_GENDER:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          gender: action.payload.gender
        }
      };
    case UPDATE_USER_ADDRESS:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          address: action.payload.address
        }
      };
    case UPDATE_USER_FACEBOOK:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          facebook: action.payload.facebook
        }
      };
    case UPDATE_USER_PLACE_OF_BIRTH:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          placeOfBirth: action.payload.placeOfBirth
        }
      };
    case UPDATE_USER_NATIONALITY:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          nationality: action.payload.nationality
        }
      };
    case UPDATE_USER_MINOR_ETHNICITY:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          minor_ethnicity: action.payload.minor_ethnicity
        }
      };
    case ADD_EDUCATION:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          education: action.payload.education
        }
      };
    case REMOVE_EDUCATION:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          education: action.payload.education
        }
      };
    case UPDATE_EDUCATION:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          education: action.payload.education
        }
      };
    case GET_PROVINCE:
      return {
        ...state,
        province: action.payload
      };
    case GET_COUNTRY:
      return {
        ...state,
        country: action.payload.country
      };
    case GET_DISTRICT:
      return {
        ...state,
        district: action.payload
      };
    case GET_PROFILE_RESEARCH_COUNT:
      return {
        ...state,
        profileCount: action.payload.profileCount,
        researchCount: action.payload.researchCount
      };
    case SEARCH_PROFILES:
      return {
        ...state,
        profilesSearchResult: action.payload
      };
    case CLEAR_SEARCH_PROFILES:
      return {
        ...state,
        profilesSearchResult: action.payload
      };
    case LIKE:
      return {
        ...state,
        userData: {
          ...state.userData,
          likes: action.payload
        }
      };
    case UNLIKE:
      return {
        ...state,
        userData: {
          ...state.userData,
          likes: action.payload
        }
      };
    case CLEAR_LIKES_USER:
      return {
        ...state,
        userData: {
          ...state.userData,
          likes: action.payload
        }
      };
    case GET_ALL_RESEARCHERS:
      var result = action.payload.map(function(el, index) {
        var o = Object.assign({}, el);
        o.researchCount = el["research"].length;
        return o;
      });

      let data = result.map((value, index, array) => {
        return flattenObject(value);
      });

      return {
        ...state,
        allUsers: data
      };

    case GET_REQUEST_USER:
      const req = action.payload.requests;
      let reqUser = req.map(value => {
        return flattenObject(value);
      });
      return {
        ...state,
        userRegisterationRequest: reqUser,
        userRegisterationCount: action.payload.size
      };
    case GET_OUTSTANDING_RESEARCHER:
      console.log(action.payload);
      const outstanding = action.payload.outstandingResearcher;
      let outstandingResearcher = outstanding.map(value => {
        return flattenObject(value);
      });
      return {
        ...state,
        outstandingResearcher: outstandingResearcher,
        outstandingResearcherCount: action.payload.size
      };
    case GET_NOT_OUTSTANDING_RESEARCHER:
      const notOutstanding = action.payload.notOutstandingResearcher;
      let notOutstandingResearcher = notOutstanding.map(value => {
        return flattenObject(value);
      });
      return {
        ...state,
        notOutstandingResearcher: notOutstandingResearcher,
        notOutstandingResearcherCount: action.payload.size
      };
    case GET_NOT_NEW_RESEARCHER:
      const notNew = action.payload.notNewResearcher;
      let notNewResearcher = notNew.map(value => {
        return flattenObject(value);
      });
      return {
        ...state,
        notNewResearcher: notNewResearcher,
        notNewResearcherCount: action.payload.size
      };
    case GET_NEW_RESEARCHER:
      const newcomer = action.payload.newResearcher;
      let newResearcher = newcomer.map(value => {
        return flattenObject(value);
      });
      return {
        ...state,
        newResearcher: newResearcher,
        newResearcherCount: action.payload.size
      };
    case GET_REQUEST_USER_COUNT:
      return {
        ...state,
        userRegisterationCount: action.payload.size
      };
    case CLEAR_ALL_RESEARCHERS:
      return {
        ...state,
        allUsers: action.payload
      };
    case REMOVE_RESEARCHERS:
      return {
        ...state,
        removedResearchers: action.payload
      };
    case ADD_OUTSTANDING_RESEARCHER:
      return {
        ...state,
        newOutstandingResearcher: action.payload
      };
    case ADD_NEW_RESEARCHER:
      return {
        ...state,
        newlyNewResearcher: action.payload
      };
    case REMOVE_OUTSTANDING_RESEARCHER:
      return {
        ...state,
        removedOutstandingResearcher: action.payload
      };
    case REMOVE_NEW_RESEARCHER:
      return {
        ...state,
        removedNewResearcher: action.payload
      };
    case CONFIRM_USER:
      return {
        ...state,
        confirmUser: action.payload
      };
    case DELETE_USER:
      return {
        ...state,
        deleteUser: action.payload
      };
    case CANCEL_USER:
      return {
        ...state,
        canceledUser: action.payload
      };
    case CLEAR_ALL_RESEARCHERS_REPORTS:
      return {
        ...state,
        allResearchersReports: action.payload
      };
    case GET_ALL_RESEARCHERS_REPORTS:
      console.log(action.payload);

      if (action.payload.allResearchersReports) {
        var allResearchersReports = action.payload.allResearchersReports.map(
          function(el, index, array) {
            var o = Object.assign({}, el);

            console.log(array.length - 1);
            console.log(index);
            if (o["deapartmentName"] === "ລວມ") {
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
        allResearchersReports
      };
    case GET_ALL_RESEARCHERS_LISTS_REPORTS:
      var allResearchersListsReports;

      if (action.payload.allResearchersListsReports) {
        allResearchersListsReports = action.payload.allResearchersListsReports.map(
          function(el, index) {
            var o = Object.assign({}, el);
            o["no"] = index + 1;
            o["myName"] = `${o.prefix} ${o.name} ${o.lastname}`;
            o["gender.name"] = o.gender.name;
            o["affiliation.department"] = o["affiliation"].department.name;
            o["age"] = moment().diff(o["dateOfBirth"], "years", false);
            o["degree"] = o.degree ? o["degree"].name : "";
            o["research"] = o["research"].length;

            return o;
          }
        );
      }

      return {
        ...state,
        allResearchersListsReports,
        allResearchersListsReportsCount: action.payload.size
      };
    case GET_OUTSTANDING_REPORTS:
      console.log(action.payload);
      var outstandingReports;

      if (action.payload.outstandingReports) {
        outstandingReports = action.payload.outstandingReports.map(function(
          el,
          index
        ) {
          var o = Object.assign({}, el);
          o["no"] = index + 1;
          o["myName"] = `${o.prefix} ${o.name} ${o.lastname}`;
          o["gender.name"] = o.gender.name;
          o["affiliation.department"] = o["affiliation"].department.name;
          o["age"] = moment().diff(o["dateOfBirth"], "years", false);
          o["degree"] = o.degree ? o["degree"].name : "";
          o["research"] = o["research"].length;
          o["outstanding.date"] = o["outstanding"].date;
          o["outstandingDate"] = moment(o["outstanding"].date).format(
            "DD/MM/YYYY"
          );
          o["outstanding.description"] = o["outstanding"].description;

          return o;
        });
      }

      return {
        ...state,
        outstandingReports,
        outstandingReportsCount: action.payload.size
      };
    case GET_NEWCOMER_REPORTS:
      var newResearcherReports;

      if (action.payload.newResearcherReports) {
        newResearcherReports = action.payload.newResearcherReports.map(function(
          el,
          index
        ) {
          var o = Object.assign({}, el);
          o["no"] = index + 1;
          o["myName"] = `${o.prefix} ${o.name} ${o.lastname}`;
          o["gender.name"] = o.gender.name;
          o["affiliation.department"] = o["affiliation"].department.name;
          o["age"] = moment().diff(o["dateOfBirth"], "years", false);
          o["degree"] = o.degree ? o["degree"].name : "";
          o["research"] = o["research"].length;
          o["newResearcher.date"] = o["newResearcher"].date;
          o["newResearcherDate"] = moment(o["newResearcher"].date).format(
            "DD/MM/YYYY"
          );
          o["newResearcher.description"] = o["newResearcher"].description;

          return o;
        });
      }

      return {
        ...state,
        newResearcherReports,
        newResearcherReportsCount: action.payload.size
      };
    case CLEAR_ALL_RESEARCHERS_LISTS_REPORTS:
      return {
        ...state,
        allResearchersListsReports: action.payload,
        allResearchersListsReportsCount: action.payload
      };
    default:
      return state;
  }
}
