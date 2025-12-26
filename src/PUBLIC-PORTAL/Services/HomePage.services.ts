// src/Services/Public/PublicPage.service.ts

import { API_ENDPOINTS } from "../../CONSTANTS/API_ENDPOINTS";
import HttpService from "../../Services/HttpService";
import type { CustomResponse } from "../../Types/ApiTypes";
import type { PublicPage } from "../Types/PublicPage.types";

const PublicPageService = {
  /**
   * Fetches all public home page data
   * Used for Home page (Navbar, Hero, Features, Footer)
   */
  async getAllHomePages(): Promise<PublicPage[]> {
    const response = await HttpService.callApi<CustomResponse<PublicPage[]>>(
      API_ENDPOINTS.PUBLIC_PAGE.GET_ALL_HOME,
      "GET"
    );
    return response.value;
  },

  /**
   * Fetches single home page config (usually first record)
   */
  async getHomePage(): Promise<PublicPage | null> {
    const response = await HttpService.callApi<CustomResponse<PublicPage[]>>(
      API_ENDPOINTS.PUBLIC_PAGE.GET_ALL_HOME,
      "GET"
    );
    return response.value?.[0] ?? null;
  },
};

export default PublicPageService;
