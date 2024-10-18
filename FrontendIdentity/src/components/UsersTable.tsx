import React, { useState } from 'react';
import { useUsers } from '../hook/useUsers';
import { User } from '../types';

const UsersTable: React.FC = () => {
  const { users, roles, handleCreateUser, handleDeleteUser } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ userName: '', password: '', role: '' });
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const openModal = () => {
    setNewUser({ userName: '', password: '', role: '' }); // Limpia el formulario
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const openConfirmModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setSelectedUserId(null);
    setIsConfirmModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleCreateUser(newUser);
    closeModal();
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId !== null) {
      await handleDeleteUser(selectedUserId);
      closeConfirmModal();
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Users</h1>
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add User
        </button>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-700">Username</th>
            <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-700">Role</th>
            <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
  {users.map((user: User) => (
    <tr key={user.id} className="border-t">
      <td className="py-2 px-4">{user.userName}</td>
      <td className="py-2 px-4">{user.role?.name || 'No Role Assigned'}</td>
      <td className="py-2 px-4">
        <button
          onClick={() => openConfirmModal(user.id)}
          className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>

      {/* Modal para agregar usuario */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Create New User</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={newUser.userName}
                onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
                className="block w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="block w-full p-2 mb-4 border border-gray-300 rounded"
              />
            <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="block w-full p-2 mb-4 border border-gray-300 rounded"
              >
                <option value="" key="default">Select Role</option>
                {roles.map((role) => (
                  <option key={`${role.id}-${role.name}`} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>



              <div className="flex justify-between">
                <button
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar usuario */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">¿Estás seguro?</h2>
            <p>¿Realmente deseas eliminar este usuario? Esta acción no se puede deshacer.</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={closeConfirmModal}
                className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
