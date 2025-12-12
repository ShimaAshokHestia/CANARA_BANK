import type { AuditTrails } from "../../../Types/AuditLog.types";

export interface State {
  stateId: number;
  name: string;
  abbreviation: string;
  isActive: boolean;
  circles?: string[];
  auditLogs?: AuditTrails[];
}