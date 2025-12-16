// src/components/Company/CompanyList.tsx
import React from "react";
import CompanyService from "../../../Services/Settings/Company.services";
import KiduServerTable from "../../../../Components/KiduServerTable";


const columns = [
  { key: "companyId", label: "ID", enableSorting: true, type: "text" as const },
  { key: "comapanyName", label: "Company Name", enableSorting: true, type: "text" as const },
  { key: "email", label: "Email", type: "text" as const },
  { key: "contactNumber", label: "Contact", type: "text" as const },
  { key: "city", label: "City", type: "text" as const },
  { key: "state", label: "State", type: "text" as const },
  { key: "isActive", label: "Active", type: "checkbox" as const },
];

const CompanyList: React.FC = () => {
  const fetchData = async () => {
    const data = await CompanyService.getAllCompanies();
    return { data, total: data.length };
  };

  return (
    <KiduServerTable
      title="Company Management"
      columns={columns}
      idKey="companyId"
      addRoute="/dashboard/settings/company-create"
      editRoute="/dashboard/settings/company-edit"
      viewRoute="/dashboard/settings/company-view"
      fetchData={fetchData}
      showAddButton
      showSearch
      showActions
    />
  );
};

export default CompanyList;
