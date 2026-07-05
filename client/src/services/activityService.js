import { api } from '../api/client.js';

export async function getActivityLogs(limit = 50) {
  const response = await api.get('/activity', { params: { limit } });
  return response.data;
}
