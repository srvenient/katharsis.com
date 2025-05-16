import type { AxiosError } from 'axios';

/**
 * Custom error class to handle API-specific errors.
 * Extends the native Error class to include HTTP status codes and optional metadata.
 */
export class ApiError extends Error {
  /**
   * Creates a new instance of ApiError.
   * @param message - The error message describing the issue.
   * @param httpStatus - The HTTP status code associated with the error.
   * @param metadata - Optional additional metadata to provide context about the error.
   */
  constructor(
    message: string,
    readonly httpStatus: number,
    readonly metadata?: Record<string, unknown>,
  ) {
    super(message);

    this.name = this.constructor.name;

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /**
   * Converts an AxiosError into an ApiError.
   * @param error - The AxiosError to convert.
   * @returns An HttpError instance.
   */
  static fromAxiosError(error: AxiosError): ApiError {
    return new ApiError(error.message, error.response?.status || 500, {
      baseURL: error.config?.baseURL,
      url: error.config?.url,
      method: error.config?.method,
      response: error.response?.data,
    });
  }

  /**
   * Converts a generic Error into an ApiError.
   * @param error - The Error to convert.
   * @param metadata - Optional additional metadata to provide context about the error.
   * @returns An ApiError instance.
   */
  static fromError(error: Error, metadata?: Record<string, unknown>): ApiError {
    return new ApiError(error?.message, 500, metadata);
  }

  static fromPostgresError(
    message: string,
    code: string,
    metadata: Record<string, unknown>,
  ): number {
    throw new ApiError(
      message,
      this.mapPostgresErrorToStatusCode(code),
      metadata,
    );
  }

  private static mapPostgresErrorToStatusCode(errorCode: string): number {
    const postgresErrorToStatusCode: { [key: string]: number } = {
      '23505': 409, // unique_violation
      '23503': 400, // foreign_key_violation
      '23502': 400, // not_null_violation
      '22P02': 400, // invalid_text_representation
      '23514': 400, // check_violation
      '22001': 400, // string_data_right_truncation
      '23504': 400, // exclusion_violation
      '42703': 400, // undefined_column
      '42601': 400, // syntax_error
      '42883': 400, // undefined_function
    };
    return postgresErrorToStatusCode[errorCode] || 500;
  }
}