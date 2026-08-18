import { ref } from 'vue';

export interface UserProfile {
  displayName: string;
  pictureUrl?: string;
}

// Global reactive user state (shared across all components)
const user = ref<UserProfile | null>(null);

// Load existing user from localStorage on init
const storedUser = localStorage.getItem('user');
if (storedUser) {
  try {
    user.value = JSON.parse(storedUser);
  } catch (e) {
    console.error('Failed to parse user from localStorage', e);
  }
}

export function useAuth() {
  const setUser = (userData: UserProfile, access: string, refresh: string) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('user', JSON.stringify(userData));
    user.value = userData;
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    user.value = null;
  };

  return { user, setUser, logout };
}
