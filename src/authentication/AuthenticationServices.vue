<template></template>

<script>
import axios from "axios";
import API_URL from "../API/Constants.vue";

let apiAuthUrl = API_URL.data.api_auth_url;
const USERNAME_SESSION_ATTRIBUTE = "authenticatedUser";

export default {
  name: "AuthServices",
  methods: {
    ExecuteJWTAuthentication(username, password) {
      return axios.post(`${apiAuthUrl}/authenticate`, {
        username,
        password,
      });
    },

    RegisterSuccessfulLogin(username, token) {
      console.log("Successful login");
      console.log("Name: " + username);
      console.log("Token: " + token);
      sessionStorage.setItem(USERNAME_SESSION_ATTRIBUTE, username);
      this.SetUpAxiosInterceptors(this.CreateJWT(token));
      console.log("stop")
    },

    CreateJWT(token) {
      return "Bearer " + token;
    },

    SetUpAxiosInterceptors(token) {
      console.log("Inside SetUpAxiosInterceptors() ")
      axios.interceptors.request.use((config) => {
        if (this.IsUserLoggedIn()) {
          console.log("Config: " + config);
          config.headers.authorization = token;
          console.log("Config Headers Authorization: "+ config.headers.authorization)
        }
        return config;
      });
    },

    IsUserLoggedIn() {
      let user = sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE);
      if (user === null) {
        return false;
      } else {
        return true;
      }
      
    },

    GetLoggedInUsername() {
      let user = sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE);
      if (user === null) {
        return "";
      } else {
        return user;
      }
    },

    LogoutUser() {
      console.log("Logout completed");
      sessionStorage.removeItem(USERNAME_SESSION_ATTRIBUTE);
    },
  },
};
</script>

<style scoped></style>
