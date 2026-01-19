// src/Services/CMS/ContactMessage.services.ts
import { API_ENDPOINTS } from "../../../CONSTANTS/API_ENDPOINTS";
import HttpService from "../../../Services/HttpService";
import type { CustomResponse } from "../../../Types/ApiTypes";
import type { ContactMessage } from "../../Types/CMS/ContactMessages.types";


const ContactMessageService = {
  /**
   * Get all contact messages (Admin)
   */
  async getAllContactMessages(): Promise<ContactMessage[]> {
    const response = await HttpService.callApi<
      CustomResponse<ContactMessage[]>
    >(
      API_ENDPOINTS.CONTACT_MESSAGE.GET_ALL,
      "GET"
    );

    return response.value;
  },

  /**
   * Get contact message by ID (Admin)
   */
  async getContactMessageById(
    id: number
  ): Promise<CustomResponse<ContactMessage>> {
    const response = await HttpService.callApi<
      CustomResponse<ContactMessage>
    >(
      API_ENDPOINTS.CONTACT_MESSAGE.GET_BY_ID(id),
      "GET"
    );

    return response;
  },

  /**
   * Submit a contact message (Public)
   */
  async submitContactMessage(
    data: Omit<
      ContactMessage,
      | "contactMessageId"
      | "submittedAt"
      | "isRead"
      | "isReplied"
      | "adminNotes"
      | "repliedAt"
      | "auditLogs"
    >
  ): Promise<ContactMessage> {
    const response = await HttpService.callApi<
      CustomResponse<ContactMessage>
    >(
      API_ENDPOINTS.CONTACT_MESSAGE.CREATE,
      "POST",
      data
    );

    return response.value;
  },
};

export default ContactMessageService;
