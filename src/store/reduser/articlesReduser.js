const initialState = {
  globalArticle: [],
  article: {author: undefined, body: undefined, createdAt: undefined, description: undefined, tagList: undefined, title: undefined, UserEmail: undefined},
  loading: false,
};

const articlesReduse = (state = initialState, action) => {
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
        article: {}
      }
    case 'LOANDING__ARTICLE':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default articlesReduse;
