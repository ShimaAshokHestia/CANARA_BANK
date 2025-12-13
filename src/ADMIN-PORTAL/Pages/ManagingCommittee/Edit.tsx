import React from "react";
import KiduEdit from "../../Components/KiduEdit";
import type { Field } from "../../Components/KiduEdit";
import type { ManagingCommittee } from "../../Types/CMS/ManagingCommittee.types";
import ManagingCommitteeService from "../../Services/CMS/ManagingCommittee.services";

const ManagingCommitteeEdit: React.FC = () => {
  const fields: Field[] = [
    {
      name: "managingComiteeId", // single 't' as in your interface
      rules: {
        type: "number",
        label: "ID",
        required: false,
        disabled: true,
        colWidth: 3,
      },
    },
    {
      name: "managingComitteeName", // keep your existing spelling here
      rules: {
        type: "text",
        label: "Member Name",
        required: true,
        minLength: 2,
        maxLength: 150,
        colWidth: 6,
      },
    },
    {
      name: "position",
      rules: {
        type: "text",
        label: "Position",
        required: true,
        minLength: 2,
        maxLength: 100,
        colWidth: 3,
      },
    },

    {
      name: "companyId",
      rules: {
        type: "number",
        label: "Company ID",
        required: true,
        colWidth: 3,
      },
    },
    {
      name: "companyName",
      rules: {
        type: "text",
        label: "Company Name",
        required: true,
        minLength: 2,
        maxLength: 150,
        colWidth: 6,
      },
    },

    {
      name: "order",
      rules: {
        type: "number",
        label: "Order",
        required: true,
        colWidth: 3,
      },
    },
    {
      name: "imageLocation",
      rules: {
        type: "text",
        label: "Image URL",
        required: false,
        placeholder: "https://example.com/image.jpg",
        colWidth: 12,
      },
    },

    {
      name: "description1",
      rules: {
        type: "textarea",
        label: "Description 1",
        required: false,
        colWidth: 12,
      },
    },
    {
      name: "description2",
      rules: {
        type: "textarea",
        label: "Description 2",
        required: false,
        colWidth: 12,
      },
    },
  ];

  // Service returns the entity (not CustomResponse). Wrap if KiduEdit expects { value }.
  const handleFetch = async (id: string) => {
    const data = await ManagingCommitteeService.getManagingCommitteeById(Number(id));
    return { value: data };
  };

  const handleUpdate = async (id: string, formData: Record<string, any>) => {
    const payload: Omit<ManagingCommittee, "auditLogs"> = {
      managingComiteeId: Number(id), // single 't'
      managingComitteeName: (formData.managingComitteeName || "").trim(),
      position: (formData.position || "").trim(),
      description1: (formData.description1 || "").trim(),
      description2: (formData.description2 || "").trim(),
      imageLocation: (formData.imageLocation || "").trim(),
      companyId: Number(formData.companyId),
      companyName: (formData.companyName || "").trim(),
      order: Number(formData.order),
    };

    if (!payload.managingComitteeName) throw new Error("Name is required.");
    if (!payload.position) throw new Error("Position is required.");
    if (!Number.isFinite(payload.companyId)) throw new Error("Company ID must be a number.");
    if (!Number.isFinite(payload.order) || payload.order < 1) throw new Error("Order must be a positive number.");
    if (payload.imageLocation && !/^https?:\/\/|^\/\//i.test(payload.imageLocation)) {
      throw new Error("Please provide a valid Image URL (http/https).");
    }

    await ManagingCommitteeService.updateManagingCommittee(Number(id), payload);
  };

  return (
    <KiduEdit
      title="Edit Managing Committee Member"
      fields={fields}
      onFetch={handleFetch}
      onUpdate={handleUpdate}
      submitButtonText="Update Member"
      showResetButton
      successMessage="Member updated successfully!"
      errorMessage="Failed to update member. Please try again."
      paramName="managingComiteeId"
      navigateBackPath="/dashboard/cms/manage-committe-list"
      loadingText="Loading Member..."
      auditLogConfig={{
        tableName: "ManagingCommittee",
        recordIdField: "managingComiteeId",
      }}
      themeColor="#18575A"
    />
  );
};

export default ManagingCommitteeEdit;
