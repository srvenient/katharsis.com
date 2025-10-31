import { BaseHttpClient } from '@/common/http-client/http-client';
import config from '@/config';
import axios from 'axios';
import { ApiError } from '@/common/errors/api-error';

export class UserHttpClient extends BaseHttpClient {
  constructor() {
    super({
      baseURL: config.clients.fastapi.baseURL,
      timeout: config.clients.fastapi.timeout,
      keepAlive: config.clients.fastapi.keepAlive,
    });
  }

  async fetchMe(): Promise<any> {
    try {
      const { data } = await this.instance.get('/users/me');
      if (!data) {
        throw new ApiError('User not found', 404);
      }
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new ApiError(
          error.response.data?.message ?? 'Credentials are not valid',
          error.response.status
        );
      }

      throw new ApiError('Server error', 500);
    }
  }
}

export const userHttpClient = new UserHttpClient();
