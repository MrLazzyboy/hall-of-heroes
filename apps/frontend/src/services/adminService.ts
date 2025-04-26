import { api } from '@/services/api'


export const createAdminService = () => {
  return {

    approveEvent: (eventId: string) => api(`/admin/events/${eventId}/approve`, {
      method: 'POST'
    }),

    rejectEvent: (eventId: string) => api(`/admin/events/${eventId}/reject`, {
      method: 'POST'
    }),

    addUser: (data) => api('/admin/users', {
      method: 'POST',
      body: data
    }),
    deleteUser: (userId) => api(`/admin/users/${userId}`, {
      method: 'DELETE'
    }),
    changeRole: (data) => api('/admin/change/user', {
      method: 'PATCH',
      body: data
    }),
    blockUser: (userId) => api(`/admin/users/${userId}/block`, {
      method: 'PATCH'
    }),

    unBlockUser: (userId) => api(`/admin/users/${userId}/unblock`, {
      method: 'PATCH'
    }),

    addFilters: (data) => api('/admin/filters', {
      method: 'POST',
      body: data
    }),

    addNews: (data) => api('/admin/news', {
      method: 'POST',
      body: data
    }),

    updateNews: (newsId, data) => api(`/admin/news/${newsId}`, {
      method: 'PUT',
      body: data
    }),
    deleteNews: (newsId, data) => api(`/admin/news/${newsId}`, {
      method: 'DELETE',
      body: data
    })

  }
}
