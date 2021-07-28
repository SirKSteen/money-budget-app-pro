<template></template>

<script>
import axios from "axios";
import API_URL from "../API/Constants.vue";

let apiUrl = API_URL.data.api_url;

export default {
  name: "ExpensesDataServices",
  methods: {
    RetrieveAllExpenses(username) {
      console.log(`Username in RAE: ${username}`);
      return axios.get(`${apiUrl}/users/${username}/expenses`);
    },

    CreateExpense(username, expense) {
      return axios.post(`${apiUrl}/users/${username}/expenses`, expense);
    },

    DeleteExpense(username, id){
      return axios.delete(`${apiUrl}/users/${username}/expenses/${id}`);
    }
  },
};
</script>

<style scoped></style>
