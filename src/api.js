import axios from "axios";

const REQUEST_TIMEOUT = 1000 * 5;

const ENTRY_POINT = `https://4.react.pages.academy/wtw`;

const RequestCodes = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: ENTRY_POINT,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
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
