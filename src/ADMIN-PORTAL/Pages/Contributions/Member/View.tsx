import React from "react";
import type { ViewField } from "../../../Components/KiduView";
import MemberService from "../../../Services/Contributions/Member.services";
import KiduView from "../../../Components/KiduView";

const MemberView: React.FC = () => {
  const fields: ViewField[] = [
    { key: "memberId", label: "Member ID", icon: "bi-hash" },
    { key: "staffNo", label: "Staff No", icon: "bi-123" },
    { key: "name", label: "Name", icon: "bi-person" },
    { key: "gender", label: "Gender", icon: "bi-gender-ambiguous" },

    // ✅ Display names instead of IDs
    { key: "designationName", label: "Designation", icon: "bi-briefcase" },
    { key: "categoryname", label: "Category", icon: "bi-ui-checks-grid" },
    { key: "branchName", label: "Branch", icon: "bi-building" },
    { key: "status", label: "Status", icon: "bi-activity" },

    { key: "dobString", label: "Date of Birth", icon: "bi-calendar" },
    { key: "dojString", label: "Date of Joining", icon: "bi-calendar-check" },
    { key: "dojtoSchemeString", label: "DOJ to Scheme", icon: "bi-calendar-event" },

    { key: "isRegCompleted", label: "Registration Completed", icon: "bi-clipboard-check", isBoolean: true },

    { key: "profileImageSrc", label: "Profile Image Src", icon: "bi-card-image" },

    { key: "nominee", label: "Nominee", icon: "bi-person-heart" },
    { key: "nomineeRelation", label: "Nominee Relation", icon: "bi-people" },
    { key: "nomineeIDentity", label: "Nominee Identity", icon: "bi-person-badge" },

    { key: "unionMember", label: "Union Member", icon: "bi-patch-check" },
    { key: "totalRefund", label: "Total Refund", icon: "bi-cash" },
  ];

  const handleFetch = async (memberId: string) => {
    // ✅ Single API call - names already included in response
    const response = await MemberService.getMemberById(Number(memberId));
    return response; 
  };

  const handleDelete = async (memberId: string) => {
    await MemberService.deleteMember(Number(memberId));
  };

  return (
    <KiduView
      title="Member Details"
      fields={fields}
      onFetch={handleFetch}
      onDelete={handleDelete}
      editRoute="/dashboard/contributions/member-edit"
      listRoute="/dashboard/contributions/member-list"
      paramName="memberId"
      auditLogConfig={{ tableName: "Member", recordIdField: "memberId" }}
      themeColor="#1B3763"
      loadingText="Loading member details..."
      showEditButton={true}
      showDeleteButton={true}
      deleteConfirmMessage="Are you sure you want to delete this member? This action cannot be undone."
    />
  );
};

export default MemberView;