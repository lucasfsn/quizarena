declare interface Env {
  readonly NG_APP_API_URL: string;
  readonly NG_APP_KEYCLOAK_AUTHORITY: string;
  readonly NG_APP_KEYCLOAK_REALM: string;
  readonly NG_APP_KEYCLOAK_CLIENT_ID: string;
}

declare interface ImportMeta {
  readonly env: Env;
}
