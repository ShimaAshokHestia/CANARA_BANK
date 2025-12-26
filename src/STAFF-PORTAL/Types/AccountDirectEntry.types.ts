// src/Types/AccountDirectEntry/AccountDirectEntry.types.ts

export interface AccountDirectEntry {
  accountsDirectEntryID: number;
  memberId: number;
  name: string;
  branchId: number;
  monthCode: number;
  yearOf: number;
  ddIba: string;
  ddIbaDate: string;
  amt: number;
  enrl: string;
  fine: string;
  f9: string;
  f10: string;
  f11: string;
  status: string;
  isApproved: boolean;
  approvedBy: string;
  approvedDate: string;
}