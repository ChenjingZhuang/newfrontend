import React, { useState, useEffect } from 'react';
import { createPost, updatePost } from '../services/postService';
import '../styles/posts.css';

/**
 * Post creation component
 * @param {Object} props
 * @param {Object} props.user - Current logged in user
 * @param {Function} props.onPostCreated - Callback after successful post creation
 * @param {Object} props.editingPost - Current post being edited (if any)
 */
export default function CreatePost({ user, onPostCreated, editingPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // If editingPost is provided, fill the form
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title || '');
      setContent(editingPost.content || '');
    }
  }, [editingPost]);

  /**
   * Handle post creation or update
   * @param {Event} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty');
      return;
    }
    setLoading(true);
    try {
      if (editingPost) {
        // Update post
        await updatePost(editingPost.id, title, content, user.id);
      } else {
        // Create new post
        await createPost(title, content, user.id);
      }
      setTitle('');
      setContent('');
      if (onPostCreated) onPostCreated();
    } catch (err) {
      setError(err.message || (editingPost ? 'Failed to update post' : 'Failed to create post'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <form className="create-post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Post content"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={4}
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? (editingPost ? 'Updating...' : 'Posting...') : (editingPost ? 'Update' : 'Post')}
        </button>
      </form>
    </div>
  );
} 