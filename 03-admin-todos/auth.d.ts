// auth.d.ts
import { DefaultSession, DefaultUser } from "@auth/core/types";

interface IUser extends DefaultUser {
  /**
   * Roles del usuario
   */
  roles?: string[];
  /**
   * Puedes agregar otros campos personalizados aquí
   */
}

// Sobrescribe los tipos de Auth.js
declare module "@auth/core/types" {
  interface User extends IUser {}

  interface Session {
    user?: User;
  }
}

declare module "@auth/core/jwt" {
  interface JWT extends IUser {}
}
