// src/constants/apiEndpoints.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://sreenathganga-001-site16.jtempurl.com/api';

export const API_ENDPOINTS = {
    AUTH: {
    LOGIN: `${API_BASE_URL}/Auth/login`,
    LOGOUT: `${API_BASE_URL}/Auth/logout`,
    CHANGE_PASSWORD: `${API_BASE_URL}/Auth/change-password`,
    FORGOT_PASSWORD: `${API_BASE_URL}/Auth/forgot-password`,
  },
    USER: {
    GET_ALL: `${API_BASE_URL}/User`,
    GET_BY_ID: (id: number) => `${API_BASE_URL}/User/${id}`,
    CREATE: `${API_BASE_URL}/User`,
    UPDATE: (id: number) => `${API_BASE_URL}/User/${id}`,
    DELETE: (id: number) => `${API_BASE_URL}/User/${id}`,
    CHANGE_PASSWORD: `${API_BASE_URL}/User/ChangePassWord`,
    // UPLOAD_PROFILE_PIC: `${API_BASE_URL}/User/upload-profile-pic`,
  },
   CUSTOMER: {
    GET_ALL: `${API_BASE_URL}/Customer`,
    GET_BY_ID: (id: number) => `${API_BASE_URL}/Customer/${id}`,
    CREATE: `${API_BASE_URL}/Customer`,
    UPDATE: (id: number) => `${API_BASE_URL}/Customer/${id}`,
    DELETE: (id: number) => `${API_BASE_URL}/Customer/${id}`,
  },
  AUDIT_LOG: {
    GET_BY_TABLE_AND_ID: (tableName: string, recordId: number) =>
      `${API_BASE_URL}/AuditLog/${tableName}/${recordId}`
  },
  ATTACHMENT: {
    GET_BY_TABLE_AND_ID: (tableName: string, recordId: number) =>
      `${API_BASE_URL}/Attachment/${tableName}/${recordId}`,
    GET_BY_ID: (attachmentId: number) => `${API_BASE_URL}/Attachment/${attachmentId}`,
    UPLOAD: `${API_BASE_URL}/Attachment/upload`,
    DELETE: (attachmentId: number) => `${API_BASE_URL}/Attachment/${attachmentId}`,
    GET: `${API_BASE_URL}/Attachment`,
    DOWNLOAD: (attachmentId: number) => `${API_BASE_URL}/Attachment/download/${attachmentId}`,
  },
};

// ✅ Helper function to get full image URL
export const getFullImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return '';

  // If already a complete URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Get base URL without /api suffix
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://sreenathganga-001-site12.jtempurl.com/api';
  const cleanBaseUrl = baseUrl.replace('/api', '');

  // Ensure proper path construction
  return `${cleanBaseUrl}/${imagePath.replace(/^\/+/, '')}`;
};

// ✅ Get base website URL (without /api)
export const getBaseWebsiteUrl = (): string => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://sreenathganga-001-site12.jtempurl.com/api';
  return baseUrl.replace('/api', '');
};