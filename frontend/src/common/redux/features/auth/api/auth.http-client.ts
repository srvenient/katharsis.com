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

  async login(username: string, password: string): Promise<any> {
    try {
      const res = await this.instance.post(
        '/auth/login',
        new URLSearchParams({ username, password }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );
      return res.data;
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
    await this.instance.post('/auth/logout');
  }

  async start2faSetup(): Promise<{ qr_code: string; secret_key: string }> {
    try {
      const res = await this.instance.post('/auth/2fa/setup/start');
      if (res.status !== 200) {
        throw new ApiError('Failed to enable 2FA', res.status);
      }
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new ApiError(
          error.response.data?.detail ?? 'Failed to enable 2FA',
          error.response.status
        );
      }
      throw new ApiError('Server error', 500);
    }
  }

  async cancel2faSetup(): Promise<boolean> {
    try {
      const res = await this.instance.delete('/auth/2fa/setup/cancel');
      return res.status === 200;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new ApiError(
          error.response.data?.detail ?? 'Failed to cancel 2FA setup',
          error.response.status
        );
      }
      throw new ApiError('Server error', 500);
    }
  }

  async disable2FA(): Promise<boolean> {
    try {
      const res = await this.instance.delete('/auth/2fa/disable');
      return res.status === 200;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new ApiError(
          error.response.data?.detail ?? 'Failed to disable 2FA',
          error.response.status
        );
      }
      throw new ApiError('Server error', 500);
    }
  }

  async confirm2FASetup(code: string): Promise<boolean> {
    try {
      const res = await this.instance.post('/auth/2fa/setup/confirm', {
        code,
      });
      return res.status === 200;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new ApiError(
          error.response.data?.detail ?? 'Invalid 2FA code',
          error.response.status
        );
      }
      throw new ApiError('Server error', 500);
    }
  }

  async verify2FACode(temp_token: string, code: string): Promise<boolean> {
    try {
      const res = await this.instance.post(
        '/auth/2fa/verify',
        new URLSearchParams({ temp_token, code }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );
      return res.status === 200;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new ApiError(
          error.response.data?.detail ?? 'Invalid 2FA code',
          error.response.status
        );
      }
      throw new ApiError('Server error', 500);
    }
  }
}

export const authHttpClient = new AuthHttpClient();
