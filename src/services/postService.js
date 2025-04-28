/**
 * API services for posts
 */

const API_URL = import.meta.env.VITE_API_URL;
/**
 * Get all posts
 * @returns {Promise<Array>} List of posts
 */
export const getAllPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to get posts');
    }
    return data.posts;
  } catch (error) {
    throw new Error(error.message || 'Request to get posts failed');
  }
};

/**
 * Create a new post
 * @param {string} title - Post title
 * @param {string} content - Post content
 * @param {number} userId - User ID
 * @returns {Promise<Object>} Created post
 */
export const createPost = async (title, content, userId) => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, userId }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create post');
    }
    return data.post;
  } catch (error) {
    throw new Error(error.message || 'Request to create post failed');
  }
};

/**
 * Update a post
 * @param {number} postId - Post ID
 * @param {string} title - Post title
 * @param {string} content - Post content
 * @param {number} userId - User ID
 * @returns {Promise<Object>} Updated post
 */
export const updatePost = async (postId, title, content, userId) => {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, userId }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update post');
    }
    return data.post;
  } catch (error) {
    throw new Error(error.message || 'Request to update post failed');
  }
};

/**
 * Delete a post
 * @param {number} postId - Post ID
 * @param {number} userId - User ID
 * @returns {Promise<void>}
 */
export const deletePost = async (postId, userId) => {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete post');
    }
    return data;
  } catch (error) {
    throw new Error(error.message || 'Request to delete post failed');
  }
}; 
