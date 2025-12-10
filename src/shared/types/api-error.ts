/**
 * Типы для обработки ошибок API
 */

export interface ApiErrorResponse {
  response?: {
    data?: {
      params?: {
        email?: string[];
        [key: string]: unknown;
      };
      message?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Безопасное извлечение ошибок email из ответа API
 */
export const getEmailErrors = (error: unknown): string[] | undefined => {
  const apiError = error as ApiErrorResponse;
  return apiError?.response?.data?.params?.email;
};
