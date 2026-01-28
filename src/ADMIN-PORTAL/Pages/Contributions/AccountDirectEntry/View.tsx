import React from "react";
import KiduView from "../../../Components/KiduView";
import AccountDirectEntryService from "../../../Services/Contributions/AccountDirectEntry.services";

const AccountDirectEntryView: React.FC = () => {
  const fields = [
    { key: "accountsDirectEntryID", label: "Entry ID" },
    { key: "memberName", label: "Member" },
    { key: "branchName", label: "Branch" },
    { key: "monthName", label: "Month" },
    { key: "yearName", label: "Year" }, 
    { key: "amt", label: "Amount" },
    { key: "status", label: "Status" },
    { key: "isApproved", label: "Approved", isBoolean: true },
  ];

  const handleFetch = async (id: string) => {
    return await AccountDirectEntryService.getAccountDirectEntryById(Number(id));
  };

  const handleDelete = async (id: string) => {
    await AccountDirectEntryService.deleteAccountDirectEntry(Number(id));
  };

  return (
    <KiduView
      title="Account Direct Entry Details"
      fields={fields}
      onFetch={handleFetch}
      onDelete={handleDelete}
      paramName="accountsDirectEntryID"
      listRoute="/dashboard/contributions/accountDirectEntry-list"
      editRoute="/dashboard/contributions/accountDirectEntry-edit"
      themeColor="#1B3763"
    />
  );
};

export default AccountDirectEntryView;
