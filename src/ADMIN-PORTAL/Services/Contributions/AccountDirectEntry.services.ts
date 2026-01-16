// src/ADMIN-PORTAL/Services/Accounts/AccountDirectEntry.services.ts
import { API_ENDPOINTS } from "../../../CONSTANTS/API_ENDPOINTS";
import HttpService from "../../../Services/HttpService";
import type { CustomResponse } from "../../../Types/ApiTypes";
import type { AccountDirectEntry } from "../../Types/Contributions/AccountDirectEntry.types";

const AccountDirectEntryService = {
  /**
   * 🔹 Get all account direct entries
   */
  async getAllAccountDirectEntries(): Promise<AccountDirectEntry[]> {
    const response = await HttpService.callApi<
      CustomResponse<AccountDirectEntry[]>
    >(
      API_ENDPOINTS.ACCOUNT_DIRECT_ENTRY.GET_ALL,
      "GET"
    );
    return response.value;
  },

  /**
   * 🔹 Get account direct entry by ID
   */
  async getAccountDirectEntryById(
    id: number
  ): Promise<CustomResponse<AccountDirectEntry>> {
    const response = await HttpService.callApi<
      CustomResponse<AccountDirectEntry>
    >(
      API_ENDPOINTS.ACCOUNT_DIRECT_ENTRY.GET_BY_ID(id),
      "GET"
    );
    return response;
  },

  /**
   * 🔹 Create new account direct entry
   */
  async createAccountDirectEntry(
    data: Omit<AccountDirectEntry, "accountsDirectEntryID" | "auditLogs">
  ): Promise<AccountDirectEntry> {
    const response = await HttpService.callApi<
      CustomResponse<AccountDirectEntry>
    >(
      API_ENDPOINTS.ACCOUNT_DIRECT_ENTRY.CREATE,
      "POST",
      data
    );
    return response.value;
  },

  /**
   * 🔹 Update existing account direct entry
   */
  async updateAccountDirectEntry(
    id: number,
    data: Partial<Omit<AccountDirectEntry, "accountsDirectEntryID" | "auditLogs">>
  ): Promise<AccountDirectEntry> {
    const response = await HttpService.callApi<
      CustomResponse<AccountDirectEntry>
    >(
      API_ENDPOINTS.ACCOUNT_DIRECT_ENTRY.UPDATE(id),
      "PUT",
      data
    );
    return response.value;
  },

  /**
   * 🔹 Delete account direct entry
   */
  async deleteAccountDirectEntry(id: number): Promise<void> {
    await HttpService.callApi<CustomResponse<void>>(
      API_ENDPOINTS.ACCOUNT_DIRECT_ENTRY.DELETE(id),
      "DELETE"
    );
  },

  /**
   * 🔹 Get account direct entries by Member / Staff ID
   */
  async getAccountDirectEntryByStaffId(
    memberId: number
  ): Promise<CustomResponse<AccountDirectEntry[]>> {
    const response = await HttpService.callApi<
      CustomResponse<AccountDirectEntry[]>
    >(
      API_ENDPOINTS.ACCOUNT_DIRECT_ENTRY.GET_BY_STAFFID(memberId),
      "GET"
    );
    return response;
  },
};

export default AccountDirectEntryService;
