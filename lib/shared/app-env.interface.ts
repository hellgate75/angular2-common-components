/**
 * Define your app env interface here
 * Only valid JSON data types are allowed
 */
export interface Service {
  name: string;
  uri: string;
  methods: string[];
}
export interface ServiceServer {
  protocol: string;
  host: string;
  port: number;
  services: Service[];
}
export interface ServiceServerConfig {
  servers: Map<string, ServiceServer>;
}
export interface Environment {
  production: boolean;
  test: boolean;
}
export class AppEnv {
  services: ServiceServerConfig;
  environment: Environment;
  constructor(object?: any) {
    if (!!AppEnv.instance && !!object) {
      this.services = <ServiceServerConfig> object.services || null;
      this.environment = <Environment> object.environment   || null;
      if (!!this.services && !!this.environment) {
        AppEnv.instance = this.clone();
      }
    } else if (!!AppEnv.instance) {
      this.services = AppEnv.instance.services;
      this.environment = AppEnv.instance.environment;
    }
  }
  clone(): AppEnv {
    return new AppEnv(this);
  }
  static instance: AppEnv;
}
