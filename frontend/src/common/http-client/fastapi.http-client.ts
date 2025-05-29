import {ApiError} from "@/common/errors/api-error";
import {BaseHttpClient} from "@/common/http-client/http-client";
import config from "@/config/config";
import axios from "axios";
import {User} from "@/common/types/user";

export class FastApiHttpClient extends BaseHttpClient {
  constructor() {
    super({
      baseURL: config.clients.fastapi.baseURL,
      timeout: config.clients.fastapi.timeout,
      keepAlive: config.clients.fastapi.keepAlive,
      withCredentials: config.clients.fastapi.withCredentials,
    });
  }

  async login({username, password}: { username: string; password: string; }): Promise<boolean> {
    try {
      console.log(username, password);
      await this.instance.post(
        "auth/login/access-token",
        new URLSearchParams({
          username,
          password
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );

      return true;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        throw new ApiError(
          err.response.data?.message ?? "Nombre de usuario, correo electrónico o contraseña incorrectos",
          err.response.status
        );
      }
      throw new ApiError("Error con el servidor", 500);
    }
  }

  async register(data: Record<string, unknown>): Promise<boolean> {
    try {
      await this.instance.post("auth/register", data);
      return true;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        throw new ApiError(
          err.response.data?.message ?? "No se puede completar el registro: el usuario ya existe.",
          err.response.status
        );
      }
      throw new ApiError("Error con el servidor", 500);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.instance.post("auth/logout");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        throw new ApiError(
          err.response.data?.message ?? "Error al cerrar sesión",
          err.response.status
        );
      }
      throw new ApiError("Error con el servidor", 500);
    }
  }

  async me(): Promise<User> {
    try {
      const res = await this.instance.get("users/me");
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        throw new ApiError(err.response.data.message, err.response.status);
      }
      throw new ApiError("Unexpected error fetching user info", 500);
    }
  }

  async passwordRecovery(email: string): Promise<void> {
    try {
      await this.instance.post(`auth/password-recovery/${encodeURIComponent(email)}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        throw new ApiError(
          err.response.data?.message ?? "Error al enviar el correo de recuperación",
          err.response.status
        );
      }
      throw new ApiError("Error con el servidor", 500);
    }
  }

  async resetPassword(token: string, password: string): Promise<void> {
    try {
      await this.instance.post(
        "auth/reset-password",
        {
          token,
          new_password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        console.error("Error response data:", err.response.data);
        throw new ApiError(
          err.response.data?.detail ?? "Error al restablecer la contraseña",
          err.response.status
        );
      }
      throw new ApiError("Error con el servidor", 500);
    }
  }

  async createProduct(data: Record<string, unknown>): Promise<void> {
    try {
      await this.instance.post("/products", data, {
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        throw new ApiError(
          err.response.data?.detail ?? "Error al crear el producto",
          err.response.status
        );
      }
      throw new ApiError("Error con el servidor", 500);
    }
  }

}

export const fastApiHttpClient = new FastApiHttpClient();
