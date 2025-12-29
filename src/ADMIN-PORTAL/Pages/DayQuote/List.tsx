// src/components/CMS/DayQuoteList.tsx
import React from "react";
import type { DayQuote } from "../../Types/CMS/DayQuote.types";
import DayQuoteService from "../../Services/CMS/DayQuote.services";
import KiduServerTable from "../../../Components/KiduServerTable";

const columns = [
  { key: "dayQuoteId", label: "ID", enableSorting: true, type: "text" as const },
  { key: "day", label: "Day", enableSorting: true, type: "text" as const },
  { key: "monthCode", label: "Month", enableSorting: true, type: "text" as const },
  { key: "toDayQuote", label: "Quote", enableSorting: false, type: "text" as const },
  { key: "unformatedContent", label: "Unformatted Content", enableSorting: false, type: "text" as const },
];

const DayQuoteList: React.FC = () => {
  const fetchData = async (params: {
    pageNumber: number;
    pageSize: number;
    searchTerm: string;
  }): Promise<{ data: DayQuote[]; total: number }> => {
    const quotes = await DayQuoteService.getAllDayQuotes();

    let filtered = quotes;
    if (params.searchTerm) {
      const q = params.searchTerm.toLowerCase();
      filtered = quotes.filter(
        (d) =>
          d.toDayQuote?.toLowerCase().includes(q) ||
          d.unformatedContent?.toLowerCase().includes(q) ||
          d.day?.toString().includes(q) ||
          d.monthCode?.toString().includes(q)
      );
    }

    const start = (params.pageNumber - 1) * params.pageSize;
    const end = start + params.pageSize;

    return {
      data: filtered.slice(start, end),
      total: filtered.length,
    };
  };

  return (
    <KiduServerTable
      title="Day Quote Management"
      subtitle="Manage daily quotes"
      columns={columns}
      idKey="dayQuoteId" // 🔑 THIS FIXES EDIT NAVIGATION
      addButtonLabel="Add Day Quote"
      addRoute="/dashboard/cms/dayquote-create"
      editRoute="/dashboard/cms/dayquote-edit"
      viewRoute="/dashboard/cms/dayquote-view"
      showAddButton
      showExport
      showSearch
      showActions
      showTitle
      fetchData={fetchData}
      rowsPerPage={10}
    />
  );
};

export default DayQuoteList;
