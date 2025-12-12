import type { AuditTrails } from "../../../Types/AuditLog.types";

export interface ManagingCommittee {
  managingComitteeId: number;       // e.g., 1
  managingComitteeName: string;     // e.g., "John Mathew"
  position: string;                 // e.g., "Chairman"
  description1: string;             // e.g., "John has over 20 years of banking experience"
  description2: string;             // e.g., "He has served in multiple leadership roles across financial sectors"
  imageLocation: string;            // e.g., "https://example.com/images/john-mathew.jpg"
  companyId: number;                // e.g., 1
  companyName: string;              // e.g., "NCanera Bank Pvt Ltd"
  order: number;                    // e.g., 1
  auditLogs?: AuditTrails[];        // Audit trail entries (optional)
}
