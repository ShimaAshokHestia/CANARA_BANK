import React from "react";
import KiduView from "../../Components/KiduView";
import type { ViewField } from "../../Components/KiduView";
import ManagingCommitteeService from "../../Services/CMS/ManagingCommittee.services";

const ManagingCommitteeView: React.FC = () => {
  const fields: ViewField[] = [
    { key: "managingComiteeId", label: "ID", icon: "bi-hash" },
    { key: "managingComitteeName", label: "Name", icon: "bi-person" },
    { key: "position", label: "Position", icon: "bi-briefcase" },

    { key: "companyId", label: "Company ID", icon: "bi-building" },
    { key: "companyName", label: "Company Name", icon: "bi-building-check" },

    { key: "order", label: "Order", icon: "bi-list-ol" },
    { key: "imageLocation", label: "Image URL", icon: "bi-image" },

    { key: "description1", label: "Description 1", icon: "bi-card-text" },
    { key: "description2", label: "Description 2", icon: "bi-card-text" },
  ];

  // Wrap to { value } since getById returns the entity, not CustomResponse
  const handleFetch = async (id: string) => {
    const data = await ManagingCommitteeService.getManagingCommitteeById(Number(id));
    return { value: data };
  };

  const handleDelete = async (id: string) => {
    await ManagingCommitteeService.deleteManagingCommittee(Number(id));
  };

  return (
    <KiduView
      title="Managing Committee Member Details"
      fields={fields}
      onFetch={handleFetch}
      onDelete={handleDelete}
      editRoute="/dashboard/cms/manage-committe-edit"
      listRoute="/dashboard/cms/manage-committe-list"
      paramName="managingComiteeId"
      imageConfig={{
        fieldName: "imageLocation",   // show member photo if present
        defaultImage: "",             // optional: add a placeholder if you have one
        showNameField: "managingComitteeName",
        showIdField: "managingComiteeId",
        isCircle: true,
      }}
      auditLogConfig={{
        tableName: "ManagingCommittee",
        recordIdField: "managingComiteeId",
      }}
      themeColor="#18575A"
      loadingText="Loading member details..."
      showEditButton={true}
      showDeleteButton={true}
      deleteConfirmMessage="Are you sure you want to delete this member? This action cannot be undone."
    />
  );
};

export default ManagingCommitteeView;
