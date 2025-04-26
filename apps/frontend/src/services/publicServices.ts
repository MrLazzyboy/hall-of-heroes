import { api } from '@/services/api'


const newsService = () => {
  return {
    getNews: (query) => api('/common/news/', {
      method: 'GET',
      params: query,
    }),
    getNewsById: (newsId) => api(`/common/news/${newsId}`, {}),
  }
}

const filtersService = () => {
  return {
    getFilters: () => api('/common/filters/'),
    createFilter: (data) => api('/admin/filters/', {
      method: 'POST',
      body: data
    }),
    updateFilter: (data) => api('/admin/filters/', {
      method: 'PATCH',
      body: data
    }),
    deleteFilter: (filterId) => api(`/admin/filters/${filterId}`, {
      method: 'DELETE'
    }),
  }
}



export {
  newsService,
  filtersService
}
