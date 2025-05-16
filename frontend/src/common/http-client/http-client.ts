import { ApiError } from "../errors/api-error";
import type { AxiosInstance } from 'axios';
import Axios from 'axios';
import http from 'http';
import * as https from 'https';

export type HttpClientConfig = {
  baseURL: string;
  timeout: number;
  keepAlive: boolean;
  withCredentials: boolean;
}

export abstract class BaseHttpClient {
  protected readonly instance: AxiosInstance;

  protected constructor(options: HttpClientConfig) {
    if (!options.baseURL) {
      throw new ApiError('baseUrl required', 500);
    }

    const httpAgent = new http.Agent({ keepAlive: options.keepAlive ?? true });
    const httpsAgent = new https.Agent({
      keepAlive: options.keepAlive ?? true,
    });

    this.instance = Axios.create({
      baseURL: options.baseURL,
      timeout: options.timeout,
      httpAgent,
      httpsAgent,
      withCredentials: options.withCredentials,
    });
  }
}