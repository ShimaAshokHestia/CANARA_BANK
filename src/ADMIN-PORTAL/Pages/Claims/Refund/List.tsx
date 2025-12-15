// src/ADMIN-PORTAL/Pages/Contributions/RefundContribution/RefundContributionList.tsx
import React from "react";
import RefundContributionService from "../../../Services/Claims/Refund.services";
import KiduServerTable from "../../../../Components/KiduServerTable";


const columns = [
  { key: "refundContributionId", label: "Refund ID", enableSorting: true, type: "text" as const },
  { key: "staffNo", label: "Staff No", enableSorting: true, type: "text" as const },
  { key: "stateId", label: "State ID", enableSorting: true, type: "text" as const },
  { key: "designationId", label: "Designation ID", enableSorting: true, type: "text" as const },
  { key: "refundNO", label: "Refund No", enableSorting: true, type: "text" as const },
  { key: "branchNameOFTime", label: "Branch Name", enableSorting: true, type: "text" as const },
  { key: "dpcodeOfTime", label: "DP Code", enableSorting: true, type: "text" as const },
  { key: "type", label: "Type", enableSorting: true, type: "text" as const },
  { key: "amount", label: "Amount", enableSorting: true, type: "text" as const },
  { key: "yearOF", label: "Year Of", enableSorting: true, type: "text" as const },
];

const RefundContributionList: React.FC = () => {
  const fetchData = async ({
    pageNumber,
    pageSize,
    searchTerm,
  }: {
    pageNumber: number;
    pageSize: number;
    searchTerm: string;
  }) => {
    const allData = await RefundContributionService.getAllRefundContributions();
    let filtered = allData;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = allData.filter((x) =>
        Object.values(x).some((val) => String(val ?? "").toLowerCase().includes(q))
      );
    }

    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    return { data: filtered.slice(start, end), total: filtered.length };
  };

  return (
    <KiduServerTable
      title="Refund Contribution List"
      subtitle="Manage refund contributions"
      columns={columns}
      fetchData={fetchData}
      addButtonLabel="Add Refund"
      addRoute="/dashboard/contributions/refundcontribution-create"
      editRoute="/dashboard/contributions/refundcontribution-edit"
      viewRoute="/dashboard/contributions/refundcontribution-view"
      idKey="refundContributionId"
      showAddButton
      showExport
      showSearch
      showActions
    />
  );
};

export default RefundContributionList;
