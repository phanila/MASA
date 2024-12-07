import axios from 'axios'
import type { Route } from '@/apiRoutes'
export enum ApiMethod{
  GET = 'GET',
  POST = 'POST',
}

export const apiCall = async <T extends Route>(route: T, data: T['data']) => {
  const response = await axios({
    method: route.type,
    url: "http://localhost:3000/api" + route.url,
    data,
    headers: {
      Authorization: route.isProtected ? `Bearer ${localStorage.getItem('token')}` : ''
    }
  })

  return response.data as T['response']
}




