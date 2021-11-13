const initialState = {
  globalArticle: [],
  article: {
    author: '',
    body: '',
    createdAt: '',
    description: '',
    tagList: '',
    title: '',
    UserEmail: '',
  },
  loading: false,
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GLOBAL_ARTICLES':
      return {
        ...state,
        globalArticle: action.payload,
      };
    case 'ARTICLE':
      return {
        ...state,
        article: action.payload,
      };
    case 'DELETE_ARTICLE':
      return {
        ...state,
        article: {},
      };
    case 'LOADING_ARTICLE':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default articlesReducer;
