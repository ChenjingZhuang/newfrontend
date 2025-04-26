import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import PostList from '../components/PostList';
import CreatePost from '../components/CreatePost';
import '../styles/auth.css';

/**
 * 认证页面组件
 */
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  /**
   * 处理用户认证成功
   * @param {Object} userData - 用户数据
   */
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowCreatePost(false);
  };

  /**
   * 处理帖子创建成功
   */
  const handlePostCreated = () => {
    setShowCreatePost(false);
  };

  /**
   * 处理编辑帖子
   * @param {Object} post - 要编辑的帖子
   */
  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowCreatePost(true);
  };

  if (user) {
    return (
      <div className="auth-success">
        <div className="user-header">
          <h2>欢迎, {user.email}!</h2>
          <div className="user-actions">
            <button 
              onClick={() => setShowCreatePost(!showCreatePost)}
              className="create-post-button"
            >
              {showCreatePost ? '返回列表' : '发布新帖子'}
            </button>
            <button 
              onClick={() => setUser(null)} 
              className="logout-button"
            >
              退出登录
            </button>
          </div>
        </div>

        {showCreatePost ? (
          <CreatePost 
            user={user} 
            onPostCreated={handlePostCreated}
            editingPost={editingPost}
          />
        ) : (
          <PostList 
            user={user} 
            onEdit={handleEditPost}
          />
        )}
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-toggle">
        <button
          onClick={() => setIsLogin(true)}
          className={isLogin ? 'active' : ''}
        >
          login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={!isLogin ? 'active' : ''}
        >
          register
        </button>
      </div>

      {isLogin ? (
        <Login onLoginSuccess={handleAuthSuccess} />
      ) : (
        <Register onRegisterSuccess={handleAuthSuccess} />
      )}
    </div>
  );
};

export default Auth; 