export type User = {
  id: number;
  uuid: string;
  username: string;
  password?: string;
  email: string;
  isActive: boolean;
  bio: string;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}
