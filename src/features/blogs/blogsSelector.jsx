export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectBlogsStatus = (state) => state.blogs.status;
export const selectBlogsError = (state) => state.blogs.error;

export const selectExpandedBlog = (state) => state.blogs.expandedBlog

export const selectExpandedBlogError = (state) => state.blogs.expandedBlogError