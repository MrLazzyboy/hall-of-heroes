// src/services/userService.js
import { api } from './api'

interface UserData {
  username?: string;
  email?: string;
  phone?: string;
  profile?: {
    firstName?: string;
    bio?: string;
    socialLink?: string;
  };
}

export const createUserService = () => {
  const authApi = api
  return {
    // Get user details
    getUserDetails: () => authApi('/users/me'),
    getAllUsers: () => authApi('/admin/users/'),
    // Generate API key
    generateApiKey: () => authApi('/generate-api-key/'),

    // Get referral stats
    updateUserDetails: (data: UserData) => authApi('/users/me', {
      method: 'PUT',
      body: data
    }),

    deleteUser: () => authApi('/users/me', {
      method: 'DELETE'
    }),

    getUserById: (userId) => authApi(`/users/${userId}`),

    getUserEvents: () => authApi(`/events/`),

    updateAvatar: (formData: FormData) => authApi('/users/me/avatar', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': null as unknown as string
      }
    }),

    getNotifications: () => authApi('/users/me/notifications'),

    resetPassword: (data) => authApi('/users/reset-password', {
      method: 'POST',
      body: data
    }),

    getUserNotifications: () => authApi('/users/me/notifications')
  }
}
