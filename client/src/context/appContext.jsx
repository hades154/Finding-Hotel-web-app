import React, { useReducer, useContext } from "react";
import reducer from "./reducers";
import axios from "axios";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
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
  SET_EDIT_POST,
  EDIT_POST_SUCCESS,
  EDIT_POST_BEGIN,
  EDIT_POST_ERROR,
  GET_PROFILE_SUCCESS,
  HANDLE_CHANGE,
  GET_UPDATE_AVATAR,
  UPDATE_MOTEL_IMAGES_SUCCESS,
  SET_EDIT_USER,
} from "./action";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  showSidebar: false,
  posts: [],
  isEditing: false,
  editPostId: "",
  isEditingUser: false,
  editUserId: "",
  createPostId: "",
  numOfPages: 2,
  page: 1,
  username: "",
  firstName: "",
  lastName: "",
  phone_number: "",
  address: "",
  user_ava: "",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "/api",
  });
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(`/api/auth/${endPoint}`, currentUser);

      const { user, token, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const resetPassword = async ({ passwordChange }) => {
    // try {
    //   const { data } = await axios.post(
    //     `/api/auth/reset-password`,
    //     passwordChange
    //   );
    // } catch (error) {}
  };

  const getPosts = async () => {
    dispatch({ type: GET_POSTS_BEGIN });
    try {
      const { data } = await axios.get(`/api/post`);
      const posts = data;
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: {
          posts,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
    clearAlert();
  };

  const createPost = async (post, formData) => {
    dispatch({ type: CREATE_POST_BEGIN });
    try {
      const { data } = await authFetch.post("/post", post);
      const id = data.post._id;
      await authFetch.patch(`/post/saveImage/${id}`, formData);
      dispatch({ type: CREATE_POST_SUCCESS, payload: { id } });
    } catch (error) {
      dispatch({
        type: CREATE_POST_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const changePassword = async (values) => {
    dispatch({ type: CHANGE_PASS_BEGIN });
    try {
      await authFetch.post(`/auth/change-password`, values);

      dispatch({
        type: CHANGE_PASS_SUCCESS,
        payload: { alertText: "change password success" },
      });
    } catch (error) {
      dispatch({
        type: CHANGE_PASS_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const setEditPost = (id) => {
    dispatch({ type: SET_EDIT_POST, payload: { id } });
    return;
  };
  const editPost = async (post, formData) => {
    dispatch({ type: EDIT_POST_BEGIN });
    const { editPostId } = state;
    try {
      await authFetch.patch(`/post/${state.editPostId}`, post);
      await authFetch.patch(`/post/saveImage/${editPostId}`, formData);
      dispatch({ type: EDIT_POST_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_POST_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getProfileById = async (id) => {
    const Users = await axios.get(`/api/auth/getProfiles`);
    const user = Users.data.find((item) => item._id === id);
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: { user },
    });
  };
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const updateUserProfile = async () => {
    const { username, firstName, lastName, phone_number, address } = state;
    try {
      await authFetch.patch(`/users/changeProfile`, {
        username,
        firstName,
        lastName,
        phone_number,
        address,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserAva = async (formData) => {
    let { user } = state;
    try {
      const res = await authFetch.patch(
        `/users/saveImage/${user._id}`,
        formData
      );
      const user_ava = res.data;
      dispatch({
        type: GET_UPDATE_AVATAR,
        payload: { user_ava },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateMultiImage = async (formData) => {
    const { createPostId, editPostId } = state;
    try {
      if (editPostId === "") {
        await authFetch.patch(`/post/MultiImage/${createPostId}`, formData);
        dispatch({
          type: UPDATE_MOTEL_IMAGES_SUCCESS,
        });
      } else {
        await authFetch.patch(`/post/MultiImage/${editPostId}`, formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setEditUser = (id) => {
    dispatch({ type: SET_EDIT_USER, payload: { id } });
    return;
  };

  const writeFeedback = async (text, rating, postId) => {
    try {
      const res = await authFetch.post(`/post/review/${postId}`, {
        text: text,
        rating: rating,
      });
      return res;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        resetPassword,
        toggleSidebar,
        logoutUser,
        getPosts,
        createPost,
        changePassword,
        setEditPost,
        editPost,
        getProfileById,
        updateUserProfile,
        handleChange,
        updateUserAva,
        updateMultiImage,
        setEditUser,
        writeFeedback,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
