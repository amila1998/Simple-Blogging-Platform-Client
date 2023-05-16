const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SIGNING":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "GET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATE_AVATAR":
      return {
        ...state,
        user: [{ avatar: action.payload }],
      };
    case "SIGNOUT":
      return {
        ...state,
        isLoggedIn: false,
        token: "",
        user: null,
      };
      case "LOADING":
        return {
          ...state,
        isLoading:action.payload
        };
    default:
      return state;
  }
};

export default AuthReducer;
