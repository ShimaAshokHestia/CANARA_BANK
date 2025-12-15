import React from "react";
import type { Field } from "../../../Components/KiduEdit"; // ✅ from KiduEdit (not KiduCreate)
import type { DeathClaim } from "../../../Types/Claims/DeathClaims.type";
import DeathClaimService from "../../../Services/Claims/DeathClaims.services";
import KiduEdit from "../../../Components/KiduEdit";

const DeathClaimEdit: React.FC = () => {
  const fields: Field[] = [
    { name: "deathClaimId", rules: { type: "number", label: "Claim ID", required: false, disabled: true, colWidth: 3 } },
    { name: "memberId", rules: { type: "number", label: "Member ID", required: true, colWidth: 3 } },
    { name: "stateId", rules: { type: "number", label: "State ID", required: true, colWidth: 3 } },
    { name: "designationId", rules: { type: "number", label: "Designation ID", required: true, colWidth: 3 } },
    { name: "deathDate", rules: { type: "date", label: "Death Date", required: true, colWidth: 4 } },
    { name: "nominee", rules: { type: "text", label: "Nominee Name", required: true, colWidth: 4 } },
    { name: "nomineeRelation", rules: { type: "text", label: "Nominee Relation", required: true, colWidth: 4 } },
    { name: "nomineeIDentity", rules: { type: "text", label: "Nominee Identity", required: false, colWidth: 6 } },
    { name: "ddno", rules: { type: "text", label: "DD Number", required: true, colWidth: 3 } },
    { name: "dddate", rules: { type: "date", label: "DD Date", required: true, colWidth: 3 } },
    { name: "amount", rules: { type: "number", label: "Amount", required: true, colWidth: 3 } },
    { name: "lastContribution", rules: { type: "number", label: "Last Contribution", required: true, colWidth: 3 } },
    { name: "yearOF", rules: { type: "number", label: "Year Of", required: true, colWidth: 3 } },
  ];

  const toIso = (val?: string) => (val ? `${val}T00:00:00` : "");

  const handleFetch = async (claimId: string) => {
    const response = await DeathClaimService.getDeathClaimById(Number(claimId));
    return response; // KiduEdit expects your CustomResponse
  };

  const handleUpdate = async (claimId: string, formData: Record<string, any>) => {
    // ✅ Do NOT include deathClaimId in the body (it's in the URL path)
    const payload: Omit<DeathClaim, "deathClaimId"> = {
      memberId: Number(formData.memberId),
      stateId: Number(formData.stateId),
      designationId: Number(formData.designationId),
      deathDate: toIso(formData.deathDate),
      nominee: formData.nominee?.trim() || "",
      nomineeRelation: formData.nomineeRelation?.trim() || "",
      nomineeIDentity: formData.nomineeIDentity?.trim() || "",
      ddno: formData.ddno?.trim() || "",
      dddate: toIso(formData.dddate),
      amount: Number(formData.amount),
      lastContribution: Number(formData.lastContribution),
      yearOF: Number(formData.yearOF),
    };

    await DeathClaimService.updateDeathClaim(Number(claimId), payload);
  };

  return (
    <KiduEdit
      title="Edit Death Claim"
      fields={fields}
      onFetch={handleFetch}
      onUpdate={handleUpdate}
      submitButtonText="Update Death Claim"
      showResetButton
      successMessage="Death claim updated successfully!"
      errorMessage="Failed to update death claim. Please try again."
      paramName="deathClaimId"
      navigateBackPath="/dashboard/claims/deathclaim-list"
      loadingText="Loading Death Claim..."
      auditLogConfig={{ tableName: "DeathClaim", recordIdField: "deathClaimId" }}
      themeColor="#18575A"
    />
  );
};

export default DeathClaimEdit;
