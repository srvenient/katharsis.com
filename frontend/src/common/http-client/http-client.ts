import Axios from 'axios';
import {AxiosInstance} from "axios";
import {ApiError} from "@/common/errors/api-error";
import * as https from "node:https";
import * as http from "node:http";

export type HttpClientConfig = {
  baseURL: string;
  timeout: number;
  keepAlive?: boolean;
};

export abstract class BaseHttpClient {
  protected readonly instance: AxiosInstance;

  protected constructor(options: HttpClientConfig) {
    if (!options.baseURL) {
      throw new ApiError('Base URL is required', 500);
    }

    const httpAgent = new http.Agent({keepAlive: options.keepAlive ?? true});
    const httpsAgent = new https.Agent({
      keepAlive: options.keepAlive ?? true,
    });

    this.instance = Axios.create({
      baseURL: options.baseURL,
      timeout: options.timeout ?? 5000,
      withCredentials: true,
      httpAgent,
      httpsAgent,
    });
  }
}