// src/services/Settings/CircleState.services.ts

import { API_ENDPOINTS } from "../../../CONSTANTS/API_ENDPOINTS";
import HttpService from "../../../Services/HttpService";
import type { CustomResponse } from "../../../Types/ApiTypes";
import type { CircleState } from "../../Types/Settings/CircleState.types";

const CircleStateService = {
  // Get all Circle–State mappings
  async getAllCircleStates(): Promise<CircleState[]> {
    const response = await HttpService.callApi<CustomResponse<CircleState[]>>(
      API_ENDPOINTS.CIRCLE_STATE.GET_ALL,
      "GET"
    );
    return response.value;
  },

  // Get Circle–State by ID
  async getCircleStateById(id: number): Promise<CustomResponse<CircleState>> {
    const response = await HttpService.callApi<CustomResponse<CircleState>>(
      API_ENDPOINTS.CIRCLE_STATE.GET_BY_ID(id),
      "GET"
    );
    // Return full CustomResponse (required for KiduEdit / KiduView)
    return response;
  },

  // Create Circle–State mapping
  async createCircleState(
    data: Omit<CircleState, "auditLogs">
  ): Promise<CircleState> {
    const response = await HttpService.callApi<CustomResponse<CircleState>>(
      API_ENDPOINTS.CIRCLE_STATE.CREATE,
      "POST",
      data
    );
    return response.value;
  },

  // Update Circle–State mapping
  async updateCircleState(
    id: number,
    data: Partial<Omit<CircleState, "auditLogs">>
  ): Promise<CircleState> {
    const response = await HttpService.callApi<CustomResponse<CircleState>>(
      API_ENDPOINTS.CIRCLE_STATE.UPDATE(id),
      "PUT",
      data
    );
    return response.value;
  },

  // Delete Circle–State mapping
  async deleteCircleState(id: number): Promise<void> {
    await HttpService.callApi<CustomResponse<void>>(
      API_ENDPOINTS.CIRCLE_STATE.DELETE(id),
      "DELETE"
    );
  },
};

export default CircleStateService;
