import { BLOGS_LIST, ADD_BLOG } from "./action";

const initialState = {
  blogsData: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case BLOGS_LIST:
      return {
        ...state,
        blogsData: action.payload,
      };
    case ADD_BLOG:
      return {
        ...state,
        blogsData: [...state.blogsData, action.payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
