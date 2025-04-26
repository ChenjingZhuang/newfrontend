import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { AuthProvider, useAuth } from './context/AuthContext';
import CreatePost from './components/CreatePost';
import UserPosts from './components/UserPosts';
import PostList from './components/PostList';

/**
 * Navigation bar component
 */
function NavBar() {
  const { user, logout } = useAuth();

  return (
    <div className="auth-buttons">
      {user ? (
        <div className="user-info">
          <span className="welcome-text">Welcome, {user.email}!</span>
          <button className="auth-button" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <>
          <Link to="/login">
            <button className="auth-button">Login</button>
          </Link>
          <Link to="/register">
            <button className="auth-button">Register</button>
          </Link>
        </>
      )}
    </div>
  );
}

/**
 * Main content component, includes home page and post section
 */
function MainContent() {
  const [activeTab, setActiveTab] = useState('');
  const [refreshPosts, setRefreshPosts] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { user } = useAuth();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  /**
   * Handle post creation success
   */
  const handlePostCreated = () => {
    setRefreshPosts(prev => !prev);
    setShowCreateForm(false);
    setEditingPost(null);
  };
  
  /**
   * Handle post editing
   * @param {Object} post - Post to edit
   */
  const handleEdit = (post) => {
    setEditingPost(post);
    setShowCreateForm(true);
  };

  return (
    <>
      {/* Main Content for the Home Page */}
      <div className="search-bar">
        <div className="home-icon" />
        <input type="text" placeholder="Search" />
      </div>

      <nav className="nav-tabs">
        <div
          className={`tab ${activeTab === 'bodyLanguage' ? 'active' : ''}`}
          onClick={() => handleTabClick('bodyLanguage')}
        >
          Body language
        </div>
        <div
          className={`tab ${activeTab === 'differentSounds' ? 'active' : ''}`}
          onClick={() => handleTabClick('differentSounds')}
        >
          Different Sounds
        </div>
      </nav>

      <main className="main-content">
        <div className="side-buttons left">
          <button>Decode Your Dog's Language</button>
          <button>Bark, Wag, or Whine? Know What It Means</button>
        </div>

        <div className="dog-image">
          <img src="/dog-image.jpg" alt="Happy dog communicating" />
        </div>

        <div className="side-buttons right">
          <button>Strengthen Your Bond: Speak 'Dog' Fluently</button>
          <button>From Puppy Eyes to Happy Howls: The Ultimate Dog Communication Guide</button>
        </div>
      </main>

      <div className="caption">
        <strong>Stop Misunderstanding Your Dog!</strong><br />
        🚫 Many behavioral issues stem from miscommunication. Learn to respond correctly to your dog's signals and prevent common mistakes.
      </div>

      {/* Posts section */}
      <div className="posts-section">
        <h2>Community Discussion</h2>
        
        {user && (
          <div className="user-actions">
            {showCreateForm ? (
              <>
                <h3>{editingPost ? 'Edit Post' : 'Create New Post'}</h3>
                <CreatePost 
                  user={user} 
                  onPostCreated={handlePostCreated} 
                  editingPost={editingPost}
                />
              </>
            ) : (
              <button 
                className="create-button" 
                onClick={() => setShowCreateForm(true)}
              >
                Create New Post
              </button>
            )}
          </div>
        )}
        
        <PostList 
          user={user} 
          onEdit={handleEdit} 
          refresh={refreshPosts}
        />
      </div>
    </>
  );
}

/**
 * Main App component
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <header className="header">
            <div className="icon left" />
            <h1>Interesting facts about Dog's Facts</h1>
            <div className="icon right" />
          </header>

          <NavBar />

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<MainContent />} />
          </Routes>

          <footer className="footer">
            <div className="icon bottom" />
            <p>Care about your Dog</p>
            <div className="icon up-arrow" />
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;