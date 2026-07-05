import { api } from '../api/client.js';

export async function getUsers() {
  const response = await api.get('/users');
  return response.data;
}

export async function createUser(user) {
  const response = await api.post('/users', user);
  return response.data;
}

export async function updateUserRole(id, role, department) {
  const response = await api.patch(`/users/${id}/role`, { role, department });
  return response.data;
}
