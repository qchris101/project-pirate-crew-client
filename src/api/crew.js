import axios from 'axios'
import apiUrl from '../apiConfig'

export const createCrew = (name, user) => {
  return axios.post(
    `${apiUrl}/crews/`,
    { crew: { name } },
    // Pass along the authorization which includes our user's token
    {
      headers: {
        Authorization: `Token ${user.token}`
      }
    }
  )
}
export const indexCrew = (user) => {
  return axios.get(
    `${apiUrl}/crews/`,
    // Pass along the authorization which includes our user's token
    {
      headers: {
        Authorization: `Token ${user.token}`
      }
    }
  )
}
export const indexUsersCrew = (user) => {
  return axios.get(
    `${apiUrl}/crews/owner/`,
    // Pass along the authorization which includes our user's token
    {
      headers: {
        Authorization: `Token ${user.token}`
      }
    }
  )
}

export const showCrew = (id, user) => {
  return axios.get(`${apiUrl}/crews/${id}/`, {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const deleteCrew = (id, user) => {
  return axios.delete(`${apiUrl}/crews/${id}/`, {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const updateCrew = (id, name, user) => {
  return axios.patch(
    `${apiUrl}/crews/${id}/`,
    { crew: { name } },
    {
      headers: {
        Authorization: `Token ${user.token}`
      }
    }
  )
}
