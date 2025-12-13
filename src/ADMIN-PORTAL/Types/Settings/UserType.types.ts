// src/Types/User/UserType.types.ts

import type { AuditTrails } from "../../../Types/AuditLog.types";

export interface UserType {
  userTypeId: number;       // e.g., 1
  abbreviation: string;     // e.g., "STF"
  description: string;      // e.g., "Staff User"
  auditLogs?: AuditTrails[]; // optional audit trail entries
}
