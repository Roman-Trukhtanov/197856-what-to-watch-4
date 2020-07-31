import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {Noop} from "./types";

const REQUEST_TIMEOUT: number = 1000 * 5;

const ENTRY_POINT = `https://4.react.pages.academy/wtw`;

enum RequestCodes {
  UNAUTHORIZED = 401,
}

export const createAPI = (onUnauthorized: Noop): AxiosInstance => {
  const api: AxiosInstance = axios.create({
    baseURL: ENTRY_POINT,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  const onFail = (err: AxiosError): void => {
    const {response} = err;

    if (response.status === RequestCodes.UNAUTHORIZED) {
      onUnauthorized();

      // Бросаем ошибку, т.к. важно прервать цепочку промисов после запроса авторизации.
      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
