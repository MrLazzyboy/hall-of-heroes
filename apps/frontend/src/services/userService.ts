// src/services/userService.js
import { api } from './api'

export const createUserService = () => {
  const authApi = api
  return {
    // Get user details
    getUserDetails: () => authApi('/users/me'),
    getAllUsers: () => authApi('/admin/users/'),
    // Generate API key
    generateApiKey: () => authApi('/generate-api-key/'),

    // Get referral stats
    updateUserDetails: (data) => authApi('/users/me', {
      method: 'PATCH',
      body: data
    }),

    deleteUser: () => authApi('/users/me', {
      method: 'DELETE'
    }),

    getUserById: (userId) => authApi(`/users/${userId}`),

    getUserEvents: () => authApi(`/events/`),

    updateAvatar: (data) => authApi('/users/me/avatar', {
      method: 'POST',
      body: data
    }),

    getNotifications: () => authApi('/users/me/notifications'),

    resetPassword: (data) => authApi('/users/reset-password', {
      method: 'POST',
      body: data
    })
  }
}
