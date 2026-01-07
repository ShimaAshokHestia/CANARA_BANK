// src/Services/Support/SupportTicket.services.ts

import { API_ENDPOINTS } from "../../../CONSTANTS/API_ENDPOINTS";
import HttpService from "../../../Services/HttpService";
import type { CustomResponse } from "../../../Types/ApiTypes";
import type { SupportTicket } from "../../Types/Settings/SupportTicket.types";


const SupportTicketService = {
  /* ===================== GET ALL ===================== */
  async getAllSupportTickets(): Promise<SupportTicket[]> {
    const response = await HttpService.callApi<
      CustomResponse<SupportTicket[]>
    >(API_ENDPOINTS.SUPPORT_TICKET.GET_ALL, "GET");

    return response.value;
  },

  /* ===================== GET BY ID ===================== */
  async getSupportTicketById(
    id: number
  ): Promise<CustomResponse<SupportTicket>> {
    const response = await HttpService.callApi<
      CustomResponse<SupportTicket>
    >(API_ENDPOINTS.SUPPORT_TICKET.GET_BY_ID(id), "GET");

    return response;
  },

  /* ===================== CREATE ===================== */
  async createSupportTicket(
    data: Omit<SupportTicket, "supportTicketId" | "auditLogs">
  ): Promise<SupportTicket> {
    const response = await HttpService.callApi<
      CustomResponse<SupportTicket>
    >(API_ENDPOINTS.SUPPORT_TICKET.CREATE, "POST", data);

    return response.value;
  },

  /* ===================== UPDATE ===================== */
  async updateSupportTicket(
    id: number,
    data: Omit<SupportTicket, "auditLogs">
  ): Promise<SupportTicket> {
    const response = await HttpService.callApi<
      CustomResponse<SupportTicket>
    >(API_ENDPOINTS.SUPPORT_TICKET.UPDATE(id), "PUT", data);

    return response.value;
  },

  /* ===================== DELETE ===================== */
  async deleteSupportTicket(id: number): Promise<void> {
    await HttpService.callApi(
      API_ENDPOINTS.SUPPORT_TICKET.DELETE(id),
      "DELETE"
    );
  },
};

export default SupportTicketService;
