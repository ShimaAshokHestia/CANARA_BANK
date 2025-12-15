// src/ADMIN-PORTAL/Pages/Settings/Month/MonthEdit.tsx
import React from "react";
import type { Field } from "../../../Components/KiduEdit";
import MonthService from "../../../Services/Settings/Month.services";
import type { Month } from "../../../Types/Settings/Month.types";
import KiduEdit from "../../../Components/KiduEdit";

const MonthEdit: React.FC = () => {
  const fields: Field[] = [
    { name: "monthCode", rules: { type: "number", label: "Month ID", required: false, disabled: true, colWidth: 3 } },
    { name: "monthName", rules: { type: "text", label: "Month Name", required: true, colWidth: 6 } },
    { name: "abbrivation", rules: { type: "text", label: "Abbreviation", required: true, colWidth: 6 } },
  ];

  const handleFetch = async (id: string) => {
    const response = await MonthService.getMonthById(Number(id));
    return response;
  };

  const handleUpdate = async (id: string, formData: Record<string, any>) => {
    const payload: Partial<Omit<Month, "monthCode" | "auditLogs">> = {
      monthName: formData.monthName.trim(),
      abbrivation: formData.abbrivation.trim(),
    };
    await MonthService.updateMonth(Number(id), payload);
  };

  return (
    <KiduEdit
      title="Edit Month"
      fields={fields}
      onFetch={handleFetch}
      onUpdate={handleUpdate}
      submitButtonText="Update Month"
      showResetButton
      successMessage="Month updated successfully!"
      errorMessage="Failed to update month. Please try again."
      paramName="monthCode"
      navigateBackPath="/dashboard/settings/month-list"
      loadingText="Loading Month..."
      auditLogConfig={{ tableName: "Month", recordIdField: "monthCode" }}
      themeColor="#18575A"
    />
  );
};

export default MonthEdit;
