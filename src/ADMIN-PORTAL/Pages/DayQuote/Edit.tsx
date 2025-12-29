// src/components/CMS/DayQuoteEdit.tsx
import React from "react";
import KiduEdit from "../../Components/KiduEdit";
import type { Field } from "../../Components/KiduEdit";
import type { DayQuote } from "../../Types/CMS/DayQuote.types";
import DayQuoteService from "../../Services/CMS/DayQuote.services";

const DayQuoteEdit: React.FC = () => {
  const fields: Field[] = [
    { name: "day", rules: { type: "number", label: "Day", required: true, minLength: 1, maxLength: 31, colWidth: 4 } },
    { name: "monthCode", rules: { type: "number", label: "Month", required: true, minLength: 1, maxLength: 12, colWidth: 4 } },
    { name: "toDayQuote", rules: { type: "text", label: "Quote", required: true, minLength: 1, maxLength: 500, colWidth: 12 } },
    { name: "unformatedContent", rules: { type: "textarea", label: "Unformatted Content", required: false, colWidth: 12 } },
  ];

  // ✅ SAME AS CATEGORY
  const handleFetch = async (dayQuoteId: string) => {
    const response = await DayQuoteService.getDayQuoteById(Number(dayQuoteId));
   console.log(response);
   
    // return { value: response };
    return {
    isSucess: true,   // ✅ REQUIRED
    value: response       // ✅ REQUIRED
  };
  };

  // ✅ SAME AS CATEGORY (ID INCLUDED IN BODY)
  const handleUpdate = async (dayQuoteId: string, formData: Record<string, any>) => {
    const payload: Omit<DayQuote, "auditLogs"> = {
      dayQuoteId: Number(dayQuoteId),
      day: Number(formData.day),
      monthCode: Number(formData.monthCode),
      toDayQuote: formData.toDayQuote.trim(),
      unformatedContent: formData.unformatedContent?.trim() || "",
    };

    await DayQuoteService.updateDayQuote(Number(dayQuoteId), payload);
  };

  return (
    <KiduEdit
      title="Edit Day Quote"
      fields={fields}
      onFetch={handleFetch}
      onUpdate={handleUpdate}
      submitButtonText="Update Day Quote"
      showResetButton
      successMessage="Day quote updated successfully!"
      errorMessage="Failed to update day quote."
      paramName="dayQuoteId"
      navigateBackPath="/dashboard/cms/dayquote-list"
      loadingText="Loading Day Quote..."
      auditLogConfig={{
        tableName: "DayQuote",
        recordIdField: "dayQuoteId",
      }}
      themeColor="#18575A"
    />
  );
};

export default DayQuoteEdit;
