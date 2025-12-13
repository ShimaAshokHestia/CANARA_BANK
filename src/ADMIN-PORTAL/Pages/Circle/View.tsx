// src/components/Circle/CircleView.tsx
import React from "react";
import KiduView from "../../Components/KiduView";
import type { ViewField } from "../../Components/KiduView";
import CircleService from "../../Services/Settings/Circle.services";

const CircleView: React.FC = () => {
  const fields: ViewField[] = [
    { key: "circleId", label: "Circle ID", icon: "bi-hash" },
    { key: "circleCode", label: "Circle Code", icon: "bi-123" },
    { key: "name", label: "Circle Name", icon: "bi-geo-alt" },
    { key: "abbreviation", label: "Abbreviation", icon: "bi-bookmark" },
    { key: "stateId", label: "State ID", icon: "bi-flag" },
    { key: "isActive", label: "Active", icon: "bi-check-circle", isBoolean: true },

    // Dates (both ISO and formatted string variants)
    { key: "dateFrom", label: "Date From (Full)", icon: "bi-calendar", isDate: true },
    { key: "dateFromString", label: "Date From (Formatted)", icon: "bi-calendar2" },
    { key: "dateTo", label: "Date To (Full)", icon: "bi-calendar", isDate: true },
    { key: "dateToString", label: "Date To (Formatted)", icon: "bi-calendar2" },
  ];

  // Service returns CustomResponse<Circle>
  const handleFetch = async (circleId: string) => {
    const response = await CircleService.getCircleById(Number(circleId));
    return response; // KiduView expects the same shape you used in UserView/BranchView
  };

  const handleDelete = async (circleId: string) => {
    await CircleService.deleteCircle(Number(circleId));
  };

  return (
    <KiduView
      title="Circle Details"
      fields={fields}
      onFetch={handleFetch}
      onDelete={handleDelete}
      editRoute="/dashboard/settings/circles-edit"
      listRoute="/dashboard/settings/circle-list"
      paramName="circleId"
      auditLogConfig={{
        tableName: "Circle",
        recordIdField: "circleId",
      }}
      themeColor="#18575A"
      loadingText="Loading circle details..."
      showEditButton={true}
      showDeleteButton={true}
      deleteConfirmMessage="Are you sure you want to delete this circle? This action cannot be undone."
    />
  );
};

export default CircleView;
