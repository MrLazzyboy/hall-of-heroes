import { api } from '@/services/api'


export const createEventsService = () => {
  return {

    getEvents: (query) => api('/events/all', {
      method: 'GET',
      params: query
    }),
    getEventById: (eventId: string) => api(`/events/${eventId}`),
    createEvent: (data: any) => api('/events/', {
      method: 'POST',
      body: data
    }),
    updateEvent: (eventId: string, data: any) => api(`/events/${eventId}`, {
      method: 'PUT',
      body: data
    }),
    deleteEvent: (eventId: string) => api(`/events/${eventId}`, {
      method: 'DELETE'
    }),

    applyForEvent: (eventId: string, data: any) => api(`/events/${eventId}/apply`, {
      method: 'POST',
      body: data
    })

  }
}
