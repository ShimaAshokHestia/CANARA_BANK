import type { AuditTrails } from "../../../Types/AuditLog.types";

export interface DeathClaim {
  deathClaimId: number;
  memberId: number;
  stateId: number;
  designationId: number;

  deathDate: Date | string;    // e.g., "2025-12-12T06:15:10.643"
  nominee: string;            // e.g., "Ramesh Kumar"
  nomineeRelation: string;    // e.g., "Father"
  nomineeIDentity: string;    // e.g., "Aadhar - 4587 9900 2234"

  ddno: string;               // e.g., "DD784512"
  dddate: Date | string;      // e.g., "2025-12-12T06:15:10.643"

  amount: number;             // e.g., 35000
  lastContribution: number;   // e.g., 1000
  yearOF: number;             // e.g., 2025
  auditLogs?: AuditTrails[];
}
