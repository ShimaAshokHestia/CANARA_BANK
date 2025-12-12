// src/components/DayQuote/DayQuoteList.tsx

import React from "react";
import type { DayQuote } from "../../Types/CMS/DayQuote.types";
import DayQuoteService from "../../Services/CMS/DayQuote.services";
import KiduServerTable from "../../../Components/KiduServerTable";

const columns = [
  { key: "dayQuoteId", label: "ID", enableSorting: true, type: "text" as const },
  { key: "day", label: "Day", enableSorting: true, type: "text" as const },
  { key: "monthCode", label: "Month Code", enableSorting: true, type: "text" as const },
  { key: "toDayQuote", label: "Quote", enableSorting: false, type: "text" as const },
  { key: "unformatedContent", label: "Unformatted Content", enableSorting: false, type: "text" as const },
];

const DayQuoteList: React.FC = () => {
  const fetchData = async (params: {
    pageNumber: number;
    pageSize: number;
    searchTerm: string;
  }): Promise<{ data: DayQuote[]; total: number }> => {
    try {
      // Fetch all day quotes from the service
      const dayQuotes = await DayQuoteService.getAllDayQuotes();

      // Filter by search term if provided
      let filteredQuotes = dayQuotes;
      if (params.searchTerm) {
        const searchLower = params.searchTerm.toLowerCase();
        filteredQuotes = dayQuotes.filter(
          (quote) =>
            quote.toDayQuote?.toLowerCase().includes(searchLower) ||
            quote.unformatedContent?.toLowerCase().includes(searchLower) ||
            String(quote.day)?.includes(searchLower) ||
            String(quote.monthCode)?.includes(searchLower)
        );
      }

      // Pagination
      const startIndex = (params.pageNumber - 1) * params.pageSize;
      const endIndex = startIndex + params.pageSize;
      const paginatedQuotes = filteredQuotes.slice(startIndex, endIndex);

      return {
        data: paginatedQuotes,
        total: filteredQuotes.length,
      };
    } catch (error: any) {
      console.error("Error fetching day quotes:", error);
      throw new Error(error.message || "Failed to fetch day quotes");
    }
  };

  return (
    <KiduServerTable
      title="Day Quote Management"
      subtitle="Manage daily quotes with search, filter, and pagination"
      columns={columns}
      idKey="dayQuoteId"
      addButtonLabel="Add Day Quote"
      addRoute="/dashboard/cms/dayquote-create"
      editRoute="/dashboard/cms/dayquote-edit"
      viewRoute="/dashboard/cms/dayquote-view"
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

export default DayQuoteList;
