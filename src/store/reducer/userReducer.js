const initialState = {
  isLogging: false,
  user: {},
  errorRegister: false,
  errorLoggin: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER':
      return {
        ...state,
        isLogging: true,
        user: action.payload,
        errorRegistore: false,
        errorLoggin: false,
      };
    case 'LOG_OUT':
      return {
        ...state,
        isLogging: false,
        user: {},
      };
    case 'REGISTER_ERROR':
      return {
        ...state,
        errorRegister: true,
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

export default userReducer;
