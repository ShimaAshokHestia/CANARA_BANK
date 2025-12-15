import React from "react";
import type { DeathClaim } from "../../../Types/Claims/DeathClaims.type";
import DeathClaimService from "../../../Services/Claims/DeathClaims.services";
import KiduServerTable from "../../../../Components/KiduServerTable";

const columns = [
  { key: "deathClaimId", label: "Claim ID", enableSorting: true, type: "text" as const },
  { key: "memberId", label: "Member ID", enableSorting: true, type: "text" as const },
  { key: "stateId", label: "State ID", enableSorting: true, type: "text" as const },
  { key: "designationId", label: "Designation ID", enableSorting: true, type: "text" as const },

  // Dates -> use 'date' so the table formats them
  { key: "deathDate", label: "Death Date", enableSorting: true, type: "date" as const },
  { key: "dddate", label: "DD Date", enableSorting: true, type: "date" as const },

  { key: "nominee", label: "Nominee Name", enableSorting: true, type: "text" as const },
  { key: "nomineeRelation", label: "Nominee Relation", enableSorting: true, type: "text" as const },
  { key: "ddno", label: "DD No", enableSorting: true, type: "text" as const },

  // Numbers -> treat as text for current table type union
  { key: "amount", label: "Amount", enableSorting: true, type: "text" as const },
  { key: "lastContribution", label: "Last Contribution", enableSorting: true, type: "text" as const },
  { key: "yearOF", label: "Year Of", enableSorting: true, type: "text" as const },
];

const DeathClaimList: React.FC = () => {
  const fetchData = async (params: {
    pageNumber: number;
    pageSize: number;
    searchTerm: string;
  }): Promise<{ data: DeathClaim[]; total: number }> => {
    try {
      const claims = await DeathClaimService.getAllDeathClaims();

      let filtered = claims;
      if (params.searchTerm) {
        const q = params.searchTerm.toLowerCase();
        filtered = claims.filter((c) => {
          const fields = [
            c.nominee,
            c.nomineeRelation,
            c.nomineeIDentity,
            c.ddno,
            String(c.memberId),
            String(c.amount),
            String(c.yearOF),
            c.deathDate as unknown as string,
            c.dddate as unknown as string,
          ];
          return fields.some((f) => (f ?? "").toString().toLowerCase().includes(q));
        });
      }

      const start = (params.pageNumber - 1) * params.pageSize;
      const end = start + params.pageSize;
      const paginated = filtered.slice(start, end);

      return { data: paginated, total: filtered.length };
    } catch (error: any) {
      console.error("Error fetching death claims:", error);
      throw new Error(error.message || "Failed to fetch death claims");
    }
  };

  return (
    <KiduServerTable
      title="Death Claims"
      subtitle="Manage death claims with search, sort, and pagination"
      columns={columns}
      idKey="deathClaimId"
      addButtonLabel="Add Death Claim"
      addRoute="/dashboard/claims/deathclaim-create"
      editRoute="/dashboard/claims/deathclaim-edit"
      viewRoute="/dashboard/claims/deathclaim-view"
      showAddButton={true}
      showExport={true}
      showSearch={true}
      showActions={true}
      showTitle={true}
      fetchData={fetchData}
      rowsPerPage={10}
    />
  );
};

export default DeathClaimList;
