import { FastApiConfig } from "./types/fastapi.type";
import { EnvironmentType } from "@/common/env";
import { getEnv } from "@/common/env";
import { EnvironmentEnum } from "@/common/env";
import local from "./local";
import stg from "./stg";
import prod from "./prod";

export interface AppConfig {
  clients: {
    fastapi: FastApiConfig;
  },
  env: EnvironmentType;
}

const env: string = getEnv();

const config: AppConfig =
  env === EnvironmentEnum.LOCAL
    ? local
    : env === EnvironmentEnum.STG
    ? stg
    : prod;

export default config;