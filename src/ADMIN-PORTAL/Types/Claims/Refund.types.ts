import type { AuditTrails } from "../../../Types/AuditLog.types";

export interface RefundContribution {
  refundContributionId: number;   // e.g., 1
  staffNo: number;                // e.g., 0
  stateId: number;                // e.g., 1
  designationId: number;          // e.g., 1
  deathDate: Date | string;       // nullable ISO string date
  deathDateString: Date | string;        // formatted date string
  refundNO: number;               // e.g., "5666"
  branchNameOFTime: string;       // e.g., "MG Road Branch"
  dpcodeOfTime: string;           // e.g., "DP5001"
  type: string;                   // e.g., "Retirement"
  remark: string;                 // e.g., "Refund processed on retirement"
  ddno: string;                   // e.g., "DD789456"
  dddate: Date | string;                 // ISO Date string e.g., "2025-12-15T08:33:54.386"
  dddateString: Date | string;           // formatted date string e.g., "2025-12-15 08:33:54"
  amount: number;                 // e.g., 1000
  lastContribution: number;       // e.g., 0
  yearOF: number;                 // e.g., 2025
  auditLogs?: AuditTrails[];      // optional audit trail list
}
