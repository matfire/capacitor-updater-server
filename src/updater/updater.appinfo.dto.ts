export interface AppInfos {
  version_name: string;
  version_build: string;
  version_os: string;
  custom_id?: string;
  is_prod?: boolean;
  is_emulator?: boolean;
  plugin_version: string;
  platform: string;
  app_id: string;
  device_id: string;
}

export interface AppInfosResponse {
  version: string;
  url: string;
  message?: string;
}
