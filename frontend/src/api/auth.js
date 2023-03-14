import api from "./api";
const createUser = (newUser) =>
  api.post("/register", newUser).then((res) => res);
const logUserIn = (newUser) => api.post("/login", newUser).then((res) => res);
const getUser = (token) => api.post("/auth", { token }).then((res) => res);

export { createUser, logUserIn, getUser };
