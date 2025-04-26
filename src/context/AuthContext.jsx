import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

/**
 * 认证上下文提供者组件
 * @param {Object} props
 * @param {React.ReactNode} props.children - 子组件
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  /**
   * 设置用户登录状态
   * @param {Object} userData - 用户数据
   */
  const login = (userData) => {
    setUser(userData);
  };

  /**
   * 清除用户登录状态
   */
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * 使用认证上下文的自定义Hook
 * @returns {Object} 认证上下文值
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 