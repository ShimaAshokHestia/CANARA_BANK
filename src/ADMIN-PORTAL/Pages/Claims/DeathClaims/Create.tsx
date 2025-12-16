import React, { useState } from "react";
import type { Field } from "../../../Components/KiduCreate";
import type { DeathClaim } from "../../../Types/Claims/DeathClaims.type";
import DeathClaimService from "../../../Services/Claims/DeathClaims.services";
import KiduCreate from "../../../Components/KiduCreate";


const DeathClaimCreate: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fields: Field[] = [
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

  const handleSubmit = async (formData: Record<string, any>) => {
    setIsLoading(true);
    try {
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

      await DeathClaimService.createDeathClaim(payload);
    } catch (err) {
      console.error("Error creating death claim:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KiduCreate
      title="Create Death Claim"
      fields={fields}
      onSubmit={handleSubmit}
      submitButtonText="Create Death Claim"
      showResetButton
      loadingState={isLoading}
      successMessage="Death claim created successfully!"
      errorMessage="Failed to create death claim. Please try again."
      navigateOnSuccess="/dashboard/claims/deathclaims-list"
      navigateDelay={1200}
      themeColor="#18575A"
    />
  );
};

export default DeathClaimCreate;
