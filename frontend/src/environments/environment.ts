export const environment = {
  apiUrl: import.meta.env.NG_APP_API_URL,
  wsUrl: import.meta.env.NG_APP_WS_URL,
  keycloak: {
    authority: import.meta.env.NG_APP_KEYCLOAK_AUTHORITY,
    clientId: import.meta.env.NG_APP_KEYCLOAK_CLIENT_ID,
    realm: import.meta.env.NG_APP_KEYCLOAK_REALM,
  },
};
