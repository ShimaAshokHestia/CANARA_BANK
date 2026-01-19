// src/Public/ContactMessage/ContactMessageCreate.tsx

import React from "react";
import type { Field } from "../../../Components/KiduCreate";
import type { ContactMessage } from "../../../Types/CMS/ContactMessages.types";
import ContactMessageService from "../../../Services/CMS/ContactMessages.services";
import KiduCreate from "../../../Components/KiduCreate";


const ContactMessageCreate: React.FC = () => {
  const fields: Field[] = [
    {
      name: "fullName", rules: {
        type: "text",
        label: "Full Name",
        required: true,
        minLength: 2,
        maxLength: 150,
        colWidth: 6,
      },
    },
    {
      name: "emailAddress",
      rules: {
        type: "email",
        label: "Email Address",
        required: true,
        colWidth: 6,
      },
    },
    {
      name: "phoneNumber",
      rules: {
        type: "text",
        label: "Phone Number",
        required: true,
        minLength: 8,
        maxLength: 15,
        colWidth: 6,
      },
    },
    {
      name: "subject",
      rules: {
        type: "text",
        label: "Subject",
        required: true,
        minLength: 3,
        maxLength: 200,
        colWidth: 6,
      },
    },
    {
      name: "message",
      rules: {
        type: "textarea",
        label: "Message",
        required: true,
        minLength: 10,
        colWidth: 12,
        rows: 4,
      },
    },
  ];

  const handleSubmit = async (formData: Record<string, any>) => {
    const payload: Omit<
      ContactMessage,
      | "contactMessageId"
      | "submittedAt"
      | "isRead"
      | "isReplied"
      | "adminNotes"
      | "repliedAt"
      | "auditLogs"
    > = {
      fullName: formData.fullName.trim(),
      emailAddress: formData.emailAddress.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      ipAddress: "", // backend can fill this
    };

    await ContactMessageService.submitContactMessage(payload);
  };

  return (
    <KiduCreate
      title="Contact Us"
      subtitle="We’d love to hear from you. Please fill out the form below."
      fields={fields}
      onSubmit={handleSubmit}
      submitButtonText="Send Message"
      showResetButton
      successMessage="Your message has been sent successfully!"
      errorMessage="Failed to send message. Please try again later."
      navigateOnSuccess="/thank-you"
      navigateDelay={1200}
      themeColor="#1B3763"
    />
  );
};

export default ContactMessageCreate;
