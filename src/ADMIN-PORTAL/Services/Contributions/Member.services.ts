// src/ADMIN-PORTAL/Services/Member/Member.services.ts
import { API_ENDPOINTS } from "../../../CONSTANTS/API_ENDPOINTS";
import AuthService from "../../../Services/Auth.services";
import HttpService from "../../../Services/HttpService";
import type { CustomResponse } from "../../../Types/ApiTypes";
import type { Member } from "../../Types/Contributions/Member.types";

const MemberService = {
  async getAllMembers(): Promise<Member[]> {
    const response = await HttpService.callApi<CustomResponse<Member[]>>(
      API_ENDPOINTS.MEMBER.GET_ALL,
      "GET"
    );
    return response.value;
  },

  async getMemberById(id: number): Promise<CustomResponse<Member>> {
    const response = await HttpService.callApi<CustomResponse<Member>>(
      API_ENDPOINTS.MEMBER.GET_BY_ID(id),
      "GET"
    );
    return response;
  },

  /**
   * ✅ NEW METHOD - Get member details for the currently logged-in staff user
   * This uses the memberId stored in localStorage from login
   * @returns Promise with Member data
   * @throws Error if memberId is not found or user is not authenticated
   */
  async getCurrentStaffMember(): Promise<CustomResponse<Member>> {
    const memberId = AuthService.getMemberId();
    
    if (!memberId) {
      throw new Error("Member ID not found. Please ensure you're logged in as a staff member.");
    }
    
    console.log('Fetching member details for memberId:', memberId);
    return this.getMemberById(memberId);
  },

  /**
   * ✅ NEW METHOD - Check if current user has an associated member record
   * @returns boolean indicating if the current user is a member
   */
  isCurrentUserMember(): boolean {
    const memberId = AuthService.getMemberId();
    return memberId !== null && memberId > 0;
  },

  async createMember(
    data: Omit<Member, "memberId" | "auditLogs">
  ): Promise<Member> {
    const response = await HttpService.callApi<CustomResponse<Member>>(
      API_ENDPOINTS.MEMBER.CREATE,
      "POST",
      data
    );
    return response.value;
  },

  async updateMember(
    id: number,
    data: Partial<Omit<Member, "memberId" | "auditLogs">>
  ): Promise<Member> {
    const response = await HttpService.callApi<CustomResponse<Member>>(
      API_ENDPOINTS.MEMBER.UPDATE(id),
      "PUT",
      data
    );
    return response.value;
  },

  /**
   * ✅ NEW METHOD - Update current staff member's own profile
   * This ensures staff can only update their own member record
   * @param data Partial member data to update
   * @returns Promise with updated Member data
   */
  async updateCurrentStaffMember(
    data: Partial<Omit<Member, "memberId" | "auditLogs">>
  ): Promise<Member> {
    const memberId = AuthService.getMemberId();
    
    if (!memberId) {
      throw new Error("Member ID not found. Cannot update profile.");
    }
    
    console.log('Updating member profile for memberId:', memberId);
    return this.updateMember(memberId, data);
  },

  async deleteMember(id: number): Promise<void> {
    await HttpService.callApi<CustomResponse<void>>(
      API_ENDPOINTS.MEMBER.DELETE(id),
      "DELETE"
    );
  },
};

export default MemberService;