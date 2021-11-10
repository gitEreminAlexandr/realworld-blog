const initialState = {
  spinner: true,
  error: false,
};

const indicatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_SPINNER':
      return {
        ...state,
        spinner: action.payload,
      };
    case 'ERROR_INDICATION':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default indicatorReducer;
