<template>
  <div class="appContainer">
    <div class="mainContainer">
      <Header title="Money Budget App Pro" />
      <SubHeader v-show="showSubHeader" @toggle-calculator="toggleCalc" @toggle-expenses="toggleExpenses" />
      <router-view @show-subheader="ShowSubHeader"></router-view>
      <Footer footerInfo="Money Budget App Pro Version 1.0, Copyright 2021" />
    </div>
  </div>
</template>

// ******************************************

<script>
import Header from "./components/Header.vue";
import SubHeader from "./components/SubHeader";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: { Header, SubHeader, Footer },
  methods: {
    toggleCalc() {
      console.log("App.js: Calculator");
      if (this.showExp === true) {
        this.showExp = false;
      }
      this.showCalc = !this.showCalc;
      console.log("showCalc: " + this.showCalc);
      console.log("showExp: " + this.showExp);
    },
    toggleExpenses() {
      console.log("App.js: Expenses");
      if (this.showCalc === true) {
        this.showCalc = false;
      }
      this.showExp = !this.showExp;
      console.log("showCalc: " + this.showCalc);
      console.log("showExp: " + this.showExp);
    },
    ShowSubHeader() {
      this.showSubHeader = true;
    }
  },
  data() {
    return {
      expenses: [],
      showCalc: false,
      showExp: false,
      showSubHeader: false,
    };
  },
};
</script>

// ******************************************

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.appContainer {
  background-color: rgba(255, 255, 255, 0.822);
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
}

.mainContainer {
  background-color: rgba(141, 141, 141, 0.267);
  top: 0.6%;
  left: 0.6%;
  width: 98.8%;
  height: 99.4vh;
  position: absolute;
}
</style>
