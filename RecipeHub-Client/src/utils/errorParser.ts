export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}

export const parseApiError = (error: unknown): string => {
  if (error instanceof Error) {
    if ('response' in error) {
      const response = error.response as ApiErrorResponse;
      return response?.message || error.message || 'An error occurred';
    }
    return error.message;
  }
  return 'An unknown error occurred';
};
