import React, { useState, useEffect } from 'react';
import { getAllPosts, deletePost } from '../services/postService';
import '../styles/posts.css';

/**
 * Post list component
 * @param {Object} props
 * @param {Object} props.user - Current logged in user information
 * @param {Function} props.onEdit - Callback function for editing posts
 * @param {boolean} props.refresh - Trigger to reload the list
 */
const PostList = ({ user, onEdit, refresh }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPosts();
  }, [refresh]); // Reload when refresh changes

  const loadPosts = async () => {
    try {
      console.log('Getting all posts...');
      const data = await getAllPosts();
      console.log('Retrieved post data:', data);
      setPosts(data || []);
    } catch (err) {
      console.error('Error getting posts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    try {
      await deletePost(postId, user.id);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div className="empty-message">No posts yet</div>;
  }

  return (
    <div className="post-list">
      {posts.map(post => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            <h3>{post.title}</h3>
            <span className="post-author">user: {post.author_email}</span>
          </div>
          <div className="post-content">{post.content}</div>
          <div className="post-footer">
            <span className="post-date">
              {new Date(post.created_at).toLocaleString()}
            </span>
            {user && (Number(user.id) === Number(post.user_id)) && (
              <div className="post-actions">
                <button onClick={() => onEdit(post)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDelete(post.id)} className="delete-button">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList; 