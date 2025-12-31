// src/Types/Settings/User.types.ts
import type { AuditTrails } from "../../../Types/AuditLog.types";

export interface User {
  userId: number;
  userName: string;
  userEmail: string;
  phoneNumber: string;
  address: string;
  passwordHash?: string; 
  isActive: boolean;
  islocked: boolean;
  createAt: Date | string;  // Backend uses 'createAt' (no 'd')
  lastlogin: Date | string | null;  // Backend uses lowercase 'lastlogin'
  role: string;  // Missing from your type
  companyId: number;
  auditLogs?: AuditTrails[];
}