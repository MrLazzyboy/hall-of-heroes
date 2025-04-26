// src/services/authService.js
import { obtainToken, getAuthToken, clearTokens } from './tokenService'
import { api } from '@/services/api'

/**
 * Check if the user is authenticated
 * @returns {boolean} - Authentication status
 */

export const isAuthenticated = () => {
  return !!getAuthToken()
}

/**
 * Logout the user by removing the tokens and session ID
 */
export const logout = () => {
  clearTokens()
  api('/auth/session', { method: 'DELETE' })
}

export const registerUser = (data) => {
  return api('/auth/register', {
    method: 'POST',
    body: data
  })
}


export default {
  isAuthenticated,
  logout
}
