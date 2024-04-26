import { environment } from "src/environments/environment.development";
import { RestApiRoutes } from "./rest-api-routes.config";

export const CachableUrls = [
  environment.apiBaseUrl + `${RestApiRoutes.users}`,
]
