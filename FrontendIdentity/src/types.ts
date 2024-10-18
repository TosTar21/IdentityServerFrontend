// src/types/userTypes.ts
export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  userName: string;
  password: string; // Si es obligatorio, no debe ser opcional
  role: Role; // Cambiamos el tipo de string a Role
}
