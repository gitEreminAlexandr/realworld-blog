const initialState = {
  isLoggin: false,
  user: {},
  errorRegistore: false,
  errorLoggin: false,
};

const userReduser = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_UP':
      return {
        ...state,
        isLoggin: true,
        user: action.payload,
        errorRegistore: false,
        errorLoggin: false,
      };
    case 'LOG_OUT':
      return {
        ...state,
        isLoggin: false,
        user: {},
      };
    case 'REGISTORE_ERROR':
      return {
        ...state,
        errorRegistore: true,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        errorLoggin: true,
      };

    default:
      return state;
  }
};

export default userReduser;
