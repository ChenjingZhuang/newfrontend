import { useEffect, useState } from 'react';
import { getAllPosts } from '../services/postService';

/**
 * User posts list component
 * @param {Object} props
 * @param {Object} props.user - Current logged in user
 * @param {boolean} props.refresh - Whether to refresh
 */
export default function UserPosts({ user, refresh }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const allPosts = await getAllPosts();
        console.log('Retrieved posts list:', allPosts);
        console.log('Current user ID:', user.id);
        // Compatible with both number and string ID comparison
        setPosts(allPosts.filter(post => 
          post.user_id === user.id || 
          Number(post.user_id) === Number(user.id)
        ));
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [user, refresh]);

  return (
    <div className="user-posts-container">
      <h3>My Posts</h3>
      {loading ? (
        <div>Loading...</div>
      ) : posts.length === 0 ? (
        <div>No posts yet</div>
      ) : (
        <div className="user-posts-list">
          {posts.map(post => (
            <div className="user-post-card" key={post.id}>
              <div className="user-post-title">{post.title}</div>
              <div className="user-post-content">{post.content}</div>
              <div className="user-post-date">{post.created_at ? new Date(post.created_at).toLocaleString() : ''}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 