import type { AuditTrails } from "../../../Types/AuditLog.types";

export interface Month {
  monthCode: number;        // e.g., 1
  monthName: string;        // e.g., "january"
  abbrivation: string;      // e.g., "Jan"  (kept API key as-is)
  auditLogs?: AuditTrails[]; 
}
