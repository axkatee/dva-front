import { apiUrl } from '../consts.json';

export async function signUp(email, password) {
  return await request('/api/registration', { email, password })
}

export async function signIn(email, password) {
  return await request('/api/login', { email, password })
}

export async function obtainNewTokens(refreshToken) {
  const { token, refToken } = await request('/api/refreshTokens', { refToken: refreshToken })
  localStorage.setItem('auth_data', JSON.stringify({
    access_token: token,
    refresh_token: refToken
  }));
  return { token, refToken }
}

export async function addTask(task) {
  return await request('/home/add', { ...task })
}

export async function deleteTask(_id) {
  return await request('/home/delete', { _id }, 'DELETE')
}

export async function getTable() {
  return await request('/home/appointments', null, 'GET')
}

export async function editItem(_id, newValues) {
  return await request('/home/update', { _id, ...newValues })
}
async function request(url, body, method) {
  let connection = await apiRequest(url, body, method);
  if(connection.status === 401){
    await obtainNewTokens(JSON.parse(localStorage.getItem('auth_data'))?.refresh_token);
    connection = await apiRequest(url, body, method);
  }
  const response = await connection.json();
  response._status = connection.status;


  return response
}

async function apiRequest(url, body, method) {
  return fetch(`${apiUrl}${url}`, {
    method: method ?? 'POST',
    ...(method !== 'GET' && { body: JSON.stringify(body) }),
    headers: {
      ...(method !== 'GET' && {'Content-Type': 'application/json'}),
      ...(url.indexOf('/api/') !== 0 && { Authorization: JSON.parse(localStorage.getItem('auth_data'))?.access_token })
    }
  })
}