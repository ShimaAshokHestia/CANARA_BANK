// src/ADMIN-PORTAL/Components/CMS/ContactMessage/ContactMessageEdit.tsx

import React from "react";
import type { Field } from "../../../Components/KiduEdit";
import KiduEdit from "../../../Components/KiduEdit";
import ContactMessageService from "../../../Services/CMS/ContactMessages.services";
import type { ContactMessage } from "../../../Types/CMS/ContactMessages.types";


const ContactMessageEdit: React.FC = () => {
  const fields: Field[] = [
    {
      name: "fullName",
      rules: {
        type: "text",
        label: "Full Name",
        disabled: true,
        colWidth: 6,
      },
    },
    {
      name: "emailAddress",
      rules: {
        type: "email",
        label: "Email Address",
        disabled: true,
        colWidth: 6,
      },
    },
    {
      name: "phoneNumber",
      rules: {
        type: "text",
        label: "Phone Number",
        disabled: true,
        colWidth: 6,
      },
    },
    {
      name: "subject",
      rules: {
        type: "text",
        label: "Subject",
        disabled: true,
        colWidth: 6,
      },
    },
    {
      name: "message",
      rules: {
        type: "textarea",
        label: "Message",
        disabled: true,
        colWidth: 12,
        rows: 4,
      },
    },
    {
      name: "isRead",
      rules: {
        type: "toggle",
        label: "Mark as Read",
        colWidth: 3,
      },
    },
    {
      name: "isReplied",
      rules: {
        type: "toggle",
        label: "Mark as Replied",
        colWidth: 3,
      },
    },
    {
      name: "adminNotes",
      rules: {
        type: "textarea",
        label: "Admin Notes",
        colWidth: 12,
        rows: 3,
      },
    },
  ];

  /* ===================== FETCH ===================== */
  const handleFetch = async (id: string) => {
    const response = await ContactMessageService.getContactMessageById(
      Number(id)
    );
    return response;
  };

  /* ===================== UPDATE ===================== */
  const handleUpdate = async (
    id: string,
    formData: Record<string, any>
  ) => {
    const payload: Partial<ContactMessage> = {
      isRead: Boolean(formData.isRead),
      isReplied: Boolean(formData.isReplied),
      adminNotes: formData.adminNotes?.trim() || null,
      repliedAt: formData.isReplied ? new Date().toISOString() : null,
    };

    // ⚠️ Assuming backend supports PUT /ContactMessage/{id}
    await ContactMessageService.updateContactMessage(
      Number(id),
      payload
    );
  };

  return (
    <KiduEdit
      title="Contact Message"
      fields={fields}
      onFetch={handleFetch}
      onUpdate={handleUpdate}
      paramName="contactMessageId"
      navigateBackPath="/dashboard/cms/contact-message-list"
      auditLogConfig={{
        tableName: "ContactMessage",
        recordIdField: "contactMessageId",
      }}
      themeColor="#1B3763"
    />
  );
};

export default ContactMessageEdit;
