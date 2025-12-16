// src/services/Settings/Company.services.ts

import { API_ENDPOINTS } from "../../../CONSTANTS/API_ENDPOINTS";
import HttpService from "../../../Services/HttpService";
import type { CustomResponse } from "../../../Types/ApiTypes";
import type { Company } from "../../Types/Settings/Company.types";

const CompanyService = {
  // Get all companies (Admin)
  async getAllCompanies(): Promise<Company[]> {
    const response = await HttpService.callApi<CustomResponse<Company[]>>(
      API_ENDPOINTS.COMPANY.GET_ALL,
      "GET"
    );
    return response.value;
  },

  // Get company by ID
  async getCompanyById(id: number): Promise<CustomResponse<Company>> {
    const response = await HttpService.callApi<CustomResponse<Company>>(
      API_ENDPOINTS.COMPANY.GET_BY_ID(id),
      "GET"
    );
    // Return full CustomResponse (needed for KiduEdit / KiduView)
    return response;
  },

  // Create company
  async createCompany(
    data: Omit<Company, "companyId" | "auditLogs">
  ): Promise<Company> {
    const response = await HttpService.callApi<CustomResponse<Company>>(
      API_ENDPOINTS.COMPANY.CREATE,
      "POST",
      data
    );
    return response.value;
  },

  // Update company
  async updateCompany(
    id: number,
    data: Partial<Omit<Company, "companyId" | "auditLogs">>
  ): Promise<Company> {
    const response = await HttpService.callApi<CustomResponse<Company>>(
      API_ENDPOINTS.COMPANY.UPDATE(id),
      "PUT",
      data
    );
    return response.value;
  },

  // Delete company
  async deleteCompany(id: number): Promise<void> {
    await HttpService.callApi<CustomResponse<void>>(
      API_ENDPOINTS.COMPANY.DELETE(id),
      "DELETE"
    );
  },
};

export default CompanyService;
