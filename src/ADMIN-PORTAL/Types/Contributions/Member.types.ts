import type { AuditTrails } from "../../../Types/AuditLog.types";

export interface Member {
  memberId: number;
  staffNo: number;
  designationId: number;
  categoryId: number;
  branchId: number;
  name: string;
  genderId: number;
  imageId: number;
  dob: Date | string; // ISO Date string
  dobString: Date | string;
  doj: Date | string; // ISO Date string
  dojString: Date | string;
  dojtoScheme: Date | string; // ISO Date string
  dojtoSchemeString: Date | string;
  statusId: number;
  isRegCompleted: boolean;
  createdByUserId: number;
  createdDate: Date | string;
  createdDateString: Date | string;
  modifiedByUserId: number;
  modifiedDate: Date | string;
  modifiedDateString: Date | string;
  nominee: string;
  profileImageSrc: string;
  nomineeRelation: string;
  nomineeIDentity: string;
  unionMember: string;
  totalRefund: string;
  auditLogs?: AuditTrails[];
}
