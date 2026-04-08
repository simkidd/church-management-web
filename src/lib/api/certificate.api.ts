import {
  ICertificate,
  ICertificateTemplate,
} from "@/interfaces/certificate.interface";
import { ApiResponse } from "@/interfaces/response.interface";
import api from "../axios";

export const certificateApi = {
  getMyCourseCertificate: async (
    courseId: string,
  ): Promise<ApiResponse<ICertificate>> => {
    const { data } = await api.get(`/certificates/courses/${courseId}/me`);
    return data;
  },

  getCertificates: async (): Promise<ApiResponse<ICertificate[]>> => {
    const { data } = await api.get("/certificates");
    return data;
  },

  getCertificateById: async (
    certificateId: string,
  ): Promise<ApiResponse<ICertificate>> => {
    const { data } = await api.get(`/certificates/${certificateId}`);
    return data;
  },

  getCertificateDownloadLink: async (
    certificateId: string,
  ): Promise<ApiResponse<{ certificateUrl: string }>> => {
    const { data } = await api.get(`/certificates/${certificateId}/download`);
    return data;
  },

  verifyCertificate: async (
    verificationCode: string,
  ): Promise<
    ApiResponse<{
      recipientName: string;
      courseTitle: string;
      certificateNumber: string;
      verificationCode: string;
      issuedAt: string;
      status: "issued" | "revoked";
      certificateUrl?: string | null;
    }>
  > => {
    const { data } = await api.get(`/certificates/verify/${verificationCode}`);
    return data;
  },

  generateCertificate: async (
    courseId: string,
  ): Promise<ApiResponse<ICertificate>> => {
    const { data } = await api.post(
      `/certificates/courses/${courseId}/generate`,
    );
    return data;
  },

  getTemplates: async (): Promise<ApiResponse<ICertificateTemplate[]>> => {
    const { data } = await api.get("/certificate-templates");
    return data;
  },

  getActiveTemplate: async (): Promise<ApiResponse<ICertificateTemplate>> => {
    const { data } = await api.get("/certificate-templates/active");
    return data;
  },

  getTemplateById: async (
    templateId: string,
  ): Promise<ApiResponse<ICertificateTemplate>> => {
    const { data } = await api.get(`/certificate-templates/${templateId}`);
    return data;
  },
};
