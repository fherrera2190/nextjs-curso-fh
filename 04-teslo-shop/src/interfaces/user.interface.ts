export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  emailVerified?: Date | null;
  role: string;
  image?: string | null;
}
