import AllActionTypes from "../utility/allActionTypes";

export const loaderStateTrue = () => async (dispatch) => {
  dispatch({
    type: AllActionTypes.LOADER_STATE_TRUE,
    payload: true,
  });
};

export const loaderStateFalse = () => async (dispatch) => {
  dispatch({
    type: AllActionTypes.LOADER_STATE_FALSE,
    payload: false,
  });
};

export const toggleSidebar = (active) => async (dispatch) => {
  dispatch({
    type: AllActionTypes.TOGGLE_SIDEBAR,
    payload: active,
  });
};

export const toggleClients = (active) => async (dispatch) => {
  dispatch({
    type: AllActionTypes.TOGGLE_CLIENTS,
    payload: active,
  });
};

export const loginSuccess = (userData) => async (dispatch) => {
  dispatch({
    type: AllActionTypes.LOGIN_SUCCESS,
    payload: userData,
  });
};

export const logoutSuccess = (userData) => async (dispatch) => {
  dispatch({
    type: "LOGOUT_SUCCESS",
    payload: userData,
  });
};

export const increaseFontSize = () => async (dispatch) => {
  dispatch({
    type: AllActionTypes.INCREASE_FONT_SIZE
  });
};

export const decreaseFontSize = () => async (dispatch) => {
  dispatch({
    type: AllActionTypes.DECREASE_FONT_SIZE
  });
};

export const setFontSize = () => async (dispatch) => {
  dispatch({
    type: AllActionTypes.SET_FONT_SIZE,
    payload: 0,
  });
};
export const setCurrentPosition = (position) => ({
  type: AllActionTypes.SET_CURRENT_POSITION,
  payload: position,
});
