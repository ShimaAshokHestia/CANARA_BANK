import type { AuditTrails } from "../../../Types/AuditLog.types";

export interface YearMaster {
  yearOf: number;        // e.g., 1
  yearName: number;      // e.g., 2024
  auditLogs?: AuditTrails[];
}
