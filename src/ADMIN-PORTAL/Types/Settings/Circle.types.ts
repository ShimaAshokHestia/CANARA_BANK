import type { AuditTrails } from "../../../Types/AuditLog.types";

export interface Circle {
  circleId: number;            // e.g., 1
  circleCode: number;          // e.g., 101
  name: string;                // e.g., "Coimbatore Circle"
  abbreviation: string;        // e.g., "CHN"
  isActive: boolean;           // e.g., true
  stateId: number;             // e.g., 1
  dateFrom: Date | string;     // e.g., "2025-12-10T10:34:07.33"
  dateFromString: string;      // e.g., "2025-12-10"
  dateTo: Date | string;       // e.g., "2025-12-10T10:34:07.33"
  dateToString: string;        // e.g., "2025-12-10"
  auditLogs?: AuditTrails[];   // Audit log history (optional)
}