import { SimpleFinAuthentication } from "../models/simpleFinAuth";
import { LocalStorage } from "node-localstorage";
import { LocalStorageKeys } from "../models/enums/localStorageKeys";

const localStorage = new LocalStorage('./lm-simplefin')

export function isAuthPresent(): boolean {
  return localStorage.getItem(LocalStorageKeys.BASE_URL_KEY) !== null
    && localStorage.getItem(LocalStorageKeys.USERNAME_KEY) !== null
    && localStorage.getItem(LocalStorageKeys.PASSWORD_KEY) !== null;
}

export function getAuthentication(): SimpleFinAuthentication {
  return {
    baseUrl: localStorage.getItem(LocalStorageKeys.BASE_URL_KEY)!,
    username: localStorage.getItem(LocalStorageKeys.USERNAME_KEY)!,
    password: localStorage.getItem(LocalStorageKeys.PASSWORD_KEY)!
  }
}

export function storeAuthenticationDetails(authDetails: SimpleFinAuthentication) {
  localStorage.setItem(LocalStorageKeys.BASE_URL_KEY, authDetails.baseUrl);
  localStorage.setItem(LocalStorageKeys.USERNAME_KEY, authDetails.username);
  localStorage.setItem(LocalStorageKeys.PASSWORD_KEY, authDetails.password);
}