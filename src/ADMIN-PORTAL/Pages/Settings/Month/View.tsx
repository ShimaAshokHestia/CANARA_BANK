// src/ADMIN-PORTAL/Pages/Settings/Month/MonthView.tsx
import React from "react";
import type { ViewField } from "../../../Components/KiduView";
import MonthService from "../../../Services/Settings/Month.services";
import KiduView from "../../../Components/KiduView";

const MonthView: React.FC = () => {
  const fields: ViewField[] = [
    { key: "monthCode", label: "Month ID" },
    { key: "monthName", label: "Month Name" },
    { key: "abbrivation", label: "Abbreviation" },
  ];

  const handleFetch = async (id: string) => {
    const response = await MonthService.getMonthById(Number(id));
    return response; // should be your CustomResponse
  };

  return (
    <KiduView
      title="View Month"
      fields={fields}
      onFetch={handleFetch}
      paramName="monthCode"
      listRoute="/dashboard/settings/month-list"              
      auditLogConfig={{ tableName: "Month", recordIdField: "monthCode" }}
      themeColor="#18575A"
      showEditButton={false}                                  
      showDeleteButton={false}                                 
    />
  );
};

export default MonthView;
