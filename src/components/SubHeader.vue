<template>
  <div class="subHeaderContainer" v-show="showSubHeader">
    <!--<h4>SubHeader</h4>-->
    <div class="subHeaderContainer-Top">
      <DateTime />
    </div>

    <div class="subHeaderContainer-Bottom">
      <router-link to="/home">
        <Button
          name="Expenses"
          :color="'rgb(55, 201, 194)'"
          @btn-click="$emit('toggle-expenses')"
        />
      </router-link>
      <router-link to="/calculator">
        <Button
          name="Calculator"
          :color="'rgb(206, 90, 28)'"
          @btn-click="$emit('toggle-calculator')"
        />
      </router-link>
      <router-link to="/">
        <Button name="Logout" :color="'rgb(190, 56, 41)'" @btn-click="logoutUser" />
      </router-link>
    </div>
  </div>
</template>

// ******************************************

<script>
import Button from "./Button.vue";
import DateTime from "./DateTime.vue";
import authServices from "../authentication/AuthenticationServices.vue";

let authMethods = authServices.methods;

export default {
  name: "SubHeader",
  components: {
    Button,
    DateTime,
    authServices,
  },
  methods: {
    calcHandler() {
      console.log("Calculator clicked");
    },
    expHandler() {
      console.log("Add Expense clicked");
    },
    logoutUser() {
      console.log("Logout Button clicked");
      authMethods.LogoutUser();
      this.showSubHeader = false;
      alert("Logout Successful");
      this.$router.push({ path: "/" });
      // window.location.reload();
    },
  },
  data() {
    return {
      showSubHeader: true,
    };
  },
  emits: ["toggle-calculator", "toggle-expenses"],
};
</script>

// ******************************************

<style scoped>
.subHeaderContainer {
  height: 65px;
  width: 100%;
  background-color: rgba(221, 219, 123, 0.836);
  margin-top: 5px;
  text-align: center;
}

.subHeaderContainer-Top {
  height: 50%;
  width: 100%;
  background-color: rgba(128, 0, 128, 0.432);
}

.subHeaderContainer-Top h4 {
  padding-top: 5px;
}

.subHeaderContainer-Bottom {
  height: 50%;
  width: 100%;
  background-color: rgba(211, 109, 62, 0.432);
  display: inline-flex;
  gap: 18px;
  justify-content: center;
}
</style>
