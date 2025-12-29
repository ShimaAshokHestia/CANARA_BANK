import { API_ENDPOINTS } from "../../CONSTANTS/API_ENDPOINTS";
import HttpService from "../../Services/HttpService";
import type { CustomResponse } from "../../Types/ApiTypes";
import type { PublicPageConfig } from "../Types/PublicPage.types";

const PublicPageConfigService = {
  /**
   * Fetch public page configuration
   * Backend returns array (usually single record)
   */
  async getPublicPageConfig(): Promise<PublicPageConfig[]> {
    const response = await HttpService.callApi<
      CustomResponse<PublicPageConfig[]>
    >(
      API_ENDPOINTS.PUBLIC_PAGE.GET_ALL,
      "GET"
    );
    return response.value;
  },
};

export default PublicPageConfigService;
