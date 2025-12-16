import type { AuditTrails } from "../../../Types/AuditLog.types";

export interface SupportTicket {
  supportTicketId: number;

  supportTicketNum: string;

  description: string;

  priority: string;
  // string fallback in case backend adds more priorities later

  duration: string; // e.g. "2 hours"

  developerRemark?: string;

  isApproved: boolean;

  approvedByUserId?: number;

  approvedDate?: Date | string;
  approvedDateSting?: Date | string; // API spelling kept as-is

  auditLogs?: AuditTrails[];
}
