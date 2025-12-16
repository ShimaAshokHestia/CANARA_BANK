import type { AuditTrails } from "../../../Types/AuditLog.types";

export interface Company {
  companyId: number;

  comapanyName: string; // API spelling (keep as-is)
  website: string;

  contactNumber: string;
  email: string;

  taxNumber: string;

  addressLine1: string;
  addressLine2?: string;

  city: string;
  state: string;
  country: string;
  zipCode: string;

  invoicePrefix: string;

  companyLogo?: string; // base64 string or image URL

  isActive: boolean;
  isDeleted: boolean;

  auditLogs?: AuditTrails[];
}
