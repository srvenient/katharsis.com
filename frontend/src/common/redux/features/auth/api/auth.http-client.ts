import { BaseHttpClient } from '@/common/http-client/http-client';
import config from '@/config';
import axios from 'axios';
import { ApiError } from '@/common/errors/api-error';

export class AuthHttpClient extends BaseHttpClient {
  constructor() {
    super({
      baseURL: config.clients.fastapi.baseURL,
      timeout: config.clients.fastapi.timeout,
      keepAlive: config.clients.fastapi.keepAlive,
    });
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const res = await this.instance.post(
        '/auth/login',
        new URLSearchParams({ username, password }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );
      if (res.status !== 200) {
        return false;
      }
      return true;
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

  async register(data: Record<string, unknown>): Promise<boolean> {
    try {
      const res = await this.instance.post('/auth/register', data);
      if (res.status != 201) {
        return false;
      }
      return true;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        throw new ApiError(
          err.response.data?.message ??
            'Registration cannot be completed: the user already exists.',
          err.response.status
        );
      }

      throw new ApiError('Server error', 500);
    }
  }

  async logout() {
    await this.instance.post("/auth/logout");
  } 
}

export const authHttpClient = new AuthHttpClient();
