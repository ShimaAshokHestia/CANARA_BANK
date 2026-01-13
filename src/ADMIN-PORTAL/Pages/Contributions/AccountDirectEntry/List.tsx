// src/Pages/Accounts/AccountsDirectEntry/List.tsx

import React from "react";
import KiduServerTable from "../../../../Components/KiduServerTable";
import type { AccountsDirectEntry } from "../../../Types/Contributions/AccountDirectEntry.types";
import AccountsDirectEntryService from "../../../Services/Contributions/AccountDirectEntry.services";

const columns = [
  { key: "accountsDirectEntryID", label: "ID", enableSorting: true, type: "text" as const },
  { key: "memberName", label: "Member", enableSorting: true, type: "text" as const }, // ✅
  { key: "branchName", label: "Branch", enableSorting: true, type: "text" as const }, // ✅
  { key: "monthName", label: "Month", enableSorting: true, type: "text" as const },   // ✅
  { key: "yearOf", label: "Year", enableSorting: true, type: "text" as const },
  { key: "amt", label: "Amount", enableSorting: true, type: "text" as const },
  { key: "status", label: "Status", enableSorting: true, type: "text" as const },
  { key: "isApproved", label: "Approved", enableSorting: true, type: "checkbox" as const },
];

const AccountsDirectEntryList: React.FC = () => {
  const fetchData = async (params: {
    pageNumber: number;
    pageSize: number;
    searchTerm: string;
  }): Promise<{ data: any[]; total: number }> => {

    let entries: AccountsDirectEntry[] =
      await AccountsDirectEntryService.getAllAccountDirectEntries();

    /* ===================== SEARCH ===================== */
    if (params.searchTerm) {
      const q = params.searchTerm.toLowerCase();
      entries = entries.filter(e =>
        [
          e.accountsDirectEntryID?.toString(),
          e.memberName,
          e.branchName,
          e.monthName,
          e.status,
        ]
          .filter(Boolean)
          .some(v => String(v).toLowerCase().includes(q))
      );
    }

    /* ===================== PAGINATION ===================== */
    const start = (params.pageNumber - 1) * params.pageSize;
    const end = start + params.pageSize;

    return {
      data: entries.slice(start, end),
      total: entries.length,
    };
  };

  return (
    <KiduServerTable
      title="Accounts Direct Entry"
      subtitle="Manage account direct entries"
      columns={columns}
      idKey="accountsDirectEntryID"
      addButtonLabel="Add Entry"
      addRoute="/dashboard/contributions/accountDirectEntry-create"
      editRoute="/dashboard/contributions/accountDirectEntry-edit"
      viewRoute="/dashboard/contributions/accountDirectEntry-view"
      showAddButton
      showExport
      showSearch
      showActions
      showTitle
      fetchData={fetchData}
      rowsPerPage={10}
    />
  );
};

export default AccountsDirectEntryList;
