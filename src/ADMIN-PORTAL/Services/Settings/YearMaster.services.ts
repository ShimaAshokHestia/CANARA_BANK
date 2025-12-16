// src/services/Settings/YearMaster.services.ts

import { API_ENDPOINTS } from "../../../CONSTANTS/API_ENDPOINTS";
import HttpService from "../../../Services/HttpService";
import type { CustomResponse } from "../../../Types/ApiTypes";
import type { YearMaster } from "../../Types/Settings/YearMaster.types";

const YearMasterService = {
  // Get all Year Masters
  async getAllYearMasters(): Promise<YearMaster[]> {
    const response = await HttpService.callApi<CustomResponse<YearMaster[]>>(
      API_ENDPOINTS.YEAR_MASTER.GET_ALL,
      "GET"
    );
    return response.value;
  },

  // Get Year Master by ID
  async getYearMasterById(id: number): Promise<CustomResponse<YearMaster>> {
    const response = await HttpService.callApi<CustomResponse<YearMaster>>(
      API_ENDPOINTS.YEAR_MASTER.GET_BY_ID(id),
      "GET"
    );
    // Return full CustomResponse for KiduEdit / KiduView
    return response;
  },

  // Create Year Master
  async createYearMaster(
    data: Omit<YearMaster, "auditLogs">
  ): Promise<YearMaster> {
    const response = await HttpService.callApi<CustomResponse<YearMaster>>(
      API_ENDPOINTS.YEAR_MASTER.CREATE,
      "POST",
      data
    );
    return response.value;
  },

  // Update Year Master
  async updateYearMaster(
    id: number,
    data: Partial<Omit<YearMaster, "auditLogs">>
  ): Promise<YearMaster> {
    const response = await HttpService.callApi<CustomResponse<YearMaster>>(
      API_ENDPOINTS.YEAR_MASTER.UPDATE(id),
      "PUT",
      data
    );
    return response.value;
  },

  // Delete Year Master
  async deleteYearMaster(id: number): Promise<void> {
    await HttpService.callApi<CustomResponse<void>>(
      API_ENDPOINTS.YEAR_MASTER.DELETE(id),
      "DELETE"
    );
  },
};

export default YearMasterService;
