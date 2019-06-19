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
  CLEAR_LIKES_USER
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case GET_DEPARTMENTS:
      return { ...state, departments: action.payload };
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
    default:
      return state;
  }
}
