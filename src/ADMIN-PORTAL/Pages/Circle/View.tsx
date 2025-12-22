import React from "react";
import type { ViewField } from "../../Components/KiduView";
import CircleService from "../../Services/Settings/Circle.services";
import KiduView from "../../Components/KiduView";

const CircleView: React.FC = () => {
  const fields: ViewField[] = [
    { key: "circleId", label: "Circle ID", icon: "bi-hash" },
    { key: "circleCode", label: "Circle Code", icon: "bi-diagram-3" },
    { key: "name", label: "Circle Name", icon: "bi-geo-alt" },
    { key: "abbreviation", label: "Abbreviation", icon: "bi-text-short" },
    { key: "state", label: "State", icon: "bi-flag" },
    { key: "dateFrom", label: "Date From", icon: "bi-calendar-event" },
    { key: "dateTo", label: "Date To", icon: "bi-calendar-x" },
    { key: "isActive", label: "Active", icon: "bi-check-circle" }
  ];

  const handleFetch = async (circleId: string) => {
    try {
      const circle = await CircleService.getCircleById(Number(circleId));
      
      // Return in the format KiduView expects (similar to KiduEdit)
      return {
        isSucess: true,
        value: circle
      };
    } catch (error) {
      console.error("Error fetching circle:", error);
      throw error;
    }
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
      editRoute="/dashboard/settings/circle-edit"
      listRoute="/dashboard/settings/circle-list"
      paramName="circleId"
      auditLogConfig={{
        tableName: "Circle",
        recordIdField: "circleId"
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