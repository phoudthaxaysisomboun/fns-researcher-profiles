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
  CLEAR_ALL_RESEARCHERS_REPORTS
} from "../actions/types";
import { access } from "fs";

import moment from "moment"

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
      console.log(action.payload)
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
      let bachelorCount = 0
      let masterCount = 0
      let doctorialCount = 0
      let maleCount = 0
      let femaleCount = 0
      let age18to30Count = 0
      let age31to45Count = 0
      let age46to65Count = 0


      // moment().diff(
      //   n.dateOfBirth,
      //   "years",
      //   false
      // )

      var allResearchersReports = [{}]

      if (action.payload.allResearchersReports) {
        action.payload.allResearchersReports.map(function(el, index) {
          var o = Object.assign({}, el);
          
  
         if (o["degree"]) {
          
          bachelorCount = o["degree"]._id === "5d0bab397ba3dd53b44d06df" ? bachelorCount + 1 : bachelorCount
          masterCount = o["degree"]._id === "5d0bab527ba3dd53b44d06e0" ? masterCount + 1 : masterCount
          doctorialCount = o["degree"]._id === "5d0bab637ba3dd53b44d06e1" ? doctorialCount + 1 : doctorialCount
         }
         
  
         if (o["gender"]) {
          
          maleCount = o["gender"]._id === "5cb2c97c1331746efcc3b1fb" ? maleCount + 1 : maleCount
          femaleCount = o["gender"]._id === "5cb2c98e1331746efcc3b1fd" ? femaleCount + 1 : femaleCount
          
         }
  
         if (o["dateOfBirth"]) {
          
          age18to30Count = (moment().diff(o.dateOfBirth,"years", false) >= 18) &&  (moment().diff(o.dateOfBirth,"years", false) <= 30) ? age18to30Count + 1 : age18to30Count
         
          age31to45Count= (moment().diff(o.dateOfBirth,"years", false) >= 31) &&  (moment().diff(o.dateOfBirth,"years", false) <= 45) ? age31to45Count + 1 : age31to45Count
  
          age46to65Count= (moment().diff(o.dateOfBirth,"years", false) >= 46) &&  (moment().diff(o.dateOfBirth,"years", false) <= 65) ? age46to65Count + 1 : age46to65Count
         }
          
          return null;
        });
  
        allResearchersReports[0].bachelorCount = bachelorCount
        allResearchersReports[0].masterCount = masterCount
        allResearchersReports[0].doctorialCount = doctorialCount
        allResearchersReports[0].maleCount = maleCount
        allResearchersReports[0].femaleCount = femaleCount
        allResearchersReports[0].age18to30Count = age18to30Count
        allResearchersReports[0].age31to45Count = age31to45Count
        allResearchersReports[0].age46to65Count = age46to65Count
        allResearchersReports[0].allCount = action.payload.size
        allResearchersReports[0]._id = 1
      }

      return {
        ...state,
        allResearchersReports,
      };
    default:
      return state;
  }
}
