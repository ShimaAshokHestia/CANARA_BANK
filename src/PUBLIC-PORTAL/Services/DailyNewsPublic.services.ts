// src/Services/Public/DailyNewsPublic.services.ts

import type { DailyNews } from "../../ADMIN-PORTAL/Types/CMS/DailyNews.types";
import { API_ENDPOINTS } from "../../CONSTANTS/API_ENDPOINTS";
import HttpService from "../../Services/HttpService";
import type { CustomResponse } from "../../Types/ApiTypes";

/**
 * Service for fetching public daily news
 * Provides methods to get latest news without authentication
 */
const DailyNewsPublicService = {
  /**
   * Fetches all daily news from the public endpoint
   * @returns Promise with array of all daily news items
   */
  async getAllDailyNews(): Promise<DailyNews[]> {
    const response = await HttpService.callApi<CustomResponse<DailyNews[]>>(
      API_ENDPOINTS.PUBLIC.GET_ALL_DAILYNEWS,
      "GET"
    );
    return response.value;
  },

  /**
   * Fetches the last N news items, sorted by createdOn date (newest first)
   * Filters out deleted and inactive items
   * @param count - Number of news items to return
   * @returns Promise with array of latest news items
   */
  async getLatestNews(count: number): Promise<DailyNews[]> {
    const allNews = await this.getAllDailyNews();
    
    // Filter active and non-deleted news, then sort by createdOn (newest first)
    return allNews
      .filter(news => news.isActive && !news.isDeleted)
      .sort((a, b) => {
        const dateA = new Date(a.createdOn).getTime();
        const dateB = new Date(b.createdOn).getTime();
        return dateB - dateA; // Descending order (newest first)
      })
      .slice(0, count); // Take only the requested count
  },

  /**
   * Fetches the last 3 news items for home page display
   * @returns Promise with array of 3 latest news items
   */
  async getLatestThreeNews(): Promise<DailyNews[]> {
    return this.getLatestNews(3);
  },

  /**
   * Fetches the last 9 news items for news page display
   * @returns Promise with array of 9 latest news items
   */
  async getLatestNineNews(): Promise<DailyNews[]> {
    return this.getLatestNews(9);
  },
};

export default DailyNewsPublicService;