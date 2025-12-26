import type { AuditTrails } from "../../../Types/AuditLog.types";

export interface Circle {
  circleId: number;            // e.g., 2
  circleCode: number;          // e.g., 889
  name: string;                // e.g., "Central Circle"
  abbreviation: string;        // e.g., "CC"
  isActive: boolean;           // true / false

  stateId: number;             // e.g., 1
  stateName: string;           // e.g., "Kerala"

  dateFrom: Date | string;     // e.g., "2025-12-15T08:29:13.586"
  dateFromString: string;      // e.g., "15 December 2025 08:29 AM"

  dateTo: Date | string;       // e.g., "2026-12-15T08:29:13.586"
  dateToString: string;        // e.g., "15 December 2026 08:29 AM"

  auditLogs?: AuditTrails[];   // optional audit trail entries
}
