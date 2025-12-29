// src/types/User.types.ts
// import type { AuditTrails } from "../../../Types/AuditLog.types";

// export interface User {
//   userId: number;
//   userName: string;
//   userEmail: string;
//   phoneNumber: string;
//   address: string;
//   passwordHash?: string; 
//   isActive: boolean;
//   islocked: boolean;
//   createAt: Date | string;
//   lastlogin: Date | string | null;
//   companyId: number;
//   auditLogs?: AuditTrails[];
// }

// src/Types/Settings/User.types.ts
import type { AuditTrails } from "../../../Types/AuditLog.types";

export interface User {
  userId: number;

  // Basic identity
  userName: string;
  userEmail: string;
  phoneNumber: string;

  // Optional fields (not always returned)
  address?: string;
  companyId?: number;
  companyName?: string;

  // Auth / security
  passwordHash?: string;
  role?: string;
  islocked?: boolean;

  // Status
  isActive: boolean;

  // Audit & timestamps
  createdAt?: Date | string;
  lastLogin?: Date | string;

  auditLogs?: AuditTrails[];
}
