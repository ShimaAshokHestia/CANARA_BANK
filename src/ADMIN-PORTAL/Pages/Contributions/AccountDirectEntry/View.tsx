// src/Pages/Accounts/AccountsDirectEntry/View.tsx

import React from "react";
import type { ViewField } from "../../../Components/KiduView";
import KiduView from "../../../Components/KiduView";
import AccountsDirectEntryService from "../../../Services/Contributions/AccountDirectEntry.services";

const AccountsDirectEntryView: React.FC = () => {
  const fields: ViewField[] = [
    { key: "accountsDirectEntryID", label: "Entry ID", icon: "bi-hash" },

    // ✅ DISPLAY NAMES
    { key: "memberName", label: "Member", icon: "bi-person" },
    { key: "branchName", label: "Branch", icon: "bi-building" },
    { key: "monthName", label: "Month", icon: "bi-calendar-month" },

    { key: "yearOf", label: "Year", icon: "bi-calendar" },
    { key: "amt", label: "Amount", icon: "bi-currency-rupee" },

    { key: "ddIba", label: "DD / IBA", icon: "bi-credit-card" },
    { key: "ddIbaDate", label: "DD / IBA Date", icon: "bi-calendar-event" },

    { key: "enrl", label: "ENRL", icon: "bi-file-text" },
    { key: "fine", label: "Fine", icon: "bi-exclamation-circle" },

    { key: "status", label: "Status", icon: "bi-activity" },
    { key: "isApproved", label: "Approved", icon: "bi-check-circle", isBoolean: true },

    { key: "approvedBy", label: "Approved By", icon: "bi-person-check" },
    { key: "approvedDate", label: "Approved Date", icon: "bi-calendar-check" },
  ];

  const handleFetch = async (id: string) => {
    // Backend already includes memberName, branchName, monthName
    return await AccountsDirectEntryService.getAccountDirectEntryById(
      Number(id)
    );
  };

  const handleDelete = async (id: string) => {
    await AccountsDirectEntryService.deleteAccountDirectEntry(Number(id));
  };

  return (
    <KiduView
      title="Accounts Direct Entry Details"
      fields={fields}
      onFetch={handleFetch}
      onDelete={handleDelete}
      paramName="accountsDirectEntryID"
      listRoute="/dashboard/accounts/accountDirectEntry-list"
      editRoute="/dashboard/accounts/accountDirectEntry-edit"
      auditLogConfig={{
        tableName: "AccountsDirectEntry",
        recordIdField: "accountsDirectEntryID",
      }}
      themeColor="#1B3763"
      showEditButton
      showDeleteButton
    />
  );
};

export default AccountsDirectEntryView;
