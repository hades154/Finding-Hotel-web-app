import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  GET_POSTS_BEGIN,
  GET_POSTS_SUCCESS,
  CREATE_POST_BEGIN,
  CREATE_POST_ERROR,
  CREATE_POST_SUCCESS,
  CHANGE_PASS_BEGIN,
  CHANGE_PASS_SUCCESS,
  CHANGE_PASS_ERROR,
  EDIT_POST_SUCCESS,
  EDIT_POST_BEGIN,
  EDIT_POST_ERROR,
  SET_EDIT_POST,
  GET_PROFILE_SUCCESS,
  HANDLE_CHANGE,
  GET_UPDATE_AVATAR,
  UPDATE_MOTEL_IMAGES_SUCCESS,
  SET_EDIT_USER,
} from "./action";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userLocation: "",
      jobLocation: "",
    };
  }
  if (action.type === GET_POSTS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_POSTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      posts: action.payload.posts,
    };
  }

  if (action.type === CREATE_POST_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_POST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Post Created!",
      createPostId: action.payload.id,
    };
  }

  if (action.type === CREATE_POST_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === CHANGE_PASS_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CHANGE_PASS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }

  if (action.type === CHANGE_PASS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === SET_EDIT_POST) {
    const id = action.payload.id;
    return {
      ...state,
      isEditing: true,
      editPostId: id,
    };
  }

  if (action.type === EDIT_POST_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_POST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isEditing: false,
      editPostId: "",
      showAlert: true,
      alertType: "success",
      alertText: "Post Updated!",
    };
  }
  if (action.type === EDIT_POST_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_PROFILE_SUCCESS) {
    return {
      ...state,
      username: action.payload.user.username,
      firstName: action.payload.user.firstName
        ? action.payload.user.firstName
        : "",
      lastName: action.payload.user.lastName
        ? action.payload.user.lastName
        : "",
      phone_number: action.payload.user.phone_number
        ? action.payload.user.phone_number
        : "",
      address: action.payload.user.address ? action.payload.user.address : "",
      user_ava: action.payload.user.user_ava
        ? action.payload.user.user_ava
        : "",
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === GET_UPDATE_AVATAR) {
    return {
      ...state,
      user_ava: action.payload.user_ava,
    };
  }

  if (action.type === UPDATE_MOTEL_IMAGES_SUCCESS) {
    return {
      ...state,
      createPostId: "",
    };
  }

  if (action.type === SET_EDIT_USER) {
    const id = action.payload.id;
    return {
      ...state,
      isEditingUser: true,
      editUserId: id,
    };
  }

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
