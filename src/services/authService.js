/**
 * 认证相关的 API 服务
 */

const API_URL = import.meta.env.VITE_API_URL;

/**
 * 用户登录
 * @param {string} email - 用户邮箱
 * @param {string} password - 用户密码
 * @returns {Promise<Object>} 登录响应数据
 */
export const login = async (email, password) => {
  try {
    console.log('发送登录请求:', { email, password });
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    console.log('登录响应:', data);
    if (!response.ok) {
      throw new Error(data.error || '登录失败');
    }
    return data;
  } catch (error) {
    console.error('登录错误:', error);
    throw new Error(error.message || '登录请求失败');
  }
};

/**
 * 用户注册
 * @param {string} email - 用户邮箱
 * @param {string} password - 用户密码
 * @returns {Promise<Object>} 注册响应数据
 */
export const register = async (email, password) => {
  try {
    console.log('发送注册请求:', { email, password });
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    console.log('注册响应:', data);
    if (!response.ok) {
      throw new Error(data.error || '注册失败');
    }
    return data;
  } catch (error) {
    console.error('注册错误:', error);
    throw new Error(error.message || '注册请求失败');
  }
}; 