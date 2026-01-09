// src/ADMIN-PORTAL/Components/Accounts/AccountDirectEntryList.tsx

import React from "react";
import AccountDirectEntryService from "../../Services/AccountDirectEntry.services";
import MonthService from "../../../ADMIN-PORTAL/Services/Settings/Month.services";
import type { Month } from "../../../ADMIN-PORTAL/Types/Settings/Month.types";
import KiduServerTable from "../../../Components/KiduServerTable";

const columns = [
  { key: "accountsDirectEntryID", label: "ID", enableSorting: true, type: "text" as const },
  { key: "name", label: "Member", enableSorting: true, type: "text" as const },
  { key: "branchName", label: "Branch", enableSorting: true, type: "text" as const },
  { key: "monthName", label: "Month", enableSorting: true, type: "text" as const }, 
  { key: "yearOf", label: "Year", enableSorting: true, type: "text" as const },
  { key: "amt", label: "Amount", enableSorting: true, type: "text" as const },
  { key: "isApproved", label: "Approved", enableSorting: true, type: "checkbox" as const },
];

const StaffAccountDirectEntryList: React.FC = () => {
  const fetchData = async () => {
    // 1️⃣ Fetch entries
    const entries = await AccountDirectEntryService.getAllAccountDirectEntries();

    // 2️⃣ Fetch months
    const months = await MonthService.getAllMonths();

    // 3️⃣ Build lookup map
    const monthMap = Object.fromEntries(
      months.map((m: Month) => [m.monthCode, m.monthName])
    );

    // 4️⃣ Enrich data
    const enrichedData = entries.map((e: any) => ({
      ...e,
      monthName: monthMap[e.monthCode] ?? e.monthCode,
      branchName: e.branchName ?? e.name, // adjust if you later add branch lookup
    }));

    return {
      data: enrichedData,
      total: enrichedData.length,
    };
  };

  return (
    <KiduServerTable
      title="Account Direct Entry"
      subtitle="Manage entry with search and pagination"
      columns={columns}
      idKey="accountsDirectEntryID"
      addButtonLabel="Add Entry"
      fetchData={fetchData}
      addRoute="/staff-portal/contributions/staffaccountDirectEntry-create"
      editRoute="/staff-portal/contributions/staffaccountDirectEntry-edit"
      viewRoute="/staff-portal/contributions/staffaccountDirectEntry-view"
      showActions
      showAddButton
      showSearch
      showExport
      showTitle
      rowsPerPage={10}
    />
  );
};

export default StaffAccountDirectEntryList;
