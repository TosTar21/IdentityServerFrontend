// src/services/userService.ts
import axios from 'axios';
import { Role, User } from '../types';

const API_BASE_URL = 'https://localhost:7113/api';

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_BASE_URL}/User/users`);
  return response.data;
};

export const getRoles = async (): Promise<Role[]> => {
  const response = await axios.get(`${API_BASE_URL}/Role/roles`);
  return response.data;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<void> => {
  await axios.post(`${API_BASE_URL}/User/register`, user);
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/User/delete/${id}`);
};
