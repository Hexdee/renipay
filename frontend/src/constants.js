const REGEX_EMAIL =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const REGEX_ALPHANUMERIC_AT_LEAST_ONE_SYMBOL_AND_UPPERCASE =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
//  EGEX_ALPHANUMERIC_AT_LEAST_ONE_SYMBOL_AND_UPPERCASE = /^(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&()_+-={}|[]\:;'<>,.?\/]).+$/
// const REGEX_ALPHANUMERIC_AT_LEAST_ONE_SYMBOL_AND_UPPERCASE = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/
const USER_ALREADY_EXISTS = "User Already Exist. Please Login";
const STORAGE_PREFIX = "reni_pay_";

const INVALID_AUTH_MESSAGE = "Invalid auth token";
const AUTH_IS_REQUIRED = "Auth is required";
const FORGET_PASSWORD = "forget_password";
const REGISTER = "register";
const RESET = "reset";
const SERIES = "series";
const MAX_MOBILE_WIDTH = 767;
const NO_USER_FOUND = "User not found!";

const MOVIE = "movie";
const FULLMOVIE = "fullMovie";
const INVALID_TOKEN = "Invalid Token";
const PAYMENT_LINK = "renipay.onrender.com/"
export {
  USER_ALREADY_EXISTS,
  MAX_MOBILE_WIDTH,
  REGEX_EMAIL,
  STORAGE_PREFIX,
  INVALID_AUTH_MESSAGE,
  AUTH_IS_REQUIRED,
  REGISTER,
  FORGET_PASSWORD,
  RESET,
  SERIES,
  REGEX_ALPHANUMERIC_AT_LEAST_ONE_SYMBOL_AND_UPPERCASE,
  MOVIE,
  FULLMOVIE,
  NO_USER_FOUND,
  INVALID_TOKEN,
  PAYMENT_LINK
};
