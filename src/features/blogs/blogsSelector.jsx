export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectBlogsStatus = (state) => state.blogs.status;
export const selectBlogsError = (state) => state.blogs.error;

export const selectExpandedBlog = (state) => state.blogs.expandedBlog

export const selectExpandedBlogError = (state) => state.blogs.expandedBlogError

export const selectDraftMessage = (state) => state.blogs.message

export const selectDraftError = (state) => state.blogs.draftsError

export const selectDraftStatus = (state) => state.blogs.draftsStatus

export const selectAllDrafts = (state) => state.blogs.drafts