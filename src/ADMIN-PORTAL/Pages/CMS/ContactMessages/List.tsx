import React from "react";
import KiduServerTable from "../../../../Components/KiduServerTable";
import type { ContactMessage } from "../../../Types/CMS/ContactMessages.types";
import ContactMessageService from "../../../Services/CMS/ContactMessages.services";

const columns = [
  { key: "contactMessageId", label: "ID", enableSorting: true, type: "text" as const },
  { key: "fullName", label: "Full Name", enableSorting: true, type: "text" as const },
  { key: "emailAddress", label: "Email", enableSorting: true, type: "text" as const },
  { key: "phoneNumber", label: "Phone", enableSorting: true, type: "text" as const },
  { key: "subject", label: "Subject", enableSorting: true, type: "text" as const },
  { key: "submittedAt", label: "Submitted At", enableSorting: true, type: "datetime" as const },
  { key: "isRead", label: "Read", enableSorting: true, type: "checkbox" as const },
  { key: "isReplied", label: "Replied", enableSorting: true, type: "checkbox" as const },
];

const ContactMessageList: React.FC = () => {
  const fetchData = async (params: {
    pageNumber: number;
    pageSize: number;
    searchTerm: string;
  }): Promise<{ data: ContactMessage[]; total: number }> => {
    const messages = await ContactMessageService.getAllContactMessages();

    const filtered = params.searchTerm
      ? messages.filter((m) =>
          [m.fullName, m.emailAddress, m.phoneNumber, m.subject]
            .filter(Boolean)
            .some((v) =>
              String(v).toLowerCase().includes(params.searchTerm.toLowerCase())
            )
        )
      : messages;

    const start = (params.pageNumber - 1) * params.pageSize;
    const end = start + params.pageSize;

    return {
      data: filtered.slice(start, end),
      total: filtered.length,
    };
  };

  return (
    <KiduServerTable
      title="Contact Messages"
      subtitle="Manage customer contact enquiries"
      columns={columns}
      idKey="contactMessageId"
      fetchData={fetchData}
      viewRoute="/dashboard/cms/ContactMessage-view"
      editRoute="/dashboard/cms/ContactMessage-edit"
      showSearch
      showExport
      showActions
      showTitle
      rowsPerPage={10}
    />
  );
};

export default ContactMessageList;
