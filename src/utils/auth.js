const MOCK_USER = {
  username: 'admin',
  password: 'starwars123'
};

const TOKEN_KEY = 'sw_token';
const REFRESH_TOKEN_KEY = 'sw_refresh_token';

export const login = (username, password) => {
  if (username === MOCK_USER.username && password === MOCK_USER.password) {
    const token = generateMockToken();
    const refreshToken = generateMockToken();
    
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    
    // Silent refresh every 5 minutes
    scheduleTokenRefresh();
    
    return { success: true, token };
  }
  return { success: false, message: 'Invalid credentials' };
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  clearTokenRefresh();
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const generateMockToken = () => {
  return `mock_jwt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

let refreshInterval;

const scheduleTokenRefresh = () => {
  clearTokenRefresh();
  refreshInterval = setInterval(() => {
    silentRefresh();
  }, 5 * 60 * 1000); // 5 minutes
};

const clearTokenRefresh = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
};

const silentRefresh = () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (refreshToken) {
    const newToken = generateMockToken();
    localStorage.setItem(TOKEN_KEY, newToken);
    console.log('Token refreshed silently');
  }
};
