// src/pages/Customers/CustomerView.tsx
import React from "react";
import CustomerService from "../../Services/Customers/Customers.services";
import type { ViewField } from "../../Components/KiduView";
import KiduView from "../../Components/KiduView";

const CustomerView: React.FC = () => {
  // Define fields to show
  const fields: ViewField[] = [
    { key: "customerId", label: "Customer ID" },
    { key: "customerName", label: "Name" },
    { key: "customerEmail", label: "Email" },
    { key: "customerPhone", label: "Phone" },
    { key: "customerAddress", label: "Address" },
    { key: "dob", label: "Date of Birth", isDate: true },
    // Your type has both `nationalilty` (API spelling) & `nationality` (correct spelling).
    // Use the API spelling to ensure it renders when only that key exists.
    { key: "nationalilty", label: "Nationality" },
    { key: "createdAt", label: "Created At", isDate: true },
    { key: "isActive", label: "Active", isBoolean: true },
    { key: "companyId", label: "Company ID" },
    { key: "isDeleted", label: "Deleted", isBoolean: true },
  ];

  // Fetch by id (KiduView expects the full CustomResponse back)
  const handleFetch = async (id: string) => {
    return CustomerService.getCustomerById(Number(id));
  };

  return (
    <KiduView
      title="View Customer"
      fields={fields}
      onFetch={handleFetch}
      paramName="customerId"
      listRoute="/dashboard/settings/customer-list"
      editRoute="/dashboard/settings/customer-edit"
      auditLogConfig={{ tableName: "Customer", recordIdField: "customerId" }}
      themeColor="#18575A"
      loadingText="Loading customer details..."
      showDeleteButton={false}
    />
  );
};

export default CustomerView;
