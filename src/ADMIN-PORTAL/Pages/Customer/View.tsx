// src/pages/Customers/CustomerView.tsx
import React from "react";
import CustomerService from "../../Services/Customers/Customers.services";
import type { ViewField } from "../../Components/KiduView";
import KiduView from "../../Components/KiduView";

const CustomerView: React.FC = () => {
  const fields: ViewField[] = [
    { key: "customerId", label: "Customer ID" },
    { key: "customerName", label: "Name" },
    { key: "customerEmail", label: "Email" },
    { key: "customerPhone", label: "Phone" },
    { key: "customerAddress", label: "Address" },
    { key: "dob", label: "DOB", isDate: true },
    { key: "nationalilty", label: "Nationality" },
    { key: "createdAt", label: "Created At", isDate: true },
    { key: "isActive", label: "Active", isBoolean: true },
    { key: "isDeleted", label: "Deleted", isBoolean: true },
    { key: "companyId", label: "Company ID" },
  ];

  const handleFetch = async (id: string) => {
    return CustomerService.getCustomerById(Number(id));
  };

  const handleDelete = async (id: string) => {
    await CustomerService.deleteCustomer(Number(id));
  };

  return (
    <KiduView
      title="Customer Details"
      fields={fields}
      onFetch={handleFetch}
      onDelete={handleDelete}
      editRoute="/dashboard/customer-edit"
      listRoute="/dashboard/customer-list"
      paramName="customerId"
      auditLogConfig={{ tableName: "Customer", recordIdField: "customerId" }}
      themeColor="#18575A"
      showEditButton={true}
      showDeleteButton={true}
      deleteConfirmMessage="Are you sure you want to delete this customer? This action cannot be undone."
    />
  );
};

export default CustomerView;
