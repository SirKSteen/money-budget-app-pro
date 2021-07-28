<template>
  <form @submit="submitHandler">
    <div class="loginContainer">
      <div class="login-Header">
        <h2>Login</h2>
      </div>
      <div class="login-Username">
        <label>Username</label>
        <input type="text" name="username" v-model="username" required />
      </div>
      <div class="login-Password">
        <label>Password</label>
        <input type="password" name="password" v-model="password" required />
      </div>
      <div class="login-Submit">
        <input type="submit" value="Submit" />
      </div>
      <div v-show="showErrorMessage">
        <p>Incorrect username and password. Try again.</p>
      </div>
    </div>
  </form>
</template>

<script>
import AuthServices from "../authentication/AuthenticationServices.vue";

let authMethods = AuthServices.methods;

export default {
  name: "Login",
  methods: {
    submitHandler(e) {
      e.preventDefault();
      console.log("Submit button clicked");

      authMethods
        .ExecuteJWTAuthentication(this.username, this.password)
        .then((response) => {
          console.log(response);
          this.$router.push({ path: "/Home" });
          this.$emit("show-subheader");
          authMethods.RegisterSuccessfulLogin(this.username, response.data.token);
          console.log("Registration completed");
        })
        .catch(() => {
          console.log("Error has occured");
          this.showErrorMessage = true;
        });
    },
  },
  components: {
    AuthServices,
  },
  data() {
    return {
      username: "",
      password: "",
      showErrorMessage: false,
    };
  },
};
</script>

<style scoped>
.loginContainer {
  margin: 30px auto;
  height: 210px;
  width: 410px;
  background-color: rgba(60, 131, 134, 0.705);
  border-radius: 4px;
  padding: 10px 30px;
}

.login-Header {
  width: 100%;
  text-align: center;
}

.loginContainer div {
  margin-bottom: 13px;
  text-align: center;
}

.loginContainer h2 {
  font-size: 30px;
  color: rgb(37, 37, 37);
  margin-bottom: 20px;
  color: rgb(245, 245, 245);
}

.loginContainer label {
  font-size: 18px;
  font-weight: 400;
  margin-right: 15px;
  color: rgb(245, 245, 245);
}

.login-Username input,
.login-Password input {
  font-size: 16.3px;
  background-color: rgba(73, 73, 73, 0.151);
  border: 1.5px solid rgba(56, 56, 56, 0.726);
  border-radius: 4px;
  height: 25px;
  padding-left: 5px;
  color: rgb(245, 245, 245);
}

.login-Submit input {
  background-color: rgb(74, 182, 110);
  height: 30px;
  border-radius: 4px;
  width: 80px;
  border: none;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  font-size: 15px;
  color: rgb(245, 245, 245);
  margin-bottom: 4px;
}

.login-Submit input:hover {
  cursor: pointer;
}

p {
  text-align: center;
  color: rgb(194, 3, 3);
  font-size: 14.5px;
  background-color: #fff;
}
</style>
