// src/hook/useUsers.ts
import { useState, useEffect } from 'react';
import { getUsers, createUser, deleteUser, getRoles } from '../services/userService';
import { Role, User } from '../types';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const fetchRoles = async () => {
    const data = await getRoles();
    setRoles(data);
  };

  const handleCreateUser = async (newUser: Omit<User, 'id'>) => {
    await createUser(newUser);
    fetchUsers();
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);
    fetchUsers();
  };

  return {
    users,
    roles,
    handleCreateUser,
    handleDeleteUser,
  };
};
