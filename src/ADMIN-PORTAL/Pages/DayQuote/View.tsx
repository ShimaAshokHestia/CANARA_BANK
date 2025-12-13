// src/components/DayQuote/DayQuoteView.tsx
import React from "react";
import KiduView from "../../Components/KiduView";
import type { ViewField } from "../../Components/KiduView";
import DayQuoteService from "../../Services/CMS/DayQuote.services";

const DayQuoteView: React.FC = () => {
  const fields: ViewField[] = [
    { key: "dayQuoteId", label: "ID", icon: "bi-hash" },
    { key: "day", label: "Day", icon: "bi-calendar-day" },
    { key: "monthCode", label: "Month Code", icon: "bi-calendar-month" },
    { key: "toDayQuote", label: "Quote", icon: "bi-chat-quote" },
    { key: "unformatedContent", label: "Unformatted Content", icon: "bi-file-earmark-text" },
  ];

  // Fetch the specific DayQuote by ID
  const handleFetch = async (dayQuoteId: string) => {
    const data = await DayQuoteService.getDayQuoteById(Number(dayQuoteId));
    // KiduView typically expects { value } if it’s based on CustomResponse
    return { value: data };
  };

  // Delete DayQuote by ID
  const handleDelete = async (dayQuoteId: string) => {
    await DayQuoteService.deleteDayQuote(Number(dayQuoteId));
  };

  return (
    <KiduView
      title="Day Quote Details"
      fields={fields}
      onFetch={handleFetch}
      onDelete={handleDelete}
      editRoute="/dashboard/cms/dayquote-edit"
      listRoute="/dashboard/cms/dayquote-list"
      paramName="dayQuoteId"
      // No imageConfig required since this entity is text-only
      auditLogConfig={{
        tableName: "DayQuote",
        recordIdField: "dayQuoteId",
      }}
      themeColor="#18575A"
      loadingText="Loading Day Quote details..."
      showEditButton={true}
      showDeleteButton={true}
      deleteConfirmMessage="Are you sure you want to delete this day quote? This action cannot be undone."
    />
  );
};

export default DayQuoteView;
