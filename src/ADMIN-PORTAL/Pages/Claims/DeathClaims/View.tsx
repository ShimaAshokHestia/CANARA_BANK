import React from "react";
import type { ViewField } from "../../../Components/KiduView";
import DeathClaimService from "../../../Services/Claims/DeathClaims.services";
import KiduView from "../../../Components/KiduView";

const DeathClaimView: React.FC = () => {
  const fields: ViewField[] = [
    { key: "deathClaimId", label: "Claim ID", icon: "bi-hash" },

    // ✅ DISPLAY NAMES (not IDs)
    { key: "memberName", label: "Member", icon: "bi-person" },
    { key: "stateName", label: "State", icon: "bi-flag" },
    { key: "designationName", label: "Designation", icon: "bi-briefcase" },

    { key: "deathDateString", label: "Death Date", icon: "bi-calendar-event", isDate: true },

    { key: "nominee", label: "Nominee", icon: "bi-person-heart" },
    { key: "nomineeRelation", label: "Nominee Relation", icon: "bi-people" },
    { key: "nomineeIDentity", label: "Nominee Identity", icon: "bi-person-badge" },

    { key: "ddno", label: "DD Number", icon: "bi-receipt" },
    { key: "dddateString", label: "DD Date", icon: "bi-calendar", isDate: true },

    { key: "amount", label: "Amount", icon: "bi-cash" },
    { key: "lastContribution", label: "Last Contribution", icon: "bi-wallet2" },
    { key: "yearOF", label: "Year Of", icon: "bi-calendar-check" },
  ];

  const handleFetch = async (claimId: string) => {
    return DeathClaimService.getDeathClaimById(Number(claimId));
  };

  const handleDelete = async (claimId: string) => {
    await DeathClaimService.deleteDeathClaim(Number(claimId));
  };

  return (
    <KiduView
      title="Death Claim Details"
      fields={fields}
      onFetch={handleFetch}
      onDelete={handleDelete}
      editRoute="/dashboard/claims/deathclaims-edit"
      listRoute="/dashboard/claims/deathclaims-list"
      paramName="deathClaimId"
      auditLogConfig={{
        tableName: "DeathClaim",
        recordIdField: "deathClaimId",
      }}
      themeColor="#1B3763"
      loadingText="Loading death claim details..."
      showEditButton
      showDeleteButton
      deleteConfirmMessage="Are you sure you want to delete this death claim? This action cannot be undone."
    />
  );
};

export default DeathClaimView;
