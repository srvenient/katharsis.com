import { AppConfig } from "./config";
import { EnvironmentEnum } from "../common/env";

export default {
  clients: {
    fastapi: {
      baseURL: "http://localhost:8000/api/v1/",
      timeout: 10000,
      keepAlive: true,
      withCredentials: true,
    }
  },
  env: EnvironmentEnum.PROD,
} as AppConfig;