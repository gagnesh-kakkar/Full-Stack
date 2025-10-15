import axios from 'axios'

export const authApi = axios.create({ baseURL: import.meta.env.VITE_AUTH_API })
export const grievanceApi = axios.create({ baseURL: import.meta.env.VITE_GRIEVANCE_API })
export const messageApi = axios.create({ baseURL: import.meta.env.VITE_MESSAGE_API })
export const reportApi = axios.create({ baseURL: import.meta.env.VITE_REPORT_API })

export function setAuthToken(token?: string) {
  const header = token ? `Bearer ${token}` : ''
  for (const api of [grievanceApi, messageApi, reportApi]) {
    if (token) api.defaults.headers.common['Authorization'] = header
    else delete api.defaults.headers.common['Authorization']
  }
}


