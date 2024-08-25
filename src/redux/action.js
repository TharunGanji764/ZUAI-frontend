export const BLOGS_LIST = "BLOGS_LIST";
export const ADD_BLOG = "ADD_BLOG";

export const blogsList = (blogs) => ({
  type: BLOGS_LIST,
  payload: blogs,
});

export const addBlog = (blog) => ({
  type: ADD_BLOG,
  payload: blog,
});
