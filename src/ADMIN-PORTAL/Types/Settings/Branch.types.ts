import type { AuditTrails } from "../../../Types/AuditLog.types";

export interface Branch {
  branchId: number;           // e.g., 1
  dpCode: number;             // e.g., 501
  name: string;               // e.g., "Gandhipuram Branch"
  address1: string;           // e.g., "123 Cross Road"
  address2: string;           // e.g., "Near Bus Stand"
  address3: string;           // e.g., "Gandhipuram"
  district: string;           // e.g., "Coimbatore"
  status: boolean;             // e.g., "true" (should ideally be boolean)
  circleId: number;           // e.g., 1
  stateId: number;            // e.g., 1
  isRegCompleted: boolean;    // e.g., true
  auditLogs?: AuditTrails[];          // array of audit log objects (define type if available)
}
