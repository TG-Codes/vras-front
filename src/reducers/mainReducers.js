import AllActionTypes from "../utility/allActionTypes";

const MainReducer = (
  state = {
    loaderState: false,
    activeSidebar: true,
    userData: {},
    fontSize: 0,
    activeClients: true,
    accessibleUsers: [],
    currentPosition: null,
  },
  action
) => {
  switch (action.type) {
    case AllActionTypes.LOADER_STATE_TRUE:
      return { ...state, loaderState: action.payload };
    case AllActionTypes.LOADER_STATE_FALSE:
      return { ...state, loaderState: action.payload };
    case AllActionTypes.TOGGLE_SIDEBAR:
      return { ...state, activeSidebar: action.payload };
    case AllActionTypes.TOGGLE_CLIENTS:
      return { ...state, activeClients: action.payload };
      case AllActionTypes.LOGIN_SUCCESS:
        const { role } = action.payload;
        let accessibleUsers = [];
  
        if (role === 'client') {
          accessibleUsers = ['client','instructor', 'user'];
        } else if (role === 'instructor') {
          accessibleUsers = ['instructor','user'];
        } else if (role === 'user') {
          accessibleUsers = ['user'];
        }
  
        return { 
          ...state, 
          userData: action.payload, 
          accessibleUsers: accessibleUsers 
        };
    case AllActionTypes.LOGOUT_SUCCESS:
      return { ...state, userData: {} , accessibleUsers: [] };
        case AllActionTypes.INCREASE_FONT_SIZE:
      return {
        ...state,
        fontSize: state.fontSize + 2,
      };
    case AllActionTypes.DECREASE_FONT_SIZE:
      return {
        ...state,
        fontSize: state.fontSize - 2
      };
    case AllActionTypes.SET_FONT_SIZE:
      return {
          ...state,
          fontSize: action.payload,
      };
    case AllActionTypes.SET_CURRENT_POSITION:
        return { ...state, currentPosition: action.payload };
    default:
      return state;
  }
};
export default MainReducer;