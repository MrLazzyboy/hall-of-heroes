// src/services/apiFetch.js
import { ofetch } from 'ofetch'
import { getAuthToken, isTokenExpiringSoon } from './tokenService'
import { refreshTokens } from './tokenService'
import { logout } from './authService'

const API_URL = import.meta.env.VITE_API_URL || '/api'
const getPropertyValue = (parent, child) => {
  const isInvalid = (parent !== undefined) && (parent[child] !== undefined) && (parent !== '')
  if (isInvalid) {
    return parent[child]
  }
  return ''
}
// Create base API instance with common configuration
const createApiInstance = (config = {}) => {
  return ofetch.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    async onRequest({ request, options }) {
      const token = getAuthToken()
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`
        }

        // if (isTokenExpiringSoon(token)) {
        //   refreshTokens()
        // }

      } else {
        // If no token, remove the Authorization header
        options.headers.delete('Authorization')
      }
    },
    async onResponseError({ request, response, options }) {
      // If response is 401 Unauthorized, try to refresh the token
      const message = getPropertyValue(response._data, 'message')
      const statusText = getPropertyValue(response, 'statusText')
      const statusCode = getPropertyValue(response, 'status')
      const sendingMessage = message !== '' ? message : statusText

      return Promise.reject({
        data: response._data,
        message: sendingMessage,
        statusText: sendingMessage,
        statusCode,
        status: statusCode
      })
    },
    ...config
  })
}

// API instance without authentication
const api = createApiInstance()

// API instance with authentication
const createAuthenticatedApi = (token) => {
  return createApiInstance({
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export { api, createAuthenticatedApi }
