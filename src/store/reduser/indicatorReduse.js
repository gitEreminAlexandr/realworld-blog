const initialState = {
  spinner: true,
  error: false,
};

const indicatorReduse = (state = initialState, action) => {
  switch (action.type) {
    case 'LOANDING':
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

export default indicatorReduse;
