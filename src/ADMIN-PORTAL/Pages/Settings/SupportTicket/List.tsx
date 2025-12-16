// src/components/SupportTicket/SupportTicketList.tsx

import React from "react";
import SupportTicketService from "../../../Services/Settings/SupportTicket.services";
import KiduServerTable from "../../../../Components/KiduServerTable";


const columns = [
  { key: "supportTicketNum", label: "Ticket No", type: "text" as const },
  { key: "priority", label: "Priority", type: "text" as const },
  { key: "duration", label: "Duration", type: "text" as const },
  { key: "isApproved", label: "Approved", type: "checkbox" as const },
];

const SupportTicketList: React.FC = () => {
  const fetchData = async () => {
    const data = await SupportTicketService.getAllSupportTickets();
    return { data, total: data.length };
  };

  return (
    <KiduServerTable
      title="Support Tickets"
      columns={columns}
      idKey="supportTicketId"
      addRoute="/dashboard/support-ticket/support-ticket-create"
      editRoute="/dashboard/support-ticket/support-ticket-edit"
      viewRoute="/dashboard/support-ticket/support-ticket-view"
      fetchData={fetchData}
      showAddButton
      showSearch
      showActions
    />
  );
};

export default SupportTicketList;
