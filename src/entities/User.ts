
export interface User {
  id: number;
  username: string;
  password: string; // Idealmente, hash
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
}


export const getUserSession = () => {

}