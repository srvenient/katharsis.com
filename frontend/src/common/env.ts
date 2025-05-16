/**
 * Enum representing the possible environments where the server can run.
 */
export const EnvironmentEnum = {
  LOCAL: 'local',
  STG: 'stg',
  PROD: 'prod',
} as const;

export type EnvironmentType =
  (typeof EnvironmentEnum)[keyof typeof EnvironmentEnum];

/**
 * Retrieves the current environment where the server is running.
 * Defaults to 'local' if the environment is not set or invalid.
 *
 * @returns {EnvironmentType} - The environment in which the server is operating.
 */
export function getEnv(): EnvironmentType {
  const nodeEnv: string | undefined = process.env.NODE_ENV?.toLowerCase();

  if (
    !nodeEnv ||
    !Object.values(EnvironmentEnum).includes(nodeEnv as EnvironmentType)
  ) {
    return EnvironmentEnum.LOCAL;
  }

  return nodeEnv as EnvironmentType;
}