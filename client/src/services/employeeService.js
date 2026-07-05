import { api } from '../api/client.js';

export async function getEmployees(params = {}) {
  const response = await api.get('/employees', { params });
  return response.data;
}

export async function getEmployeesPage(params = {}) {
  const response = await api.get('/employees', { params });
  return response.data;
}

export async function getEmployee(id) {
  const response = await api.get(`/employees/${id}`);
  return response.data;
}

export async function createEmployee(employee) {
  const response = await api.post('/employees', employee);
  return response.data;
}

export async function bulkCreateEmployees(employees) {
  const response = await api.post('/employees/bulk', { employees });
  return response.data;
}

export async function updateEmployee(id, employee) {
  const response = await api.put(`/employees/${id}`, employee);
  return response.data;
}

export async function deleteEmployee(id) {
  const response = await api.delete(`/employees/${id}`);
  return response.data;
}
