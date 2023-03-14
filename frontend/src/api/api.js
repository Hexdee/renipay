import React from "react";
import Toast from "@app/components/common/Toast";
import { storage } from "@app/utils";
import axios from "axios";

import { toast } from "react-toastify";
import { INVALID_AUTH_MESSAGE, INVALID_TOKEN, NO_USER_FOUND } from "@app/constants";
// import { auth } from "@app/config/firebase.config";
// import jwt from "jsonwebtoken";
// import client from "jwks-rsa";
// import * as jose from "jose";
// var jwt = require("jsonwebtoken");
// var client = require("jwks-rsa");
// var jwksClient = require("jwks-rsa");
// var client = jwksClient({
//   jwksUri:
//     "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com",
// });
// function getKey(header, callback) {
//   client.getSigningKey(header.kid, function(err, key) {
//     var signingKey = key.publicKey || key.rsaPublicKey;
//     callback(null, signingKey);
//   });
// }

// import verif

// const interpretError = (error) => {
//   switch (error) {
//     case "'fullName' length must be at least 3 characters long":
//       return "The field 'Full Name' must be at least 3 characters long";

//     default:
//       break;
//   }
// };
const axiosParams = {
  // Set different base URL based on the environment
  baseURL: process.env.REACT_APP_BASE_URL,
  // timeout: 5000,
};

// alert(process.env.REACT_APP_BASE_URL);

// Create axios instance with default params
const axiosInstance = axios.create(axiosParams);

async function authRequestInterceptor(request) {
  const token = storage.getToken();
  const refresh_token = storage.get("ref_");
  // alert("hi");
  // alert(token);
  // console.log({ refresh_token });
  if (refresh_token) {
    try {
      var res = await axiosInstance("/auth");
      // console.log({ res });
    } catch (e) {
      console.log({ e });
      // return {};
    }
  }
  // alert(res?.access_token);
  request.headers.Authorization = await `Bearer ${token}`;
  request.headers.Accept = "application/json";
  return request;
}

axiosInstance.interceptors.request.use(authRequestInterceptor);
axiosInstance.interceptors.response.use(
  async (response) => {
    return response.data;
  },
  async (error) => {
    console.log({ error });
    // if (
    //   error?.response?.data?.error?.code === 400 ||
    //   error?.response?.data?.error?.message === "INVALID_REFRESH_TOKEN"
    // ) {
    //   storage.clear("ref_");
    // }
    return Promise.reject(error);
  }
);

//  with Logger for logging out errors to the console
const withLogger = async (promise) =>
  promise.catch((error) => {
    /*
Always log errors in dev environment
if (process.env.NODE_ENV !== 'development') throw error
*/
    // Log error only if REACT_APP_DEBUG_API env is set to true
    if (!process.env.REACT_APP_DEBUG_API) throw error;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest
      // in the browser and an instance of
      // http.ClientRequest in node.js
      // console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
    throw error;
  });

// ======

export const didAbort = (error) => axios.isCancel(error);

const getCancelSource = () => axiosInstance?.CancelToken.source();

export const isApiError = (error) => {
  return axios.isAxiosError(error);
};

const withAbort = (fn) => {
  const executor = async (...args) => {
    const originalConfig = args[args.length - 1];
    const config = originalConfig?.config || {};
    const abort = originalConfig?.abort;

    // Create cancel token and abort method only if abort
    // function was passed
    // console.log({ config });
    if (!!abort && typeof abort === "function") {
      const { cancel, token } = getCancelSource();
      config.cancelToken = token;
      abort(cancel);
    }

    try {
      if (args.length > 2) {
        const [url, body] = args;
        return await fn(url, body, config);
      } else {
        const [url] = args;
        return await fn(url, config);
      }
    } catch (error) {
      let err;
      const error_response = error?.response?.data;
      console.log({ errorrrr: error });
      if (error_response) {
        // if (error_response === "Code expired.") {
        //   err = "The OTP code you entered initially has expired.";
        // } else if (error_response === INVALID_AUTH_MESSAGE) {
        //   err = "User session expired already.";
        // } else if (
        //   error_response === NO_MOVIES_IN_WATCHLIST ||
        //   error_response === NO_MOVIES_IN_FAVOURITES
        // ) {
        //   return {
        //     statusCode: 200,
        //     data: [],
        //   };
        // } else if (error_response === NO_ACTIVE_SUBSCRIPTION) {
        //   return {
        //     data: NO_ACTIVE_SUBSCRIPTION,
        //     statusCode: 200,
        //   };
        // } else {
        err = error_response;
        // }
      } else if (error?.message) {
        // if (error?.message === INVALID_AUTH_MESSAGE) {
        //   err = "User session has expired.";
        // } else
        if (error?.message.toLowerCase() === "network error") {
          err = "Please , check that you are connected to the internet.";
        } else err = error?.message;
      }

      // if (err.code === "ERR_CANCELED") {
      // }
      if (didAbort(error)) {
        error.aborted = true;
      }
      if (err !== NO_USER_FOUND || err !== INVALID_TOKEN) {
        toast.error(
          <Toast toastType="error" message={err} data-testid="toast-error" />,
          {
            toastId: `toast-api-error`,
          }
        );
      }

      if (error?.message.toLowerCase() === "network error") return error;
      throw error;
    }
  };

  return executor;
};

// Main api function
const api = (axios) => {
  return {
    get: (url, config) => withLogger(withAbort(axios.get)(url, config)),
    delete: (url, config = {}) =>
      withLogger(withAbort(axios.delete)(url, config)),
    post: (url, body, config = {}) =>
      withLogger(withAbort(axios.post)(url, body, config)),
    patch: (url, body, config = {}) =>
      withLogger(withAbort(axios.patch)(url, body, config)),
    put: (url, body, config = {}) =>
      withLogger(withAbort(axios.put)(url, body, config)),
  };
};
export default api(axiosInstance);
