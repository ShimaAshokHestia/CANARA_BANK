// src/ADMIN-PORTAL/Pages/Settings/UserRoleRight/UserRoleRightList.tsx
import React from "react";
import UserRoleRightService from "../../../Services/Settings/UserRoleRight.services";
import type { UserRoleRight } from "../../../Types/Settings/UserRoleRight.types";
import KiduServerTable from "../../../../Components/KiduServerTable";

const columns = [
  { key: "userRoleRightId", label: "Role Right ID", enableSorting: true, type: "text" as const },
  { key: "controllerName", label: "Controller Name", enableSorting: true, type: "text" as const },
  { key: "actionName", label: "Action Name", enableSorting: true, type: "text" as const },
  { key: "userTypeID", label: "User Type ID", enableSorting: true, type: "text" as const },
];

const UserRoleRightList: React.FC = () => {
  const fetchData = async ({
    pageNumber,
    pageSize,
    searchTerm,
  }: {
    pageNumber: number;
    pageSize: number;
    searchTerm: string;
  }): Promise<{ data: UserRoleRight[]; total: number }> => {
    const allData = await UserRoleRightService.getAllUserRoleRights();
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
      title="User Role Right List"
      subtitle="Manage access control for user roles"
      columns={columns}
      fetchData={fetchData}
      addButtonLabel="Add Role Right"
      addRoute="/dashboard/settings/userroleright-create"
      editRoute="/dashboard/settings/userroleright-edit"
      viewRoute="/dashboard/settings/userroleright-view"
      idKey="userRoleRightId"
      showAddButton
      showExport
      showSearch
      showActions
    />
  );
};

export default UserRoleRightList;
