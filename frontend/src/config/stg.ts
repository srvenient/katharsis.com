import { EnvironmentEnum } from "../common/env";
import { AppConfig } from "./config";

export default {
  clients: {
    fastapi: {
      baseURL: "http://localhost:8000/api/v1/",
      timeout: 10000,
      keepAlive: true,
      withCredentials: true,
    }
  },
  env: EnvironmentEnum.STG,
} as AppConfig;