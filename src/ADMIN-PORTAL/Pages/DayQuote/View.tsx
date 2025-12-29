// src/components/CMS/DayQuoteView.tsx
import React from "react";
import type { ViewField } from "../../Components/KiduView";
import DayQuoteService from "../../Services/CMS/DayQuote.services";
import KiduView from "../../Components/KiduView";

const DayQuoteView: React.FC = () => {
  const fields: ViewField[] = [
    { key: "dayQuoteId", label: "ID", icon: "bi-hash" },
    { key: "day", label: "Day", icon: "bi-calendar-day" },
    { key: "monthCode", label: "Month", icon: "bi-calendar-month" },
    { key: "toDayQuote", label: "Quote", icon: "bi-quote" },
    { key: "unformatedContent", label: "Unformatted Content", icon: "bi-file-text" },
  ];

  const handleFetch = async (dayQuoteId: string) => {
    const data = await DayQuoteService.getDayQuoteById(Number(dayQuoteId));
    return { value: data };
  };

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
      auditLogConfig={{
        tableName: "DayQuote",
        recordIdField: "dayQuoteId",
      }}
      themeColor="#18575A"
      loadingText="Loading day quote..."
      showEditButton
      showDeleteButton
      deleteConfirmMessage="Are you sure you want to delete this day quote?"
    />
  );
};

export default DayQuoteView;
